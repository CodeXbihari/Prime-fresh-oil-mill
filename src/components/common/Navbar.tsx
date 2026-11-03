import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  FileSpreadsheet,
  Menu,
  X,
  User,
  Shield,
  ChevronDown,
  LogOut,
  HelpCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { cartCount, cartSubtotal, user, logout, loginAsDistributor } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-semibold text-[13px] tracking-wide transition-all px-3 py-1.5 rounded-lg whitespace-nowrap ${
      isActive
        ? 'text-[#102B20] bg-white/80 shadow-xs border border-white/70 font-bold'
        : 'text-slate-600 hover:text-[#102B20] hover:bg-white/50'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Main Navbar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 w-full box-border">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="p-1 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs">
              <img
                src="/images/logo.jpg"
                alt="Prime Fresh Oil Mills"
                className="h-10 w-auto object-contain rounded-lg"
              />
            </div>
            <div className="leading-tight">
              <div className="font-serif font-extrabold text-[17px] tracking-tight text-[#102B20] whitespace-nowrap flex items-baseline gap-1.5">
                PRIME FRESH
                <span className="font-sans font-bold text-[11px] text-[#C49A32] tracking-wider">
                  OIL MILLS
                </span>
              </div>
              <p className="text-[10.5px] font-medium text-slate-400 tracking-wide whitespace-nowrap">
                Pure Kachi Ghani · Alwar, Rajasthan
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center p-1 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 max-w-md mx-auto">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
            <NavLink to="/quotation-request" className={navLinkClass}>
              Quotation
            </NavLink>
            <NavLink to="/portal/my-orders" className={navLinkClass}>
              My Orders
            </NavLink>
            <NavLink to="/portal/register" className={navLinkClass}>
              Onboarding
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Bulk Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/60 hover:bg-white/90 backdrop-blur-md text-[#102B20] font-semibold text-sm transition-all border border-white/80 hover:border-[#C49A32]/40 shadow-xs"
              title="Bulk Order Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-[#C49A32]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E5A000] text-[#102B20] text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold block">Bulk Cart</span>
                <span className="font-bold text-[#102B20] text-xs">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </Link>

            {/* User Session Profile Button */}
            {user.isLoggedIn && user.role === 'distributor' ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  title={user.distributorInfo?.companyName || 'My Business'}
                  className="flex items-center gap-1.5 p-1 pr-2.5 rounded-xl bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 text-[#102B20] transition cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-lg bg-[#102B20] text-[#FFF8E8] flex items-center justify-center text-[11px] font-black tracking-tight shrink-0 uppercase shadow-xs">
                    {(user.distributorInfo?.companyName || 'MB')
                      .split(' ')
                      .slice(0, 2)
                      .map((w: string) => w[0])
                      .join('')}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/80 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100/80">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Wholesale Partner</p>
                      <p className="text-sm font-bold text-[#102B20] mt-0.5 truncate">
                        {user.distributorInfo?.companyName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        GST: {user.distributorInfo?.gstin || 'GST Pending'}
                      </p>
                    </div>

                    <Link
                      to="/portal/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-white/70 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Business Profile &amp; Addresses</span>
                    </Link>

                    <Link
                      to="/portal/my-orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-white/70 transition"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                      <span>My Quotations &amp; Dispatches</span>
                    </Link>

                    <div className="border-t border-slate-100/80 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50/80 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/portal/login"
                  className="px-3.5 py-1.5 rounded-lg text-slate-700 hover:text-[#102B20] text-xs font-semibold hover:bg-white/60 transition whitespace-nowrap"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => loginAsDistributor()}
                  className="px-3.5 py-1.5 rounded-lg bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] text-xs font-semibold shadow-xs transition whitespace-nowrap cursor-pointer"
                >
                  Demo Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger & Cart */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-white/60 backdrop-blur-md border border-white/80 text-[#102B20] transition"
            >
              <ShoppingCart className="w-5 h-5 text-[#C49A32]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E5A000] text-[#102B20] text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-white/60 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/60 bg-white/85 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1.5">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              Wholesale Products &amp; Pack Sizes
            </NavLink>
            <NavLink
              to="/quotation-request"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              Request Custom Quotation
            </NavLink>
            <NavLink
              to="/portal/my-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              My Orders &amp; Quotations
            </NavLink>
            <NavLink
              to="/portal/register"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              Distributor Registration Form
            </NavLink>
            <NavLink
              to="/portal/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-white/70"
            >
              Business Profile &amp; Addresses
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-trade-chatbot'));
              }}
              className="px-3 py-2.5 rounded-lg text-[#102B20] font-semibold bg-white/60 backdrop-blur-md border border-white/80 flex items-center justify-between text-xs transition"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C49A32]" />
                <span>Trade &amp; Order Inquiries Help</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Quick Answers</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-white/60 flex flex-col gap-2">
            {user.isLoggedIn ? (
              <div className="flex items-center justify-between bg-white/70 p-3 rounded-xl border border-white/80">
                <span className="text-xs font-bold text-[#102B20] truncate max-w-[200px]">
                  {user.distributorInfo?.companyName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-600 font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/portal/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-3 border border-white/80 bg-white/60 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => {
                    loginAsDistributor();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 bg-[#102B20] text-[#FFF8E8] rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Demo Login
                </button>
              </div>
            )}
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 px-3 bg-white/60 hover:bg-white/90 text-[#102B20] border border-white/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#C49A32]" />
              Owner &amp; Works Admin Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
