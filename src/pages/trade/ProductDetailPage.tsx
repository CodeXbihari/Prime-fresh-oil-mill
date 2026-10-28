import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/trade/ProductCard';
import { SampleKitModal } from '../../components/trade/SampleKitModal';
import { SEOHead } from '../../components/common/SEOHead';
import {
  ShieldCheck,
  Truck,
  ShoppingCart,
  FileText,
  Check,
  ArrowLeft,
  Scale,
  Clock,
  Layers,
  PackageCheck
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id) || products[0];
  const [quantity, setQuantity] = useState(product?.moq || 50);
  const [added, setAdded] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-serif mb-2">Product Not Found</h2>
          <Link to="/products" className="text-mustard-600 hover:underline">
            Back to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Calculate pricing based on volume tiers
  let applicablePrice = product.indicativePrice;
  if (product.priceTiers && product.priceTiers.length > 0) {
    const tier = [...product.priceTiers]
      .sort((a, b) => b.minQty - a.minQty)
      .find(t => quantity >= t.minQty);
    if (tier) applicablePrice = tier.pricePerUnit;
  }

  const subtotal = applicablePrice * quantity;
  const gst = subtotal * product.gstRate;
  const total = subtotal + gst;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRequestQuote = () => {
    navigate(`/quotation-request?productId=${product.id}&qty=${quantity}`);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.grade === product.grade || p.isFeatured))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-50/50 py-10">
      <SEOHead
        title={`${product.name} (${product.packaging}) Wholesale`}
        description={`Buy wholesale ${product.name} direct from mill. ${product.tagline}. Packaging: ${product.packaging}. Minimum Order Quantity: ${product.moq} ${product.unitLabel}. FSSAI certified.`}
        keywords={`${product.name}, ${product.packaging}, wholesale edible oil, ${product.grade}, B2B mustard oil supply`}
        canonicalPath={`/products/${product.id}`}
        ogImage={product.image}
        ogType="product"
        structuredData={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": product.image,
          "description": product.tagline,
          "sku": product.sku,
          "brand": {
            "@type": "Brand",
            "name": "Prime Fresh Oil Mills"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://primefreshoil.com/products/${product.id}`,
            "priceCurrency": "INR",
            "price": product.indicativePrice,
            "availability": product.stockStatus === 'In Stock' ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            "seller": {
              "@type": "Organization",
              "name": "Prime Fresh Oil Mills"
            }
          }
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-900 hover:text-mustard-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Wholesale Catalog</span>
          </Link>
        </div>

        {/* Product Main Showcase */}
        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* Left Col: Image & Badges */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-cream-100 aspect-4/3 sm:aspect-square border border-cream-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-forest-900/90 text-mustard-300 shadow">
                    {product.grade}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow">
                    {product.stockStatus}
                  </span>
                </div>
              </div>

              {/* Lab Certification Banner */}
              <div className="bg-cream-100/80 rounded-2xl p-4 border border-cream-300 flex items-start gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-forest-950 block font-serif">
                    Certified Cold Pressed Batch Quality
                  </strong>
                  <p className="text-slate-600 mt-0.5">
                    Tested for maximum pungency (AITC volatile oil), free from argemone, mineral oil or foreign seed adulteration.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Title, Description, Tiers, Quantity & Action Box */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-forest-700 uppercase tracking-widest mb-1.5">
                  SKU: {product.sku} • {product.packaging}
                </div>
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-forest-950 mb-3 leading-snug">
                  {product.name}
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  {product.description}
                </p>

                {/* Bulk Volume Pricing Tier Table */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-forest-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-mustard-600" />
                      <span>Wholesale Volume Discount Tiers</span>
                    </span>
                    <span className="text-[11px] text-slate-500">Ex-Mill Base (Exclusive of 5% GST)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {product.priceTiers.map((tier, idx) => {
                      const isCurrentTier =
                        quantity >= tier.minQty &&
                        (!tier.maxQty || quantity <= tier.maxQty);
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border transition ${
                            isCurrentTier
                              ? 'bg-mustard-50 border-mustard-500 shadow-xs ring-1 ring-mustard-400'
                              : 'bg-cream-50 border-cream-200'
                          }`}
                        >
                          <span className="text-[11px] text-slate-500 block">
                            {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} units` : `${tier.minQty}+ units`}
                          </span>
                          <span className="font-serif font-bold text-base text-forest-950 block mt-1">
                            ₹{tier.pricePerUnit.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-slate-400">per {product.unitLabel.replace(/s$/, '')}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Quantity Box & Subtotal Preview */}
                <div className="bg-cream-100/60 rounded-2xl p-5 border border-cream-300 mb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-forest-950 block uppercase">
                        Order Quantity ({product.unitLabel})
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Minimum Order Quantity: <strong>{product.moq} {product.unitLabel}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-cream-300 rounded-xl bg-white overflow-hidden text-sm">
                        <button
                          type="button"
                          onClick={() => setQuantity(prev => Math.max(product.moq, prev - 10))}
                          className="px-3 py-2 hover:bg-cream-200 font-bold text-slate-700 transition"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={product.moq}
                          value={quantity}
                          onChange={e => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                          className="w-20 text-center font-bold text-forest-950 bg-transparent focus:outline-hidden py-1.5"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(prev => prev + 10)}
                          className="px-3 py-2 hover:bg-cream-200 font-bold text-slate-700 transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQuantity(prev => prev + 50)}
                        className="px-2.5 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-xs font-bold text-slate-700"
                      >
                        +50
                      </button>
                    </div>
                  </div>

                  {/* Real-time Subtotal Breakdown */}
                  <div className="pt-3 border-t border-cream-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Applied Unit Rate:</span>
                      <span className="font-bold text-forest-950 text-sm">
                        ₹{applicablePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">GST (5% Edible Oil):</span>
                      <span className="font-bold text-emerald-800 text-sm">
                        ₹{Math.round(gst).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Indicative Order Total:</span>
                      <span className="font-serif font-black text-mustard-700 text-base">
                        ₹{Math.round(total).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-sm transition shadow-md flex items-center justify-center gap-2 ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-forest-900 hover:bg-forest-800 text-cream-50'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Bulk Order Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 text-mustard-400" />
                        <span>Add to Bulk Cart ({quantity} {product.unitLabel})</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="py-3.5 px-5 rounded-xl font-bold text-sm bg-mustard-500 hover:bg-mustard-400 text-forest-950 transition shadow-md flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Request Quotation with Freight</span>
                  </button>
                </div>

                {/* Free Commercial Sample Button */}
                <button
                  type="button"
                  onClick={() => setIsSampleModalOpen(true)}
                  className="w-full mt-3 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <PackageCheck className="w-4 h-4 text-amber-700" />
                  <span>Verified Buyer? Request Free 500ml Sample Bottle for Lab Testing</span>
                </button>
              </div>

              {/* Transit & Dispatch Info */}
              <div className="pt-6 border-t border-cream-200 mt-6 grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-forest-800 shrink-0" />
                  <span>Ex-Mill Gate loading or Transporter LR dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-forest-800 shrink-0" />
                  <span>Dispatch within 24-48 hrs of RTGS realization</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-10 shadow-sm mb-12">
          <h2 className="font-serif font-black text-2xl text-forest-950 mb-6 pb-3 border-b border-cream-200 flex items-center gap-2">
            <Scale className="w-6 h-6 text-mustard-600" />
            <span>Laboratory Technical Specifications</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Commodity / Grade:</span>
                <span className="font-bold text-forest-950">{product.grade}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Quality & Characteristics:</span>
                <span className="font-bold text-forest-950">{product.specs.pungencyIndex}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Acid Value / Grading:</span>
                <span className="font-bold text-forest-950">{product.specs.acidValue}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Moisture & Purity Limit:</span>
                <span className="font-bold text-forest-950">{product.specs.moistureContent}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Standard / Machine Cleaning:</span>
                <span className="font-bold text-forest-950">{product.specs.refractiveIndex}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Color & Appearance:</span>
                <span className="font-bold text-forest-950">{product.specs.colorValue}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Packaging Material:</span>
                <span className="font-bold text-forest-950">{product.packaging}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cream-100 text-sm">
                <span className="text-slate-500 font-medium">Shelf Life:</span>
                <span className="font-bold text-forest-950">{product.specs.shelfLife}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h3 className="font-serif font-black text-xl text-forest-950 mb-6">
            Complementary Wholesale SKUs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>

      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        defaultProduct={product.name}
      />
    </div>
  );
};
