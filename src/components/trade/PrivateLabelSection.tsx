import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  PhoneCall
} from 'lucide-react';

export const PrivateLabelSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<'oem' | 'tanker' | 'toll'>('oem');

  return (
    <section className="py-16 sm:py-24 border-b border-white/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-[#C49A32] text-xs font-semibold uppercase tracking-wider mb-3">
              <Factory className="w-3.5 h-3.5 text-[#C49A32]" />
              <span>OEM &amp; Contract Manufacturing</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#2D2418] tracking-tight">
              Private Label Bottling &amp; Bulk Road Tanker Milling
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Don't own an oil mill? We serve as the manufacturing backbone for supermarkets, regional FMCG brands, edible oil packers, and institutional food chains across India.
            </p>
          </div>

          <div className="flex items-center gap-1.5 glass-panel p-1.5 rounded-2xl shrink-0 shadow-xs">
            <button
              type="button"
              onClick={() => setSelectedService('oem')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedService === 'oem'
                  ? 'bg-[#C49A32] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Private Label Packaging
            </button>
            <button
              type="button"
              onClick={() => setSelectedService('tanker')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedService === 'tanker'
                  ? 'bg-[#C49A32] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bulk Road Tankers
            </button>
            <button
              type="button"
              onClick={() => setSelectedService('toll')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedService === 'toll'
                  ? 'bg-[#C49A32] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Toll Crushing
            </button>
          </div>
        </div>

        {/* Content based on selected tab — Frosted Glass Panel */}
        {selectedService === 'oem' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block">
                Turnkey FMCG Retail Solutions
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#2D2418]">
                Your Brand Name, Our Fresh Mustard Oil Crushing Facility
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Launch or expand your regional brand with turnkey contract packaging. We handle Sortex seed grading, slow cold expeller pressing, high-speed automated packaging, tamper-evident induction sealing, and custom barcode/FSSAI labeling.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32]" />
                    Packaging Formats
                  </div>
                  <p className="text-[11px] text-slate-500">
                    200ml, 500ml, 1 Litre PET bottles, 2L &amp; 5L Jars with handle, 15L prime tinplate.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32]" />
                    Custom Labeling
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Multi-color BOPP &amp; metalized labels, EAN-13 barcodes, and your FSSAI marketer number.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32]" />
                    Flexible MOQs
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Low starting minimums from 300 cartons (4,800 bottles) for new brand trials.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A32]" />
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
                  className="px-5 py-3 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-xs flex items-center gap-2 transition shadow-md cursor-pointer border border-[#C49A32]/40"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
                  <span>Request Private Label Quotation</span>
                </button>
                <a
                  href="tel:9057292529"
                  className="px-4 py-3 rounded-xl glass-panel hover:bg-white text-[#2D2418] font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-xs border border-[#C49A32]/30"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#C49A32]" />
                  <span>Call Contract Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white/40 backdrop-blur-md p-2">
                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src="/images/prime-fresh-mustard-oil-bottle.jpg"
                    alt="Private Label Packaging Example"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#221A0F]/85 backdrop-blur-md flex flex-col justify-end p-4 text-white border-t border-white/10">
                    <span className="text-[11px] font-bold text-[#F5C542] uppercase">Available in 1L &amp; 15L Formats</span>
                    <p className="text-xs text-slate-200 mt-0.5">Custom cap branding &amp; high-speed automatic carton shrink-wrapping.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedService === 'tanker' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block">
                Bulk Industrial Crushing
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#2D2418]">
                20 to 30 Metric Tonne Road Tanker Dispatches
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct raw or filtered cold-pressed mustard oil supply for edible oil packaging plants, regional refiners, pickle manufacturers, and commercial condiment makers across northern and eastern India.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C49A32]" />
                    Dedicated Tanker Fleet
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Clean, food-grade stainless steel &amp; MS road tankers with GPS live tracking.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C49A32]" />
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
                  className="px-5 py-3 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-xs flex items-center gap-2 transition shadow-md cursor-pointer border border-[#C49A32]/40"
                >
                  <span>Request Tanker Spot Rate &amp; Availability</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white/40 backdrop-blur-md p-2">
                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src="/images/prime-fresh-mustard-oil-tin-15l.jpg"
                    alt="Industrial Wholesale Packaging"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#221A0F]/85 backdrop-blur-md flex flex-col justify-end p-4 text-white border-t border-white/10">
                    <span className="text-[11px] font-bold text-[#F5C542] uppercase">20–30 MT Road Tanker Supply</span>
                    <p className="text-xs text-slate-200 mt-0.5">Ex-Mill Alwar or Delivered to Your Factory Weighbridge.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedService === 'toll' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block">
                Job Work &amp; Toll Processing
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#2D2418]">
                Toll Crushing of Your Yellow / Black Mustard Seeds
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bring your own raw seed procurement from any mandi or let us source seed lots under your instructions. We run slow mechanical expellers with 100% yield accountability, returning cold-pressed oil and high-protein de-oiled cake (khali) at competitive per-quintal crushing charges.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-[#C49A32]" />
                    120 MT Crushing Power
                  </div>
                  <p className="text-[11px] text-slate-500">
                    High daily throughput avoids seasonal seed godown holding losses.
                  </p>
                </div>

                <div className="bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-white/80 shadow-xs">
                  <div className="font-bold text-xs text-[#2D2418] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C49A32]" />
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
                  className="px-5 py-3 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-xs flex items-center gap-2 transition shadow-md cursor-pointer border border-[#C49A32]/40"
                >
                  <span>Enquire for Toll Milling Terms</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white/40 backdrop-blur-md p-2">
                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src="/images/yellow-mustard-seeds.jpg"
                    alt="Toll Crushing Seed Feedstock"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#221A0F]/85 backdrop-blur-md flex flex-col justify-end p-4 text-white border-t border-white/10">
                    <span className="text-[11px] font-bold text-[#F5C542] uppercase">Seed In, Pure Oil Out</span>
                    <p className="text-xs text-slate-200 mt-0.5">Crushing charges from ₹180 per quintal with full cake recovery.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
