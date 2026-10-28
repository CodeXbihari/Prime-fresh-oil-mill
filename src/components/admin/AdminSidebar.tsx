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
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
      isActive
        ? 'bg-mustard-500 text-forest-950 shadow-md font-bold'
        : 'text-slate-300 hover:text-white hover:bg-forest-900'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-forest-950 text-white border-r border-forest-800 w-64">
      {/* Top Brand Header */}
      <div className="p-5 border-b border-forest-800/80">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <img
            src="/images/logo.jpg"
            alt="Prime Fresh Oil Mills"
            className="w-11 h-11 object-contain bg-white rounded-xl p-1 shadow shrink-0"
          />
          <div>
            <div className="font-serif font-bold text-base tracking-tight text-cream-50 leading-tight">
              PRIME FRESH
            </div>
            <div className="text-[10px] text-mustard-400 font-bold uppercase tracking-wider">
              Owner Works Console
            </div>
          </div>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold text-forest-400 uppercase tracking-wider">
          Mill Management
        </div>

        <NavLink to="/admin/dashboard" className={navClass} end onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink to="/admin/products" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4" />
            <span>Products & Stock</span>
          </div>
        </NavLink>

        <NavLink to="/admin/quotations" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4" />
            <span>Quotation Requests</span>
          </div>
          {pendingQuotesCount > 0 && (
            <span className="bg-amber-500 text-forest-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {pendingQuotesCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/orders" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4" />
            <span>Orders & Dispatches</span>
          </div>
          {activeOrdersCount > 0 && (
            <span className="bg-forest-800 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-semibold">
              {activeOrdersCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/distributors" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4" />
            <span>Distributor KYC</span>
          </div>
          {pendingDistributorsCount > 0 && (
            <span className="bg-mustard-400 text-forest-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {pendingDistributorsCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin/reports" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-4 h-4" />
            <span>Sales & Dispatch Reports</span>
          </div>
        </NavLink>

        <NavLink to="/admin/visitor-analytics" className={navClass} onClick={onCloseMobile}>
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-mustard-400" />
            <span>Visitor & Hot Leads</span>
          </div>
          {hotLeadsCount > 0 && (
            <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-white" />
              {hotLeadsCount}
            </span>
          )}
        </NavLink>

        <div className="pt-4 px-3 pb-2 text-[11px] font-bold text-forest-400 uppercase tracking-wider">
          External Navigation
        </div>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-forest-900 transition group"
        >
          <div className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4 text-mustard-400" />
            <span>View Trade Portal</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Admin User Footer Card */}
      <div className="p-4 border-t border-forest-800/80 bg-forest-900/60">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-mustard-400/20 text-mustard-300 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-cream-50 truncate">
              {user.adminName || 'Works General Manager'}
            </p>
            <p className="text-[10px] text-forest-300 truncate">
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

