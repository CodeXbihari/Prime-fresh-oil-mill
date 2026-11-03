import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/trade/ProductCard';
import { FacilityTourSection } from '../../components/trade/FacilityTourSection';
import { Hero3DElements } from '../../components/trade/Hero3DElements';
import { HeroProductSpotlight } from '../../components/trade/HeroProductSpotlight';
import { PrivateLabelSection } from '../../components/trade/PrivateLabelSection';
import { SampleKitModal } from '../../components/trade/SampleKitModal';
import { SEOHead } from '../../components/common/SEOHead';
import {
  Truck,
  Factory,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  PackageCheck,
  PhoneCall
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products } = useApp();
  const navigate = useNavigate();
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenSample = () => setIsSampleModalOpen(true);
    window.addEventListener('open-sample-kit-modal', handleOpenSample);
    return () => window.removeEventListener('open-sample-kit-modal', handleOpenSample);
  }, []);

  // Quick Quotation Calculator State
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'prod-yellow-mustard-seeds');
  const [calcQty, setCalcQty] = useState<number>(60);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const unitRate = selectedProduct ? selectedProduct.indicativePrice : 3450;
  const gstRate = selectedProduct ? selectedProduct.gstRate : 0.00;
  const estimatedSubtotal = unitRate * calcQty;
  const estimatedGst = estimatedSubtotal * gstRate;
  const estimatedTotal = estimatedSubtotal + estimatedGst;

  const handleStartQuote = () => {
    navigate(`/quotation-request?productId=${selectedProduct.id}&qty=${calcQty}`);
  };

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="min-h-screen ambient-glass-canvas">
      <SEOHead
        title="Premium Kachi Ghani Mustard Oil B2B Supply & Mandi Rates"
        description="Direct agro-mill manufacturer of cold pressed Kachi Ghani mustard oil, expeller pressed cooking oil, and wholesale B2B distributor supply. Real-time mandi rates, FSSAI certified, Matsya Industrial Area, Alwar, Rajasthan."
        keywords="kachi ghani mustard oil, mustard oil manufacturer, wholesale mustard oil, cold pressed mustard oil Alwar, mustard oil mill Rajasthan, B2B cooking oil supplier, sarson ka tel wholesale"
        canonicalPath="/"
      />

      {/* Cinematic Hero Section */}
      <Hero3DElements />

      {/* Primary Highlights Metrics Bar — Frosted Dark Glass */}
      <section className="relative glass-dark text-[#FFF8E8] py-8 sm:py-10 border-y border-white/10 w-full overflow-hidden shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full box-border relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="px-3 pt-3 md:pt-0 min-w-0">
              <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FAF7EF] tabular-nums drop-shadow-sm">
                120 <span className="text-xl sm:text-2xl text-[#E5A000] font-sans font-bold">MT</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7EF]/80 mt-1.5">
                Daily Seed Crushing Capacity
              </p>
            </div>
            <div className="px-3 pt-3 md:pt-0 min-w-0">
              <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FAF7EF] tabular-nums drop-shadow-sm">
                &gt;0.32<span className="text-xl sm:text-2xl text-[#E5A000] font-sans font-bold">%</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7EF]/80 mt-1.5">
                Allyl Isothiocyanate (High Pungency)
              </p>
            </div>
            <div className="px-3 pt-3 md:pt-0 min-w-0">
              <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FAF7EF] tabular-nums drop-shadow-sm">
                18<span className="text-xl sm:text-2xl text-[#E5A000] font-sans font-bold">+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7EF]/80 mt-1.5">
                States Direct Mandi Dispatch
              </p>
            </div>
            <div className="px-3 pt-3 md:pt-0 min-w-0">
              <div className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FAF7EF] tabular-nums drop-shadow-sm">
                100<span className="text-xl sm:text-2xl text-[#E5A000] font-sans font-bold">%</span>
              </div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#FAF7EF]/80 mt-1.5">
                Agmark Grade-1 Certified Pure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Mandi Rate & Quotation Estimator Section */}
      <section className="py-16 sm:py-24 border-b border-white/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[#102B20] text-xs font-bold tracking-wider uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#C49A32]" />
                <span>Transparent Mill-Gate Pricing</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#102B20] leading-tight">
                Instant Trade Calculator &amp; Wholesale Rate Estimator
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Estimate ex-mill packaging rates, applicable GST, and required Minimum Order Quantities (MOQ) before requesting your official signed proforma quotation.
              </p>
              <div className="p-4 rounded-2xl glass-panel text-xs space-y-2.5 text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Real-time calculations based on daily Rajasthan mandi seed rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Volume tier discounts automatically applied for 100+ units</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/60 pb-4 mb-5 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#C49A32] uppercase tracking-wider block">
                      Trade Desk Calculator
                    </span>
                    <h3 className="font-serif font-bold text-xl text-[#102B20]">
                      Estimate Wholesale Cost
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl glass-pill text-[#102B20] flex items-center justify-center font-bold shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#C49A32]" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                      Select Packaging SKU
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={e => {
                        setSelectedProductId(e.target.value);
                        const prod = products.find(p => p.id === e.target.value);
                        if (prod) setCalcQty(prod.moq);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.packaging})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-1.5 gap-1 text-xs">
                      <label className="font-bold text-slate-700 uppercase">
                        Order Quantity ({selectedProduct.unitLabel})
                      </label>
                      <span className="text-[11px] text-slate-500">
                        MOQ: <strong>{selectedProduct.moq} {selectedProduct.unitLabel}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={selectedProduct.moq}
                        value={calcQty}
                        onChange={e => setCalcQty(Math.max(1, parseInt(e.target.value) || selectedProduct.moq))}
                        className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-base font-bold text-slate-900 focus:outline-hidden"
                      />
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setCalcQty(prev => prev + 50)}
                          className="px-3 py-2.5 rounded-xl glass-pill hover:bg-white/90 text-xs font-bold text-slate-800 transition shrink-0 cursor-pointer shadow-xs"
                        >
                          +50
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalcQty(prev => prev + 100)}
                          className="px-3 py-2.5 rounded-xl glass-pill hover:bg-white/90 text-xs font-bold text-slate-800 transition shrink-0 cursor-pointer shadow-xs"
                        >
                          +100
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Breakdown Preview in Frosted Glass */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 space-y-2 border border-white/60 text-xs shadow-xs">
                    <div className="flex justify-between items-baseline gap-2 text-slate-600">
                      <span>Base Ex-Mill Rate:</span>
                      <span className="font-semibold text-slate-900">
                        ₹{unitRate.toLocaleString('en-IN')} per {selectedProduct.unitLabel.replace(/s$/, '')}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2 text-slate-600">
                      <span>Subtotal ({calcQty} units):</span>
                      <span className="font-semibold text-slate-900">
                        ₹{estimatedSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-2 text-slate-600">
                      <span>Estimated GST ({((selectedProduct.gstRate || 0) * 100).toFixed(0)}%):</span>
                      <span className="font-semibold text-emerald-800">
                        ₹{estimatedGst.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="border-t border-white/70 pt-2 flex justify-between items-baseline gap-2 font-bold">
                      <span className="text-[#102B20] text-sm">Est. Total (Excl. Freight):</span>
                      <span className="text-xl font-serif text-[#C49A32]">
                        ₹{estimatedTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartQuote}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-white/10"
                  >
                    <span>Proceed to Official Quotation</span>
                    <ArrowRight className="w-4 h-4 text-[#E5A000]" />
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C49A32]" />
                    <span>Need direct mandi dispatch assistance? Call <strong>+91 90572 92529</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Hero Product Spotlight Showcase: Yellow Mustard Oil */}
      <HeroProductSpotlight />

      {/* Featured Products Showcase */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
              Commercial Packaging Selection
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#102B20]">
              Featured Wholesale SKUs
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[#102B20] hover:text-[#C49A32] font-bold text-sm group"
          >
            <span>View All Pack Sizes &amp; Drums</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Production Process: Traditional Cold Ghani in Frosted Glass Cards */}
      <section className="py-16 sm:py-24 border-y border-white/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
              Authentic Milling Craftsmanship
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#102B20] mb-4">
              How We Extract Pure Kachi Ghani Oil
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We preserve the age-old heritage of Indian ghani pressing using heavy wooden-pestle mechanics and slow speed motors, ensuring temperatures never exceed 45°C to preserve natural volatile allyl isothiocyanates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative">
              <div className="w-11 h-11 rounded-xl bg-[#102B20] text-[#E5A000] flex items-center justify-center font-serif font-bold text-base mb-4 shadow-sm border border-white/20">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-[#102B20] mb-2">
                Seed Selection &amp; Cleaning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procured from Alwar and Bharatpur agro-mandis. Triple-deck aspirators and magnetic separators remove all foreign matter, dust, and immature seeds.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative">
              <div className="w-11 h-11 rounded-xl bg-[#102B20] text-[#E5A000] flex items-center justify-center font-serif font-bold text-base mb-4 shadow-sm border border-white/20">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-[#102B20] mb-2">
                Slow Ghani Cold Pressing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crushed slowly in mechanized ghanis. Zero external heating or chemical solvents. Retains maximum teekhapan, aroma, and natural omega fat ratio.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative">
              <div className="w-11 h-11 rounded-xl bg-[#102B20] text-[#E5A000] flex items-center justify-center font-serif font-bold text-base mb-4 shadow-sm border border-white/20">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-[#102B20] mb-2">
                Multi-Stage Micro-Filtration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Naturally settled in stainless steel conditioning tanks and passed through cotton canvas filter presses to achieve brilliant golden clarity without stripping nutrients.
              </p>
            </div>

            <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative">
              <div className="w-11 h-11 rounded-xl bg-[#102B20] text-[#E5A000] flex items-center justify-center font-serif font-bold text-base mb-4 shadow-sm border border-white/20">
                04
              </div>
              <h3 className="font-serif font-bold text-lg text-[#102B20] mb-2">
                Automated Sealed Packaging
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filled and sealed on automatic volumetric lines into food-grade lacquered 15L tins, HDPE jars, and PET bottles with tamper-proof induction seals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Mill Facility & Working Style Video Section */}
      <FacilityTourSection />

      {/* Private Label Bottling & OEM Tanker Milling */}
      <PrivateLabelSection />

      {/* Why Wholesalers Partner With Us */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
              B2B Manufacturer Advantage
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#102B20] mb-6 leading-tight">
              Why Wholesalers Across India Trust Prime Fresh Oil Mills
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4 p-3.5 rounded-2xl glass-panel shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#102B20]/10 text-[#102B20] flex items-center justify-center shrink-0 border border-[#102B20]/10">
                  <Factory className="w-5 h-5 text-[#C49A32]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#102B20] text-base mb-1">
                    Direct Mill-Gate Commercial Pricing
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    By sourcing directly from our crushing mill, wholesalers bypass broker brokerage and depot markups, securing maximum operating margin for regional distribution.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-3.5 rounded-2xl glass-panel shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#102B20]/10 text-[#102B20] flex items-center justify-center shrink-0 border border-[#102B20]/10">
                  <CheckCircle2 className="w-5 h-5 text-[#C49A32]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#102B20] text-base mb-1">
                    Consistent Batch-to-Batch Pungency
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our in-house quality lab tests every crushing cycle for moisture, FFA, and pungency index, ensuring your customers experience the identical signature flavor every time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-3.5 rounded-2xl glass-panel shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#102B20]/10 text-[#102B20] flex items-center justify-center shrink-0 border border-[#102B20]/10">
                  <Truck className="w-5 h-5 text-[#C49A32]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#102B20] text-base mb-1">
                    Dedicated Transport &amp; Lorry Receipt (LR) Tracking
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We coordinate directly with reputed transporters (VRL, TCI, ARC) or facilitate seamless ex-mill truck loading with certified weighbridge tare slips.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-3.5 rounded-2xl glass-panel shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#102B20]/10 text-[#102B20] flex items-center justify-center shrink-0 border border-[#102B20]/10">
                  <PackageCheck className="w-5 h-5 text-[#C49A32]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#102B20] text-base mb-1">
                    Heavy-Gauge Leak-Proof Packing
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tins are manufactured from prime tinplate with reinforced seams to withstand rough Indian road transit without denting or leakages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card: Interstate Mandi Supply Network */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/60">
            <img
              src="/images/black-mustard-seeds.jpg"
              alt="Authentic Rajasthan Black Mustard Seeds and Interstate Supply"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102B20]/95 via-[#102B20]/50 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs font-bold text-[#E5A000] uppercase tracking-wider mb-1">
                Interstate Logistics Network
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#FAF7EF] mb-2">
                Supplying Eastern UP, Bihar, Bengal &amp; Assam Mandis
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                High-frequency daily dispatches to Kanpur, Patna, Kolkata, Lucknow, Varanasi, and Siliguri wholesale trading hubs with computerized weighbridge tare slips and transit insurance.
              </p>
              <div className="flex items-center gap-3 text-xs text-[#FAF7EF]/90 font-semibold">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill-dark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A000]" />
                  <span>Insured Transporters</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill-dark">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A000]" />
                  <span>Door &amp; Ex-Mill Delivery</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor Onboarding CTA Card — Frosted Dark Glass */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-dark rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-[#E5A000] uppercase tracking-widest block">
                Exclusive Territorial Dealerships
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#FAF7EF]">
                Apply to Become an Authorized Distributor in Your District
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We are actively appointing Tier-1 and Tier-2 wholesale partners and super-stockists across expanding districts. Benefit from protected territory allocation, volume rebates, and flexible credit terms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/portal/register"
                className="px-6 py-3.5 rounded-xl bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] font-bold text-sm tracking-wide text-center transition shadow-md cursor-pointer border border-white/30"
              >
                Submit Distributor KYC
              </Link>
              <Link
                to="/quotation-request"
                className="px-6 py-3.5 rounded-xl glass-pill-dark hover:bg-black/60 text-[#FAF7EF] font-bold text-sm tracking-wide text-center transition border border-white/20 cursor-pointer shadow-sm"
              >
                Request Custom Quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free 500ml Commercial Lab Sample Kit Modal */}
      <SampleKitModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
};
