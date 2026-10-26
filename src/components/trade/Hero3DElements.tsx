import React from 'react';
import { Award, ShieldCheck, Scale, Truck, ArrowRight, FileText, Droplet, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero3DElements: React.FC = () => {
  return (
    <div
      className="relative min-h-[90svh] sm:min-h-screen w-full flex flex-col justify-between pt-16 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16 overflow-hidden bg-forest-950 text-cream-50"
    >
      {/* Background Landscape Image with gradient overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/hero-mustard-tree.jpg"
          alt="Vibrant golden mustard fields with solitary green tree under blue sky"
          className="w-full h-full object-cover object-[70%_center] sm:object-[center_right] lg:object-center"
          loading="eager"
          fetchPriority="high"
        />

        {/* Sophisticated gradient blend keeping tree, field and sky vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 via-50% to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-black/35 z-10" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Eyebrow, Heading, Description, Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0 w-full space-y-6 max-w-2xl">
            {/* Elegant Eyebrow Badge */}
            <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 backdrop-blur-md border border-mustard-400/40 text-mustard-300 text-xs font-bold tracking-wider uppercase shadow-xl">
              <Droplet className="w-4 h-4 fill-mustard-400 text-mustard-400 shrink-0" />
              <span className="truncate">Cold Pressed Kachi Ghani • Pure First-Press Mustard Oil</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-white leading-[1.12] tracking-tight [font-size:clamp(2.25rem,4.5vw,4.25rem)] text-balance drop-shadow-md">
              Pure Mustard Oil Direct from Rajasthan's{' '}
              <span className="text-mustard-400 underline decoration-mustard-500/60 decoration-wavy underline-offset-8">
                Golden Fields
              </span>{' '}
              & Expeller Mills
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed font-sans max-w-xl text-balance drop-shadow-sm">
              Supplying India's leading wholesale distributors, mandi stockists, and institutional food processors with traditional cold-pressed high-pungency mustard oil. Factory gate rates with tamper-evident packaging and bulk tanker logistics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-2 w-full max-w-lg">
              <Link
                to="/products"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-sm tracking-wide transition shadow-xl shadow-mustard-500/30 flex items-center justify-center gap-2 group text-center cursor-pointer active:scale-95 hover:shadow-mustard-500/50"
              >
                <span>Explore Wholesale Packs</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/quotation-request"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-forest-900/80 hover:bg-forest-800 text-white font-bold text-sm tracking-wide transition border border-white/25 backdrop-blur-md flex items-center justify-center gap-2 text-center cursor-pointer active:scale-95 shadow-lg hover:border-mustard-400/60"
              >
                <FileText className="w-4 h-4 text-mustard-400 shrink-0" />
                <span>Request Proforma Quote</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Preserves tree focal point with Glass Purity Card */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex flex-col items-end justify-center relative">
            <div className="bg-forest-950/70 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white max-w-xs shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-mustard-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>First-Press Extraction</span>
                </div>
                <Sparkles className="w-4 h-4 text-mustard-400 opacity-80" />
              </div>

              <h4 className="font-serif font-bold text-base text-cream-50 leading-snug">
                100% Cold-Pressed Mustard Oil
              </h4>

              <p className="text-xs text-slate-200 leading-relaxed">
                Slow traditional expeller crushed at &lt;45°C. Retains natural Allyl Isothiocyanate aroma, bright golden honey clarity, and zero chemical residue.
              </p>

              {/* Oil Specs Mini-Strip */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-forest-900/60 p-1.5 rounded-lg border border-forest-800">
                  <span className="text-slate-400 block uppercase">Pungency (AITC)</span>
                  <span className="font-bold text-mustard-300 text-xs mt-0.5 block">&gt; 0.34% Volatile</span>
                </div>
                <div className="bg-forest-900/60 p-1.5 rounded-lg border border-forest-800">
                  <span className="text-slate-400 block uppercase">Free Fatty Acid</span>
                  <span className="font-bold text-emerald-400 text-xs mt-0.5 block">&lt; 0.50% FFA</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-mustard-300 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pure Peeli Sarson</span>
                </span>
                <span className="text-white font-bold">120 MT Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glassmorphic Trust Badges Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-2">
        <div className="p-4 sm:p-5 rounded-2xl bg-forest-950/65 backdrop-blur-md border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-200 shadow-xl">
          <div className="flex items-center gap-2.5 hover:text-white transition">
            <Award className="w-5 h-5 text-mustard-400 shrink-0" />
            <span className="font-medium">Grade-1 Agmark Standard</span>
          </div>
          <div className="flex items-center gap-2.5 hover:text-white transition">
            <ShieldCheck className="w-5 h-5 text-mustard-400 shrink-0" />
            <span className="font-medium">FSSAI Compliant Facility</span>
          </div>
          <div className="flex items-center gap-2.5 hover:text-white transition">
            <Scale className="w-5 h-5 text-mustard-400 shrink-0" />
            <span className="font-medium">Digital Weighbridge Certified</span>
          </div>
          <div className="flex items-center gap-2.5 hover:text-white transition">
            <Truck className="w-5 h-5 text-mustard-400 shrink-0" />
            <span className="font-medium">All-India Dispatch Fleet</span>
          </div>
        </div>
      </div>
    </div>
  );
};


