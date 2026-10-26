import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, RefreshCw, LayoutDashboard, Store } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { user, loginAsDistributor, loginAsAdmin, resetAllData } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleSwitchToAdmin = () => {
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  const handleSwitchToTrade = () => {
    loginAsDistributor();
    navigate('/');
  };

  const handleReset = () => {
    if (window.confirm('Reset all mock orders, quotes and products to default factory samples?')) {
      resetAllData();
      alert('Mock prototype data reset successfully.');
    }
  };

  return (
    <div className="bg-forest-950 text-cream-100 text-xs py-2 px-3 sm:px-4 border-b border-forest-800 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shadow-md no-print z-50 w-full overflow-hidden box-border">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-wrap">
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mustard-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-mustard-400"></span>
        </span>
        <span className="font-bold tracking-wide uppercase text-mustard-300 break-words text-[11px] sm:text-xs">
          Prime Fresh Oil Mills Demo Mode
        </span>
        <span className="hidden md:inline text-forest-300">|</span>
        <span className="hidden md:inline text-slate-300">
          Client-side prototype with instant live-sync between Wholesaler & Owner interfaces
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Active Persona indicator */}
        <div className="flex items-center gap-1.5 bg-forest-900/80 px-2.5 py-1 rounded-md border border-forest-700 text-slate-200">
          {user.role === 'admin' ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-mustard-400" />
              <span>Role: <strong className="text-white">Mill Works Admin</strong></span>
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Distributor: <strong className="text-white">{user.distributorInfo?.companyName || 'Guest Wholesaler'}</strong></span>
            </>
          )}
        </div>

        {/* Portal Quick Switch Buttons */}
        {isAdminRoute ? (
          <button
            onClick={handleSwitchToTrade}
            className="flex items-center gap-1.5 px-3 py-1 bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-semibold rounded transition shadow-sm"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Open Trade Portal</span>
          </button>
        ) : (
          <button
            onClick={handleSwitchToAdmin}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-forest-950 font-semibold rounded transition shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Open Owner Admin</span>
          </button>
        )}

        <button
          onClick={handleReset}
          title="Reset to default mock data"
          className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-forest-800 transition"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Mock Data</span>
        </button>
      </div>
    </div>
  );
};

