import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  Truck,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Activity,
  Flame
} from 'lucide-react';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { quotations, distributors, visitors, user, logout } = useApp();

  const pendingQuotesCount = quotations.filter(q => q.status === 'Requested').length;
  const pendingDistributorsCount = distributors.filter(d => d.status === 'Pending').length;
  const activeOrdersCount = quotations.filter(q => ['Confirmed', 'Processing', 'Dispatched'].includes(q.status)).length;
  const hotLeadsCount = visitors.filter(v => v.leadCategory === 'Hot').length;

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-amber-500 text-slate-900 shadow-sm font-bold'
        : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      {/* Top Brand Header */}
      <div className="p-5 border-b border-slate-800">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Prime Fresh Oil Mills"
            className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow shrink-0"
          />
          <div className="min-w-0">
            <div className="font-serif font-bold text-sm tracking-tight text-white leading-tight truncate">
              PRIME FRESH
            </div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Owner Works Console
            </div>
          </div>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Mill Management
        </div>

        <NavLink to="/admin/dashboard" className={navClass} end onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink to="/admin/products" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 shrink-0" />
            <span>Products & Stock</span>
          </div>
        </NavLink>

        <NavLink to="/admin/quotations" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 shrink-0" />
            <span>Quotation Requests</span>
          </div>
          {pendingQuotesCount > 0 && (
            <span className="bg-amber-500 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
              {pendingQuotesCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/orders" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 shrink-0" />
            <span>Orders & Dispatches</span>
          </div>
          {activeOrdersCount > 0 && (
            <span className="bg-slate-700 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none">
              {activeOrdersCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/distributors" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 shrink-0" />
            <span>Distributor KYC</span>
          </div>
          {pendingDistributorsCount > 0 && (
            <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
              {pendingDistributorsCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/reports" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span>Sales & Dispatch Reports</span>
          </div>
        </NavLink>

        <NavLink to="/admin/visitor-analytics" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 shrink-0" />
            <span>Visitor & Hot Leads</span>
          </div>
          {hotLeadsCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 leading-none">
              <Flame className="w-2.5 h-2.5 fill-white" />
              {hotLeadsCount}
            </span>
          )}
        </NavLink>

        <div className="pt-4 px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          External Navigation
        </div>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition group"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
            <span>View Trade Portal</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Admin User Footer Card */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {user.adminName || 'Works General Manager'}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              Mill Master Admin
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-rose-300 hover:text-white hover:bg-rose-950/50 rounded-lg transition border border-rose-900/50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative z-10 w-72 h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
