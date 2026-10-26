import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Package,
  PackageCheck
} from 'lucide-react';

export const HeroProductSpotlight: React.FC = () => {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  // Find the hero yellow mustard oil products
  const bottleProduct = products.find(p => p.id === 'prod-yellow-mustard-oil-bottle') || products[0];
  const tinProduct = products.find(p => p.id === 'prod-yellow-mustard-oil-tin');

  const [selectedPackId, setSelectedPackId] = useState<string>(bottleProduct?.id || 'prod-yellow-mustard-oil-bottle');
  const activeProduct = products.find(p => p.id === selectedPackId) || bottleProduct;

  const [orderQty, setOrderQty] = useState<number>(activeProduct?.moq || 50);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const unitPrice = activeProduct?.indicativePrice || 2320;
  const gstRate = activeProduct?.gstRate || 0.05;
  const subtotal = unitPrice * orderQty;
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  const handlePackChange = (id: string) => {
    setSelectedPackId(id);
    const prod = products.find(p => p.id === id);
    if (prod) {
      setOrderQty(prod.moq);
    }
  };

  const handleAddToCart = () => {
    if (activeProduct) {
      addToCart(activeProduct, orderQty);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const handleProceedQuote = () => {
    navigate(`/quotation-request?productId=${activeProduct.id}&qty=${orderQty}`);
  };

  return (
    <section className="relative bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-cream-50 py-16 sm:py-24 border-y border-forest-800 overflow-hidden w-full">
      {/* Ambient golden glow & subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mustard-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-800/90 border border-mustard-500/50 text-mustard-300 text-xs font-bold tracking-wider uppercase mb-3.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-mustard-400 fill-mustard-400" />
            <span>Flagship Manufacturer Brand</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-cream-50 tracking-tight leading-tight mb-4">
            Prime Fresh Pure Yellow Mustard Oil
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The crown jewel of our crushing mills: Cold-pressed exclusively from bold Rajasthan Yellow Mustard Seeds (Peeli Sarson). Renowned across Indian FMCG & wholesale mandis for its luminous golden honey clarity, signature pungent bite, and natural digestive aroma.
          </p>
        </div>

        {/* 2-Column Product Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Commercial Product Photography Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-mustard-500/40 bg-gradient-to-b from-forest-900 to-forest-950 group">
              {/* Product Photo */}
              <img
                src={
                  activeProduct?.image ||
                  (selectedPackId === tinProduct?.id
                    ? '/images/prime-fresh-mustard-oil-tin-15l.jpg'
                    : '/images/prime-fresh-mustard-oil-bottle.jpg')
                }
                alt={activeProduct?.name || 'Prime Fresh Mustard Oil'}
                className="w-full h-[460px] sm:h-[540px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Floating Purity Badges on Photo */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-mustard-400/50 text-mustard-300 text-[11px] font-bold tracking-wide uppercase shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-mustard-400 fill-mustard-400" />
                  <span>Kachi Ghani Cold-Pressed</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-emerald-400/50 text-emerald-300 text-[11px] font-bold tracking-wide uppercase shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Argemone Free</span>
                </span>
              </div>

              {/* Bottom Photo Caption Strip */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent text-white">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-mustard-300">
                    {selectedPackId === tinProduct?.id ? 'Food-Grade 15L Prime Tinplate' : 'Bottled at Alwar Works, Rajasthan'}
                  </span>
                  <span className="text-slate-300">Agmark Grade-1 Standard</span>
                </div>
              </div>
            </div>

            {/* Quick Feature Badges below image */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md sm:max-w-lg mt-4 text-center">
              <div className="bg-forest-900/80 rounded-2xl p-3 border border-forest-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pungency (AITC)</span>
                <span className="font-bold text-mustard-300 text-sm mt-0.5 block">&gt; 0.32% Natural</span>
              </div>
              <div className="bg-forest-900/80 rounded-2xl p-3 border border-forest-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Free Fatty Acids</span>
                <span className="font-bold text-emerald-300 text-sm mt-0.5 block">&lt; 0.50 mg KOH</span>
              </div>
              <div className="bg-forest-900/80 rounded-2xl p-3 border border-forest-800 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Shelf Life</span>
                <span className="font-bold text-cream-50 text-sm mt-0.5 block">12 Months</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesaler Commercials & Instant Ordering Box */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white text-forest-950 rounded-3xl p-6 sm:p-8 shadow-2xl border border-cream-300 space-y-6">
              {/* Product Title & Commercial Rate */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-mustard-600 uppercase tracking-widest">
                    Direct Mill-Gate Wholesale SKU
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    Ready In Godown
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
                  {activeProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {activeProduct.tagline}
                </p>
              </div>

              {/* Packaging Format Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Packaging Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handlePackChange(bottleProduct.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                      selectedPackId === bottleProduct.id
                        ? 'border-mustard-500 bg-mustard-50 ring-2 ring-mustard-400'
                        : 'border-cream-300 bg-cream-50/50 hover:bg-cream-100'
                    }`}
                  >
                    <Package className={`w-5 h-5 shrink-0 ${selectedPackId === bottleProduct.id ? 'text-mustard-700' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-forest-950 truncate">1L Pet Bottle (Carton of 16)</div>
                      <div className="text-[11px] text-slate-500">₹2,320 / Carton (₹145/bottle)</div>
                    </div>
                  </button>

                  {tinProduct && (
                    <button
                      type="button"
                      onClick={() => handlePackChange(tinProduct.id)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                        selectedPackId === tinProduct.id
                          ? 'border-mustard-500 bg-mustard-50 ring-2 ring-mustard-400'
                          : 'border-cream-300 bg-cream-50/50 hover:bg-cream-100'
                      }`}
                    >
                      <Package className={`w-5 h-5 shrink-0 ${selectedPackId === tinProduct.id ? 'text-mustard-700' : 'text-slate-400'}`} />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-forest-950 truncate">15L Food-Grade Tin</div>
                        <div className="text-[11px] text-slate-500">₹2,180 / Tin</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity Selector with MOQ */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <label className="font-bold text-slate-700 uppercase">
                    Order Quantity ({activeProduct.unitLabel})
                  </label>
                  <span className="text-[11px] text-slate-500">
                    MOQ: <strong className="text-forest-950">{activeProduct.moq} {activeProduct.unitLabel}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={activeProduct.moq}
                    value={orderQty}
                    onChange={e => setOrderQty(Math.max(1, parseInt(e.target.value) || activeProduct.moq))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-base font-bold text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                  />
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setOrderQty(prev => prev + 50)}
                      className="px-3 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-xs font-bold text-slate-800 transition cursor-pointer"
                    >
                      +50
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderQty(prev => prev + 100)}
                      className="px-3 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-xs font-bold text-slate-800 transition cursor-pointer"
                    >
                      +100
                    </button>
                  </div>
                </div>
              </div>

              {/* Transparent Cost Breakdown Preview */}
              <div className="bg-cream-100/90 rounded-2xl p-4 space-y-2 border border-cream-300/80 text-xs">
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Ex-Mill Unit Rate:</span>
                  <span className="font-semibold text-forest-950">₹{unitPrice.toLocaleString('en-IN')} per {activeProduct.unitLabel.replace(/s$/, '')}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Subtotal ({orderQty} units):</span>
                  <span className="font-semibold text-forest-950">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Applicable GST (5% Edible Oil):</span>
                  <span className="font-semibold text-emerald-800">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-cream-300 pt-2 flex justify-between items-baseline font-bold">
                  <span className="text-forest-950 text-sm">Est. Total (Excl. Freight):</span>
                  <span className="text-xl font-serif text-mustard-700">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Request Quotation */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-sm tracking-wide transition shadow-lg shadow-mustard-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {addedToast ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-forest-950" />
                        <span>Added {orderQty} Units!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bulk Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedQuote}
                    className="w-full py-3.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm tracking-wide transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request Proforma</span>
                    <ArrowRight className="w-4 h-4 text-mustard-400" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-sample-kit-modal'))}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <PackageCheck className="w-4 h-4 text-amber-700" />
                  <span>Verified Wholesaler? Request Free 500ml Testing Sample Kit</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Door delivery & ex-mill options available</span>
                  </span>
                  <Link to={`/products/${activeProduct.id}`} className="font-semibold text-mustard-700 hover:underline">
                    Full Lab Specs & Certificates →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
