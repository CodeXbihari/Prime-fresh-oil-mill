import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF6EE]/95 backdrop-blur-2xl text-[#4A3E2D] border-t border-[#EAE2D2] pt-16 pb-8 no-print relative shadow-[0_-4px_24px_rgba(73,53,31,0.02)]">
      {/* Ambient background light orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C49A32]/8 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D9AE45]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Mill Profile */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Prime Fresh Oil Mills"
                className="w-11 h-11 object-contain bg-white rounded-xl p-1 shadow-xs shrink-0 border border-white/80"
              />
              <div>
                <span className="font-serif font-bold text-base text-[#2D2418] block leading-tight">
                  PRIME FRESH
                </span>
                <span className="text-[11px] text-[#C49A32] font-bold tracking-wider uppercase">
                  Oil Mills &amp; Agro Products
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Primary agro-crushing mill producing authentic cold-pressed Kachi Ghani mustard oil, commercial expeller cooking oil, and high-protein cattle feed khali. Supplying state super-stockists, bulk food manufacturers, and mandi wholesalers across India.
            </p>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                <span>Plot 18-22, Industrial Agro Corridor, Matsya Industrial Area, Alwar, Rajasthan - 301030</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>Trade Desk: <strong className="text-[#2D2418]">+91 90572 92529</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>Wholesale Desk: Puneet2garg@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Wholesale Packs */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-wide uppercase mb-4 pb-2 border-b border-[#EAE2D2] text-[#C49A32]">
              Wholesale Packaging
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  15 Litre Food-Grade Tin (Commercial)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  15 Kg Heavy Commercial Halwai Pack
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  5 Litre Pet Jar (Box of 4 Jars)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  1 Litre FMCG Pet Bottle (Box of 16)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  500 ml Household SKU (Box of 30)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  200 Litre Industrial Steel Barrels
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#C49A32] transition flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                  Bulk Road Tankers (20-30 MT Liquid Bulk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links for Wholesalers */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-wide uppercase mb-4 pb-2 border-b border-[#EAE2D2] text-[#C49A32]">
              Distributor Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link to="/portal/register" className="hover:text-[#C49A32] transition">
                  Apply for Dealership / Super-Stockist
                </Link>
              </li>
              <li>
                <Link to="/quotation-request" className="hover:text-[#C49A32] transition">
                  Request Official Proforma Quotation
                </Link>
              </li>
              <li>
                <Link to="/portal/my-orders" className="hover:text-[#C49A32] transition">
                  Check Consignment Status &amp; LR Number
                </Link>
              </li>
              <li>
                <Link to="/portal/profile" className="hover:text-[#C49A32] transition">
                  Update Business Address &amp; GSTIN
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#C49A32] transition">
                  Bulk Order Cart &amp; Quantity Selector
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-[#C49A32] hover:text-[#99731C] font-semibold transition"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Owner &amp; Works Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Compliance */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-wide uppercase mb-4 pb-2 border-b border-[#EAE2D2] text-[#C49A32]">
              Quality &amp; Traceability
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2418] block font-medium">Standard Quality Parameters</strong>
                  <span className="text-[11px] text-slate-500">Every batch tested for Acid Value (&lt;1.5 mg KOH/g), moisture (&lt;0.25%) and natural pungency AITC index.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2D2418] block font-medium">Tamper-Proof Mill Packaging</strong>
                  <span className="text-[11px] text-slate-500">Heavy-gauge sealed tins and induction-sealed PET bottles to prevent transit pilferage.</span>
                </div>
              </div>

              <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl text-[11px] text-slate-500 border border-white/80">
                GSTIN: 08AAAFP8901L1ZG | CIN: U15142RJ2018PTC061294
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Volatility Advisory Strip */}
        <div className="p-4 rounded-2xl bg-[#F4EEE1]/80 backdrop-blur-md border border-[#E5DDCB] text-xs text-slate-600 mb-8 leading-relaxed">
          <p className="font-semibold text-[#2D2418] mb-1">
            B2B Mandi Pricing &amp; Dispatch Terms Advisory:
          </p>
          <p className="text-[11px] text-slate-500">
            Mustard seed crushing rates are subject to daily agri-commodity market fluctuations. All quotations generated on this portal reflect indicative factory gate prices valid for 48 hours unless confirmed with earnest advance RTGS deposit. Freight charges are calculated based on transporter lorry receipt (LR) terms or ex-mill factory gate collection.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-6 border-t border-[#EAE2D2] gap-3">
          <p>© {new Date().getFullYear()} Prime Fresh Oil Mills. All Rights Reserved.</p>
          <p className="text-slate-500">
            Engineered for Wholesalers, Distributors &amp; Edible Oil Stockists across India.
          </p>
        </div>
      </div>
    </footer>
  );
};
