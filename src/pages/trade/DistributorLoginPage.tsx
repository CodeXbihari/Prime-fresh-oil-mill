import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SEOHead } from '../../components/common/SEOHead';
import { ArrowRight, UserCheck } from 'lucide-react';

export const DistributorLoginPage: React.FC = () => {
  const { loginAsDistributor, distributors } = useApp();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('rajesh@balajiagrotraders.in');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError('Please provide your registered mobile number or business email.');
      return;
    }
    // Match against distributors or login default
    const found = distributors.find(
      d => d.email.toLowerCase() === identifier.toLowerCase() || d.phone.includes(identifier)
    );
    loginAsDistributor(found?.id);
    navigate('/portal/my-orders');
  };

  const handleQuickDemoSelect = (distId: string) => {
    loginAsDistributor(distId);
    navigate('/portal/my-orders');
  };

  return (
    <div className="min-h-screen ambient-glass-canvas py-16 px-4 flex items-center justify-center relative">
      <SEOHead
        title="Wholesaler & Distributor Account Login"
        description="Secure sign-in for registered mustard oil distributors, wholesalers, and institutional buyers of Prime Fresh Oil Mills."
        canonicalPath="/portal/login"
        noIndex={true}
      />
      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center">
          <img
            src="/images/logo.jpg"
            alt="Prime Fresh Oil Mills"
            className="w-20 h-20 object-contain bg-white rounded-2xl p-2 mx-auto shadow-lg mb-4 border border-white/80"
          />
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#102B20]">
            Distributor Trade Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to check proforma quotations, truck loading, and Lorry Receipts.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50/90 text-rose-700 text-xs border border-rose-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Mobile or Email
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder="e.g. +91 98390 12345 or email"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Account Password / OTP</label>
                <a href="#otp" onClick={(e) => { e.preventDefault(); alert('Demo OTP: 5842'); }} className="text-[11px] text-[#C49A32] font-semibold hover:underline">
                  Use OTP Instead
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>Sign In to Distributor Console</span>
              <ArrowRight className="w-4 h-4 text-[#E5A000]" />
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-4 border-t border-slate-200/60 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Quick Prototype Switcher
            </span>
            <div className="space-y-1.5">
              {distributors.slice(0, 3).map(dist => (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(dist.id)}
                  className="w-full text-left p-2.5 rounded-xl bg-white/60 hover:bg-white/95 border border-white/80 text-xs flex items-center justify-between group transition cursor-pointer shadow-xs"
                >
                  <div className="overflow-hidden">
                    <strong className="text-[#102B20] block truncate">{dist.companyName}</strong>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {dist.city}, {dist.state} • {dist.assignedTier || 'Wholesaler'}
                    </span>
                  </div>
                  <UserCheck className="w-4 h-4 text-[#102B20] group-hover:text-[#C49A32] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 space-y-2">
          <div>
            New to Prime Fresh Oil Mills?{' '}
            <Link to="/portal/register" className="font-bold text-[#102B20] hover:text-[#C49A32] underline">
              Apply for Dealership
            </Link>
          </div>
          <div>
            Mill Staff &amp; Works Manager?{' '}
            <Link to="/admin/login" className="font-bold text-[#C49A32] hover:underline">
              Owner Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
