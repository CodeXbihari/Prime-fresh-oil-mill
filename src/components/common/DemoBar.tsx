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
    <div className="bg-[#091811] text-slate-300 text-[11px] py-1.5 px-3 sm:px-5 border-b border-[#183627] flex flex-wrap items-center justify-between gap-2.5 no-print z-50 w-full overflow-hidden">
      <div className="flex items-center gap-2 min-w-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
        <span className="font-semibold text-slate-200 tracking-wide uppercase text-[10px]">
          Demo Environment
        </span>
        <span className="text-slate-600 hidden md:inline">•</span>
        <span className="hidden md:inline text-slate-400">
          Client-side prototype with live-sync between Wholesaler Portal &amp; Works Admin
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Active Persona indicator */}
        <div className="flex items-center gap-1.5 bg-[#122A1E] px-2 py-0.5 rounded text-[11px] border border-[#1E4431] text-slate-300">
          {user.role === 'admin' ? (
            <>
              <ShieldCheck className="w-3 h-3 text-[#E5A000]" />
              <span>Role: <strong className="text-white font-medium">Works Admin</strong></span>
            </>
          ) : (
            <>
              <UserCheck className="w-3 h-3 text-emerald-400" />
              <span>Partner: <strong className="text-white font-medium">{user.distributorInfo?.companyName || 'Guest Wholesaler'}</strong></span>
            </>
          )}
        </div>

        {/* Portal Quick Switch Buttons */}
        {isAdminRoute ? (
          <button
            onClick={handleSwitchToTrade}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-[#E5A000] hover:bg-[#F5C542] text-[#102B20] font-bold text-[11px] rounded transition cursor-pointer"
          >
            <Store className="w-3 h-3" />
            <span>Trade Portal</span>
          </button>
        ) : (
          <button
            onClick={handleSwitchToAdmin}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-[#122A1E] hover:bg-[#1A3D2E] text-[#FFF8E8] font-semibold text-[11px] rounded border border-[#1E4431] transition cursor-pointer"
          >
            <LayoutDashboard className="w-3 h-3 text-[#E5A000]" />
            <span>Owner Admin</span>
          </button>
        )}

        <button
          onClick={handleReset}
          title="Reset to default mock data"
          className="flex items-center gap-1 text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-[#122A1E] transition cursor-pointer text-[10px]"
        >
          <RefreshCw className="w-2.5 h-2.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
