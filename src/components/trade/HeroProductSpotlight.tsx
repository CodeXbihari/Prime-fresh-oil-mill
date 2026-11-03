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
    <section className="relative bg-[#102B20] text-[#FFF8E8] py-16 sm:py-24 border-y border-[#C49A32]/25 overflow-hidden w-full">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#163628] border border-[#E5A000]/30 text-[#F5C542] text-xs font-semibold tracking-wider uppercase mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A000]" />
            <span>Flagship Manufacturer Brand</span>
          </div>
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#FAF7EF] tracking-tight leading-tight mb-4">
            Prime Fresh Pure Yellow Mustard Oil
          </h2>
          <p className="text-[#FFF8E8]/80 text-sm sm:text-base leading-relaxed">
            Cold-pressed exclusively from bold Rajasthan Yellow Mustard Seeds (Peeli Sarson). Renowned across Indian FMCG &amp; wholesale mandis for its luminous golden honey clarity, signature pungent bite, and natural digestive aroma.
          </p>
        </div>

        {/* 2-Column Product Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Product Photography Stage */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden shadow-lg border border-[#C49A32]/30 bg-[#0A1D15]">
              {/* Product Photo */}
              <img
                src={
                  activeProduct?.image ||
                  (selectedPackId === tinProduct?.id
                    ? '/images/prime-fresh-mustard-oil-tin-15l.jpg'
                    : '/images/prime-fresh-mustard-oil-bottle.jpg')
                }
                alt={activeProduct?.name || 'Prime Fresh Mustard Oil'}
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
              />

              {/* Badges on Photo */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#102B20]/90 backdrop-blur-xs border border-[#E5A000]/30 text-[#F5C542] text-[11px] font-semibold tracking-wide uppercase shadow-sm flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#E5A000]" />
                  <span>Kachi Ghani Cold-Pressed</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#102B20]/90 backdrop-blur-xs border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold tracking-wide uppercase shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Argemone Free</span>
                </span>
              </div>

              {/* Bottom Photo Caption Strip */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-[#0A1D15] via-[#0A1D15]/80 to-transparent text-white">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#F5C542]">
                    {selectedPackId === tinProduct?.id ? 'Food-Grade 15L Prime Tinplate' : 'Bottled at Alwar Works, Rajasthan'}
                  </span>
                  <span className="text-slate-300 text-[11px]">Agmark Grade-1 Standard</span>
                </div>
              </div>
            </div>

            {/* Feature Badges below image */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md sm:max-w-lg mt-4 text-center">
              <div className="bg-[#163628] rounded-xl p-3 border border-[#C49A32]/20 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pungency (AITC)</span>
                <span className="font-bold text-[#F5C542] text-sm mt-0.5 block">&gt; 0.32% Natural</span>
              </div>
              <div className="bg-[#163628] rounded-xl p-3 border border-[#C49A32]/20 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Free Fatty Acids</span>
                <span className="font-bold text-emerald-400 text-sm mt-0.5 block">&lt; 0.50 mg KOH</span>
              </div>
              <div className="bg-[#163628] rounded-xl p-3 border border-[#C49A32]/20 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Shelf Life</span>
                <span className="font-bold text-[#FAF7EF] text-sm mt-0.5 block">12 Months</span>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesaler Commercials & Ordering Box */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#EBE7DD] space-y-5">
              {/* Product Title & Commercial Rate */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest">
                    Direct Mill-Gate Wholesale SKU
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    Ready In Godown
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#102B20]">
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
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                      selectedPackId === bottleProduct.id
                        ? 'border-[#C49A32] bg-[#FAF8F5] ring-1 ring-[#C49A32]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Package className={`w-5 h-5 shrink-0 ${selectedPackId === bottleProduct.id ? 'text-[#C49A32]' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-slate-900 truncate">1L Pet Bottle (Carton of 16)</div>
                      <div className="text-[11px] text-slate-500">₹2,320 / Carton (₹145/bottle)</div>
                    </div>
                  </button>

                  {tinProduct && (
                    <button
                      type="button"
                      onClick={() => handlePackChange(tinProduct.id)}
                      className={`p-3 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                        selectedPackId === tinProduct.id
                          ? 'border-[#C49A32] bg-[#FAF8F5] ring-1 ring-[#C49A32]'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <Package className={`w-5 h-5 shrink-0 ${selectedPackId === tinProduct.id ? 'text-[#C49A32]' : 'text-slate-400'}`} />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate">15L Food-Grade Tin</div>
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
                    MOQ: <strong className="text-slate-900">{activeProduct.moq} {activeProduct.unitLabel}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={activeProduct.moq}
                    value={orderQty}
                    onChange={e => setOrderQty(Math.max(1, parseInt(e.target.value) || activeProduct.moq))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#FAF8F5] text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C49A32]"
                  />
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setOrderQty(prev => prev + 50)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
                    >
                      +50
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderQty(prev => prev + 100)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
                    >
                      +100
                    </button>
                  </div>
                </div>
              </div>

              {/* Transparent Cost Breakdown Preview */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 space-y-2 border border-[#EBE7DD] text-xs">
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Ex-Mill Unit Rate:</span>
                  <span className="font-semibold text-slate-900">₹{unitPrice.toLocaleString('en-IN')} per {activeProduct.unitLabel.replace(/s$/, '')}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Subtotal ({orderQty} units):</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-baseline text-slate-600">
                  <span>Applicable GST (5% Edible Oil):</span>
                  <span className="font-semibold text-emerald-800">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[#EBE7DD] pt-2 flex justify-between items-baseline font-bold">
                  <span className="text-[#102B20] text-sm">Est. Total (Excl. Freight):</span>
                  <span className="text-xl font-serif text-[#C49A32]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Request Quotation */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] font-bold text-sm tracking-wide transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {addedToast ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#102B20]" />
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
                    className="w-full py-3.5 px-4 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-sm tracking-wide transition shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request Proforma</span>
                    <ArrowRight className="w-4 h-4 text-[#E5A000]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-sample-kit-modal'))}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <PackageCheck className="w-4 h-4 text-amber-800" />
                  <span>Verified Wholesaler? Request Free 500ml Testing Sample Kit</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Door delivery &amp; ex-mill options available</span>
                  </span>
                  <Link to={`/products/${activeProduct.id}`} className="font-semibold text-[#C49A32] hover:underline">
                    View Full Specs →
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
