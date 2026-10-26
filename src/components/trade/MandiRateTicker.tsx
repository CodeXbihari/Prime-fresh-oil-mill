import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Download,
  Phone,
  Lock,
  X,
  Printer,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface MandiRateItem {
  commodity: string;
  grade: string;
  rate: string;
  unit: string;
  change: string;
  isUp: boolean;
  isNeutral?: boolean;
}

const MANDI_RATES: MandiRateItem[] = [
  {
    commodity: 'Peeli Sarson (Yellow Mustard Seed)',
    grade: 'Sortex Cleaned · >42% Oil Content',
    rate: '₹6,850',
    unit: 'Per Quintal (100kg)',
    change: '+₹45 (+0.66%)',
    isUp: true
  },
  {
    commodity: 'Kali Sarson / Bold Rai (Black Mustard)',
    grade: 'Aspirated · High Sinigrin Purity',
    rate: '₹6,420',
    unit: 'Per Quintal (100kg)',
    change: '-₹20 (-0.31%)',
    isUp: false
  },
  {
    commodity: 'Kachi Ghani Raw Mustard Oil (Loose Tanker)',
    grade: 'First-Press Cold Extract · FFA < 0.50%',
    rate: '₹142.50',
    unit: 'Per Kg (Ex-Mill Alwar)',
    change: '+₹1.20 (+0.85%)',
    isUp: true
  },
  {
    commodity: '15L Food-Grade Tin (Finished Pack)',
    grade: 'Prime Tinplate · Tamper-Proof Cap',
    rate: '₹2,180',
    unit: 'Per Tin (13.65kg Net)',
    change: 'Stable (0.0%)',
    isUp: false,
    isNeutral: true
  },
  {
    commodity: 'Mustard De-Oiled Cake (DOC / Khali)',
    grade: 'High Protein (36-38%) · Cattle Feed Grade',
    rate: '₹2,850',
    unit: 'Per Quintal (Bags)',
    change: '+₹15 (+0.53%)',
    isUp: true
  }
];

