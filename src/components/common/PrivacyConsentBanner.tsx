import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Info } from 'lucide-react';

export const PrivacyConsentBanner: React.FC = () => {
  const { hasGivenConsent, updatePrivacyConsent } = useApp();

  if (hasGivenConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in no-print">
      <div className="bg-forest-950/95 backdrop-blur-md border border-forest-800 text-cream-50 p-4 rounded-2xl shadow-2xl space-y-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-mustard-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-cream-50">
              Privacy &amp; Anonymous Trade Analytics
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">
              We capture privacy-preserving keyed IP hashes and visit frequency to tailor Rajasthan mandi wholesale rates and factory stock dispatches. No raw IP addresses or personal identities are shared.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-forest-800/80 text-[11px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-mustard-400" />
            90-day retention
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updatePrivacyConsent(false)}
              className="px-3 py-1 rounded-lg text-slate-300 hover:text-white transition text-xs"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => updatePrivacyConsent(true)}
              className="px-3.5 py-1.5 rounded-lg bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-xs transition shadow cursor-pointer active:scale-95"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

