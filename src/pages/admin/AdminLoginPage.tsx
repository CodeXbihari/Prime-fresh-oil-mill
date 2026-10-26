import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, User, ArrowRight, Store, CheckCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAsAdmin } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('works.manager@primefresh.com');
  const [password, setPassword] = useState('••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  const handleQuickDemoAdmin = () => {
    loginAsAdmin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-forest-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-forest-900/40 via-forest-950 to-forest-950 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <img
            src="/images/logo.jpg"
            alt="Prime Fresh Oil Mills"
            className="w-20 h-20 object-contain bg-white rounded-2xl p-2 mx-auto shadow-xl shadow-mustard-500/20 mb-4 border border-forest-800"
          />
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-cream-50 tracking-tight">
            PRIME FRESH OIL MILLS
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 border border-forest-700 text-mustard-300 text-xs font-bold uppercase tracking-wider mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-mustard-400" />
            <span>Owner & Works Administration</span>
          </div>
        </div>

        <div className="mt-8 bg-forest-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-forest-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Admin Staff Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-700 bg-forest-950/70 text-xs text-cream-100 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Mill Access Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-700 bg-forest-950/70 text-xs text-cream-100 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-sm tracking-wide shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Authenticate Mill Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-forest-800 space-y-2">
            <span className="text-[11px] font-bold text-forest-400 uppercase tracking-wider block text-center">
              Evaluator One-Click Access
            </span>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="w-full py-2.5 px-4 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-50 font-bold text-xs border border-forest-600 transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-mustard-400" />
              <span>Login as Works GM (S. K. Singhal)</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Return to Wholesaler / Customer Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

