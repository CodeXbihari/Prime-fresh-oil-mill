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
  Bot
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
    `font-semibold text-[13px] tracking-wide transition-colors px-3 py-1.5 rounded-lg whitespace-nowrap ${
      isActive
        ? 'text-forest-900 bg-forest-50 border-b-2 border-mustard-500'
        : 'text-slate-600 hover:text-forest-900 hover:bg-cream-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-cream-200 shadow-sm">
      {/* Main Navbar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 w-full box-border">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* Brand Logo — never truncates */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/logo.jpg"
              alt="Prime Fresh Oil Mills"
              className="h-12 w-auto object-contain rounded-xl group-hover:scale-105 transition-transform"
            />
            <div className="leading-tight">
              <div className="font-serif font-extrabold text-[17px] tracking-tight text-forest-950 whitespace-nowrap flex items-baseline gap-1.5">
                PRIME FRESH
                <span className="font-sans font-bold text-[11px] text-mustard-700 tracking-widest">
                  OIL MILLS
                </span>
              </div>
              <p className="text-[10.5px] font-medium text-slate-400 tracking-wide whitespace-nowrap">
                Pure Kachi Ghani · Wholesale Supply
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
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
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-forest-950 font-semibold text-sm transition border border-amber-200"
              title="Bulk Order Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-amber-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mustard-500 text-forest-950 text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] text-amber-700 uppercase tracking-wider font-bold block">Bulk Cart</span>
                <span className="font-bold text-forest-950 text-[13px]">
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
                  className="flex items-center gap-1.5 p-1 pr-2.5 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-200 text-forest-950 transition"
                >
                  {/* Avatar circle with initials */}
                  <span className="w-8 h-8 rounded-lg bg-forest-800 text-cream-50 flex items-center justify-center text-[11px] font-black tracking-tight shrink-0 uppercase">
                    {(user.distributorInfo?.companyName || 'MB')
                      .split(' ')
                      .slice(0, 2)
                      .map((w: string) => w[0])
                      .join('')}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-cream-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-cream-100">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Wholesale Partner</p>
                      <p className="text-sm font-bold text-forest-950 mt-0.5">
                        {user.distributorInfo?.companyName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        GST: {user.distributorInfo?.gstin || 'GST Pending'}
                      </p>
                    </div>

                    <Link
                      to="/portal/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-cream-100 transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Business Profile & Addresses</span>
                    </Link>

                    <Link
                      to="/portal/my-orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-cream-100 transition"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                      <span>My Quotations & Dispatches</span>
                    </Link>

                    <div className="border-t border-cream-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition"
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
                  className="px-4 py-2 rounded-xl text-forest-900 hover:text-forest-950 text-[13px] font-semibold hover:bg-cream-100 transition whitespace-nowrap"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => loginAsDistributor()}
                  className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 text-[13px] font-semibold shadow transition whitespace-nowrap"
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
              className="relative p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-900 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mustard-500 text-forest-950 text-[10px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-cream-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              Wholesale Products & Pack Sizes
            </NavLink>
            <NavLink
              to="/quotation-request"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              Request Custom Quotation
            </NavLink>
            <NavLink
              to="/portal/my-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              My Orders & Quotations
            </NavLink>
            <NavLink
              to="/portal/register"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              Distributor Registration Form
            </NavLink>
            <NavLink
              to="/portal/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-cream-100"
            >
              Business Profile & Addresses
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-trade-chatbot'));
              }}
              className="px-3 py-2.5 rounded-xl text-forest-950 font-bold bg-mustard-100 hover:bg-mustard-200 border border-mustard-300 flex items-center justify-between text-sm transition"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-forest-900" />
                <span>Ask AI Order Assistant</span>
              </div>
              <span className="text-[10px] bg-mustard-500 text-forest-950 font-black px-1.5 py-0.5 rounded">24/7</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-cream-200 flex flex-col gap-2">
            {user.isLoggedIn ? (
              <div className="flex items-center justify-between bg-cream-50 p-3 rounded-lg border border-cream-200">
                <span className="text-xs font-bold text-forest-950 truncate max-w-[200px]">
                  {user.distributorInfo?.companyName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/portal/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-3 border border-forest-800 text-forest-900 rounded-lg text-sm font-semibold"
                >
                  Sign In
                </Link>
                <button
                  onClick={() => {
                    loginAsDistributor();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 px-3 bg-forest-900 text-cream-50 rounded-lg text-sm font-semibold"
                >
                  Demo Login
                </button>
              </div>
            )}
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 px-3 bg-amber-500 hover:bg-amber-600 text-forest-950 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              Owner Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

