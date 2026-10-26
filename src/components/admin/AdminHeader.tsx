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
    <header className="bg-white border-b border-cream-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title and Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-cream-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-forest-950 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Live Market Mandi Ticker & Quick Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>
              Mandi Index: <strong>₹5,480/Qtl (Alwar Bench)</strong>
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-semibold shadow transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Open Trade Portal</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

