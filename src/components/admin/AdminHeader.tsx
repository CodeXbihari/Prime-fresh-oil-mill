import React from 'react';
import { Menu, TrendingUp, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between gap-4">
        {/* Title and Mobile Menu Toggle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-lg sm:text-xl text-slate-900 tracking-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Live Market Mandi Ticker & Quick Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>
              Mandi Index: <strong>₹5,480/Qtl (Alwar Bench)</strong>
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Trade Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
