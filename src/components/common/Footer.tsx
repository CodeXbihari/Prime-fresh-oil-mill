import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-forest-800 pt-16 pb-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Mill Profile */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="Prime Fresh Oil Mills"
                className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow shrink-0"
              />
              <div>
                <span className="font-serif font-bold text-lg text-cream-50 block leading-tight">
                  PRIME FRESH
                </span>
                <span className="text-xs text-mustard-400 font-semibold tracking-wider uppercase">
                  Oil Mills & Agro Products
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Primary agro-crushing mill producing authentic cold-pressed Kachi Ghani mustard oil, commercial expeller cooking oil, and high-protein cattle feed khali. Supplying state super-stockists, bulk food manufacturers, and mandi wholesalers across India.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-mustard-400 shrink-0 mt-0.5" />
                <span>Mill Facility: Plot 18-22, Industrial Agro Corridor, Matsya Industrial Area, Alwar, Rajasthan - 301030</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-mustard-400 shrink-0" />
                <span>Trade Desk: +91 90572 92529</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-mustard-400 shrink-0" />
                <span>Wholesale Desk: Puneet2garg@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Wholesale Packs */}
          <div>
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase mb-4 pb-2 border-b border-forest-800 text-mustard-300">
              Wholesale Packaging
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  15 Litre Food-Grade Tin (Commercial)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  15 Kg Heavy Commercial Halwai Pack
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  5 Litre Pet Jar (Box of 4 Jars)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  1 Litre FMCG Pet Bottle (Box of 16)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  500 ml Household SKU (Box of 30)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  200 Litre Industrial Steel Barrels
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mustard-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-mustard-400"></span>
                  Bulk Road Tankers (20-30 MT Liquid Bulk)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links for Wholesalers */}
          <div>
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase mb-4 pb-2 border-b border-forest-800 text-mustard-300">
              Distributor Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/portal/register" className="hover:text-mustard-400 transition">
                  Apply for Dealership / Super-Stockist
                </Link>
              </li>
              <li>
                <Link to="/quotation-request" className="hover:text-mustard-400 transition">
                  Request Official Proforma Quotation
                </Link>
              </li>
              <li>
                <Link to="/portal/my-orders" className="hover:text-mustard-400 transition">
                  Check Consignment Status & LR Number
                </Link>
              </li>
              <li>
                <Link to="/portal/profile" className="hover:text-mustard-400 transition">
                  Update Business Address & GSTIN
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-mustard-400 transition">
                  Bulk Order Cart & Quantity Selector
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-mustard-300 hover:text-white font-semibold transition"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Owner & Works Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Compliance */}
          <div>
            <h4 className="font-serif font-bold text-sm text-cream-50 tracking-wide uppercase mb-4 pb-2 border-b border-forest-800 text-mustard-300">
              Quality & Traceability
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2 bg-forest-900/60 p-2.5 rounded-lg border border-forest-800">
                <CheckCircle2 className="w-4 h-4 text-mustard-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Standard Quality Parameters</strong>
                  <span>Every batch tested for Acid Value (&lt;1.5 mg KOH/g), moisture (&lt;0.25%) and natural pungency AITC index.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-forest-900/60 p-2.5 rounded-lg border border-forest-800">
                <CheckCircle2 className="w-4 h-4 text-mustard-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Tamper-Proof Mill Packaging</strong>
                  <span>Heavy-gauge sealed tins and induction-sealed PET bottles to prevent transit pilferage.</span>
                </div>
              </div>

              <div className="p-2.5 bg-forest-900/40 rounded-lg text-[11px] text-slate-400 border border-forest-800/80">
                GSTIN: 08AAAFP8901L1ZG | CIN: U15142RJ2018PTC061294
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Volatility Advisory Strip */}
        <div className="p-4 rounded-xl bg-forest-900/50 border border-forest-800/90 text-xs text-slate-400 mb-8 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            B2B Mandi Pricing & Dispatch Terms Advisory:
          </p>
          <p>
            Mustard seed crushing rates are subject to daily agri-commodity market fluctuations. All quotations generated on this portal reflect indicative factory gate prices valid for 48 hours unless confirmed with earnest advance RTGS deposit. Freight charges are calculated based on transporter lorry receipt (LR) terms or ex-mill factory gate collection.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-6 border-t border-forest-800/80 gap-3">
          <p>© {new Date().getFullYear()} Prime Fresh Oil Mills. All Rights Reserved.</p>
          <p className="text-slate-400">
            Engineered for Wholesalers, Distributors & Edible Oil Stockists across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

