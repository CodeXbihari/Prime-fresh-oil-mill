import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const PrivateLabelSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<'oem' | 'tanker' | 'toll'>('oem');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mustard-100 text-mustard-900 border border-mustard-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Factory className="w-3.5 h-3.5 text-mustard-700" />
              <span>OEM & Contract Manufacturing</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-forest-950 tracking-tight">
              Private Label Bottling & Bulk Road Tanker Milling
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Don't own an oil mill? We serve as the manufacturing backbone for supermarkets, regional FMCG brands, edible oil packers, and institutional food chains across India.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-cream-100 p-1.5 rounded-2xl border border-cream-300 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedService('oem')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedService === 'oem'
                  ? 'bg-forest-900 text-cream-50 shadow-sm'
                  : 'text-slate-700 hover:text-forest-950'
              }`}
            >
              Private Label Packaging
            </button>
            <button
              type="button"
              onClick={() => setSelectedService('tanker')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedService === 'tanker'
                  ? 'bg-forest-900 text-cream-50 shadow-sm'
                  : 'text-slate-700 hover:text-forest-950'
              }`}
            >
              Bulk Road Tankers
            </button>
            <button
              type="button"
              onClick={() => setSelectedService('toll')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedService === 'toll'
                  ? 'bg-forest-900 text-cream-50 shadow-sm'
                  : 'text-slate-700 hover:text-forest-950'
              }`}
            >
              Toll Crushing
            </button>
          </div>
        </div>

        {/* Content based on selected tab */}
        {selectedService === 'oem' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-mustard-700 uppercase tracking-widest block">
                Turnkey FMCG Retail Solutions
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
                Your Brand Name, Our Fresh Mustard Oil Crushing Facility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Launch or expand your regional brand with turnkey contract packaging. We handle Sortex seed grading, slow cold expeller pressing, high-speed automated packaging, tamper-evident induction sealing, and custom barcode/FSSAI labeling.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Packaging Formats
                  </div>
                  <p className="text-[11px] text-slate-500">
                    200ml, 500ml, 1 Litre PET bottles, 2L & 5L Jars with handle, 15L prime tinplate.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Custom Labeling
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Multi-color BOPP & metalized labels, EAN-13 barcodes, and your FSSAI marketer number.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Flexible MOQs
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Low starting minimums from 300 cartons (4,800 bottles) for new brand trials.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Regulatory Compliance
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Pre-cleared Agmark Grade-1 specifications, legal metrology, and nutritional claims.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/quotation-request?service=private-label')}
                  className="px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-mustard-400" />
                  <span>Request Private Label Quotation</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-trade-chatbot', { detail: { query: 'Tell me about private label packaging options and MOQs' } }))}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-cream-100 text-forest-950 font-semibold text-xs border border-cream-300 transition"
                >
                  Ask AI About Contract Packing
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-cream-200">
                <img
                  src="/images/prime-fresh-mustard-oil-bottle.jpg"
                  alt="Private Label Packaging Example"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-mustard-300 uppercase">Available in 1L & 15L Formats</span>
                  <p className="text-xs text-slate-200 mt-0.5">Custom cap branding & high-speed automatic carton shrink-wrapping.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedService === 'tanker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-mustard-700 uppercase tracking-widest block">
                Bulk Industrial Crushing
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
                20 to 30 Metric Tonne Road Tanker Dispatches
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct raw or filtered cold-pressed mustard oil supply for edible oil packaging plants, regional refiners, pickle manufacturers, and commercial condiment makers across northern and eastern India.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-forest-800" />
                    Dedicated Tanker Fleet
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Clean, food-grade stainless steel & MS road tankers with GPS live tracking.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Tare Weight Guarantee
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Dual computerized weighbridge slips + tamper-proof security wire seals on every discharge valve.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/quotation-request?service=road-tanker')}
                  className="px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <span>Request Tanker Spot Rate & Availability</span>
                  <ArrowRight className="w-3.5 h-3.5 text-mustard-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-cream-200">
                <img
                  src="/images/prime-fresh-mustard-oil-tin-15l.jpg"
                  alt="Industrial Wholesale Packaging"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-mustard-300 uppercase">20–30 MT Road Tanker Supply</span>
                  <p className="text-xs text-slate-200 mt-0.5">Ex-Mill Alwar or Delivered to Your Factory Weighbridge.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedService === 'toll' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-mustard-700 uppercase tracking-widest block">
                Job Work & Toll Processing
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
                Toll Crushing of Your Yellow / Black Mustard Seeds
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bring your own raw seed procurement from any mandi or let us source seed lots under your instructions. We run slow mechanical expellers with 100% yield accountability, returning cold-pressed oil and high-protein de-oiled cake (khali) at competitive per-quintal crushing charges.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-forest-800" />
                    120 MT Crushing Power
                  </div>
                  <p className="text-[11px] text-slate-500">
                    High daily throughput avoids seasonal seed godown holding losses.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-cream-200">
                  <div className="font-bold text-xs text-forest-950 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-mustard-600" />
                    Zero Loss Accounting
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Precise computerized recovery reconciliation of oil yield and oilcake.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/quotation-request?service=toll-crushing')}
                  className="px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs flex items-center gap-2 transition shadow-sm"
                >
                  <span>Enquire for Toll Milling Terms</span>
                  <ArrowRight className="w-3.5 h-3.5 text-mustard-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-cream-200">
                <img
                  src="/images/yellow-mustard-seeds.jpg"
                  alt="Toll Crushing Seed Feedstock"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-mustard-300 uppercase">Seed In, Pure Oil Out</span>
                  <p className="text-xs text-slate-200 mt-0.5">Crushing charges from ₹180 per quintal with full cake recovery.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