export const MandiRateTicker: React.FC = () => {
  const navigate = useNavigate();
  const [showRateCardModal, setShowRateCardModal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const todayDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handleShareWhatsApp = () => {
    const text = `*Prime Fresh Oil Mills - Official Mandi Gate Rate Card (${todayDate})*\n` +
      `📍 Alwar-Bharatpur Mustard Hub, Rajasthan\n\n` +
      MANDI_RATES.map(r => `• ${r.commodity}: *${r.rate}* ${r.unit} (${r.change})`).join('\n') +
      `\n\nDirect Mill Trade Desk: +91 98290 55441\nLock rates & order: https://primefreshoil.com`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <section className="bg-forest-950 text-cream-50 border-b border-forest-800">
        {/* Top Header Strip with Time and Market Status */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-forest-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-mustard-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Mandi Crushing Desk
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-mustard-500" />
                <span>Alwar APMC Mandi, Rajasthan</span>
              </div>
              <span className="text-slate-400 text-xs hidden md:inline">|</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Updated Today, {todayDate} (08:30 AM IST)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowRateCardModal(true)}
                className="px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-100 text-xs font-semibold flex items-center gap-1.5 transition border border-forest-700"
              >
                <Download className="w-3.5 h-3.5 text-mustard-400" />
                <span>Rate Card PDF</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Daily Alerts on</span>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Rates Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {MANDI_RATES.map((item, idx) => (
              <div
                key={idx}
                className="bg-forest-900/70 hover:bg-forest-900 border border-forest-800 rounded-xl p-3.5 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold text-slate-300 leading-snug line-clamp-1 group-hover:text-cream-50">
                      {item.commodity}
                    </span>
                    {item.isNeutral ? (
                      <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded bg-forest-800 shrink-0">
                        =
                      </span>
                    ) : item.isUp ? (
                      <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-0.5 shrink-0">
                        <TrendingUp className="w-2.5 h-2.5" />
                        {item.change.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/60 flex items-center gap-0.5 shrink-0">
                        <TrendingDown className="w-2.5 h-2.5" />
                        {item.change.split(' ')[0]}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mb-2">
                    {item.grade}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-black text-xl text-mustard-300 tracking-tight">
                      {item.rate}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium truncate">
                      {item.unit}
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-forest-800/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Ex-Mill Gate</span>
                    <button
                      type="button"
                      onClick={() => navigate('/quotation-request')}
                      className="text-mustard-400 hover:text-mustard-300 font-bold flex items-center gap-0.5"
                    >
                      <Lock className="w-2.5 h-2.5" />
                      <span>Lock Rate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-forest-800/50">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-forest-800 text-[10px] font-bold text-mustard-400">
                MARKET NOTE
              </span>
              <p className="text-[11px] text-slate-300">
                Arrivals steady at 12,000 bags today in Alwar-Bharatpur belt. Spot crusher buying active. Rates subject to daily mandi closing.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-[11px]">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No Hidden Brokerage
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Computerized Tare Slips</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Daily Rate Card Printable Modal */}
      {showRateCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white text-forest-950 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-cream-300">
            {/* Modal Top Bar */}
            <div className="sticky top-0 bg-forest-950 text-cream-50 p-4 sm:p-5 flex items-center justify-between rounded-t-2xl border-b border-forest-800">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="Prime Fresh Logo"
                  className="w-10 h-10 object-contain rounded-lg bg-white p-0.5"
                />
                <div>
                  <h3 className="font-serif font-black text-lg text-cream-50 leading-tight">
                    Prime Fresh Oil Mills
                  </h3>
                  <p className="text-xs text-mustard-300 font-medium">
                    Official Mill Gate Rate Bulletin · {todayDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Print Rate Card"
                >
                  <Printer className="w-3.5 h-3.5 text-mustard-400" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowRateCardModal(false)}
                  className="p-1.5 rounded-lg hover:bg-forest-800 text-slate-300 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Printable Rate Sheet */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Mill Details Header */}
              <div className="border-b border-cream-200 pb-4 flex flex-col sm:flex-row justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-forest-900 block text-sm">Crushing Works & Central Godown:</span>
                  <p className="text-slate-600">Old Industrial Area, Alwar-Bharatpur Highway, Rajasthan - 301001</p>
                  <p className="text-slate-600">FSSAI Central Lic No: 10019013002241 | GSTIN: 08AAECP4921C1Z4</p>
                </div>
                <div className="sm:text-right">
                  <span className="font-bold text-forest-900 block">Trading Desk:</span>
                  <p className="text-slate-600">+91 98290 55441 / trade@primefreshoil.com</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Valid for Orders Placed Today
                  </span>
                </div>
              </div>

              {/* Rate Table */}
              <div>
                <h4 className="font-serif font-bold text-base text-forest-950 mb-3">
                  Today's Base Commodity Rates (Ex-Mill Alwar, Excl. GST)
                </h4>
                <div className="overflow-x-auto border border-cream-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-cream-100/70 text-forest-900 font-bold uppercase text-[10px] tracking-wider border-b border-cream-200">
                      <tr>
                        <th className="py-2.5 px-3">Commodity / SKU</th>
                        <th className="py-2.5 px-3">Quality Standard</th>
                        <th className="py-2.5 px-3 text-right">Mill Rate</th>
                        <th className="py-2.5 px-3 text-right">GST Rate</th>
                        <th className="py-2.5 px-3 text-right">Day Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 text-slate-700">
                      {MANDI_RATES.map((r, i) => (
                        <tr key={i} className="hover:bg-cream-50/50">
                          <td className="py-3 px-3 font-semibold text-forest-950">{r.commodity}</td>
                          <td className="py-3 px-3 text-[11px] text-slate-500">{r.grade}</td>
                          <td className="py-3 px-3 text-right font-bold text-forest-950 text-sm">
                            {r.rate}
                            <span className="block text-[10px] font-normal text-slate-500">{r.unit}</span>
                          </td>
                          <td className="py-3 px-3 text-right font-medium">
                            {r.commodity.includes('Seed') ? '0% (Exempt)' : '5% (Edible Oil)'}
                          </td>
                          <td className="py-3 px-3 text-right font-semibold">
                            <span className={r.isUp ? 'text-emerald-700' : r.isNeutral ? 'text-slate-500' : 'text-rose-700'}>
                              {r.change}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Terms of Wholesale Trade */}
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 text-xs space-y-1.5 text-slate-600">
                <h5 className="font-bold text-forest-900 uppercase text-[11px] tracking-wider">
                  Dispatch & Commercial Terms:
                </h5>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>All oil rates quoted above are for prime food-grade delivery with computerized weighbridge slips.</li>
                  <li>Transit insurance and road e-way bill issued upon dispatch.</li>
                  <li>Minimum order quantity for bulk tankers: 20 MT. Minimum order for packaged tins: 40 tins.</li>
                  <li>Rate protection for 48 hours is granted once an official proforma invoice is generated.</li>
                </ul>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleShareWhatsApp();
                    setCopiedToast(true);
                    setTimeout(() => setCopiedToast(false), 3000);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{copiedToast ? 'Opening WhatsApp...' : 'Share Rate Card via WhatsApp'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRateCardModal(false);
                      navigate('/quotation-request');
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition"
                  >
                    Lock-In Today's Rate
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRateCardModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

