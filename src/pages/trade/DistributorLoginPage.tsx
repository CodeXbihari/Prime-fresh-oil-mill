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
    <div className="min-h-screen bg-cream-50/60 py-16 px-4 flex items-center justify-center">
      <SEOHead
        title="Wholesaler & Distributor Account Login"
        description="Secure sign-in for registered mustard oil distributors, wholesalers, and institutional buyers of Prime Fresh Oil Mills."
        canonicalPath="/portal/login"
        noIndex={true}
      />
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <img
            src="/images/logo.jpg"
            alt="Prime Fresh Oil Mills"
            className="w-20 h-20 object-contain bg-white rounded-2xl p-2 mx-auto shadow-lg mb-4 border border-cream-200"
          />
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
            Distributor Trade Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to check proforma quotations, truck loading, and Lorry Receipts.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-xl space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Account Password / OTP</label>
                <a href="#otp" onClick={(e) => { e.preventDefault(); alert('Demo OTP: 5842'); }} className="text-[11px] text-mustard-700 hover:underline">
                  Use OTP Instead
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Sign In to Distributor Console</span>
              <ArrowRight className="w-4 h-4 text-mustard-400" />
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-4 border-t border-cream-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Quick Prototype Switcher
            </span>
            <div className="space-y-1.5">
              {distributors.slice(0, 3).map(dist => (
                <button
                  key={dist.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(dist.id)}
                  className="w-full text-left p-2.5 rounded-xl bg-cream-50 hover:bg-cream-100 border border-cream-200 text-xs flex items-center justify-between group transition"
                >
                  <div className="overflow-hidden">
                    <strong className="text-forest-950 block truncate">{dist.companyName}</strong>
                    <span className="text-[10px] text-slate-500 truncate block">
                      {dist.city}, {dist.state} • {dist.assignedTier || 'Wholesaler'}
                    </span>
                  </div>
                  <UserCheck className="w-4 h-4 text-forest-700 group-hover:text-mustard-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 space-y-2">
          <div>
            New to Prime Fresh Oil Mills?{' '}
            <Link to="/portal/register" className="font-bold text-forest-950 hover:text-mustard-700 underline">
              Apply for Dealership
            </Link>
          </div>
          <div>
            Mill Staff & Works Manager?{' '}
            <Link to="/admin/login" className="font-bold text-mustard-700 hover:underline">
              Owner Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
