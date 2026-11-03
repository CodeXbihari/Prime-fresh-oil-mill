import React, { useRef } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero3DElements: React.FC = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative min-h-[82svh] sm:min-h-[88svh] lg:min-h-[92svh] w-full flex items-center overflow-hidden bg-[#102B20] text-[#FFF8E8]">
      {/* Background Video — High clarity with natural exposure */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none">
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-mustard-tree.jpg"
          className="w-full h-full object-cover object-center brightness-[1.12] contrast-[1.08] saturate-[1.15]"
        >
          <source src="/videos/miniature-mustard-making.mp4" type="video/mp4" />
          <source src="/videos/Miniature_workers_making_mustard._1451d192.mp4" type="video/mp4" />
          <img
            src="/images/hero-mustard-tree.jpg"
            alt="Golden mustard fields in Rajasthan"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Soft directional gradient for text contrast on left, keeping video 100% visible on center & right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102B20]/80 via-[#102B20]/30 to-transparent z-10 pointer-events-none" />

        {/* Top/bottom soft framing transitions for navbar and metrics bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#102B20]/30 via-transparent to-[#102B20]/60 z-10 pointer-events-none" />
      </div>

      {/* Hero Content — Art-directed editorial layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24">
        <div className="max-w-xl lg:max-w-2xl space-y-5">
          {/* Subtle Heritage Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102B20]/75 backdrop-blur-sm border border-[#E5A000]/30 text-[#F5C542] text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5A000]" />
            <span>Alwar, Rajasthan • Direct Agro-Crushing Mill</span>
          </div>

          <h1 className="font-serif font-black text-[#FFF8E8] leading-[1.08] tracking-tight [font-size:clamp(2.4rem,4.8vw,4.4rem)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Pure Mustard Oil from{' '}
            <span className="text-[#F5C542]">Rajasthan's Golden Fields</span>
          </h1>

          <p className="text-[#FFF8E8]/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Cold-pressed Kachi Ghani mustard oil with authentic high pungency. Supplying wholesale stockists, food processors, and bulk distributors at factory-gate rates.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-xl bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>Explore Wholesale Packs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/quotation-request"
              className="px-6 py-3.5 rounded-xl bg-[#102B20]/80 hover:bg-[#102B20] text-[#FFF8E8] font-semibold text-sm transition-all border border-[#E5A000]/40 hover:border-[#F5C542]/70 backdrop-blur-sm cursor-pointer active:scale-95"
            >
              Request Proforma Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
