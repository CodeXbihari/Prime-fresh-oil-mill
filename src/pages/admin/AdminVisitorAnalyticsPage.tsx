import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadCategory, VisitorProfile } from '../../types';
import {
  Users,
  Flame,
  TrendingUp,
  Clock,
  Eye,
  Filter,
  CheckCircle2,
  Building2,
  Search,
  X,
  Shield,
  Activity
} from 'lucide-react';

export const AdminVisitorAnalyticsPage: React.FC = () => {
  const { visitors, associateVisitorWithCustomer } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | LeadCategory>('All');
  const [associationFilter, setAssociationFilter] = useState<'All' | 'Identified' | 'Anonymous'>('All');
  const [dateRangeFilter, setDateRangeFilter] = useState<'all' | '7d' | '30d'>('all');
  const [minVisits, setMinVisits] = useState<number>(1);

  // Selected Visitor for Detailed Chronological Modal
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorProfile | null>(null);

  // Manual Association Form State
  const [manualAssocOpen, setManualAssocOpen] = useState(false);
  const [manualCompany, setManualCompany] = useState('');
  const [manualPerson, setManualPerson] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualGstin, setManualGstin] = useState('');

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = visitors.length;
    const hotLeads = visitors.filter(v => v.leadCategory === 'Hot').length;
    const warmLeads = visitors.filter(v => v.leadCategory === 'Warm').length;
    const coldLeads = visitors.filter(v => v.leadCategory === 'Cold').length;
    const identified = visitors.filter(v => !!v.associatedCustomer).length;
    const avgScore = total > 0 ? Math.round(visitors.reduce((acc, v) => acc + v.leadScore, 0) / total) : 0;

    return { total, hotLeads, warmLeads, coldLeads, identified, avgScore };
  }, [visitors]);

  // Filtered List
  const filteredVisitors = useMemo(() => {
    return visitors.filter(v => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchSearch =
        v.maskedIp.toLowerCase().includes(searchLower) ||
        v.visitorHash.toLowerCase().includes(searchLower) ||
        (v.associatedCustomer?.companyName.toLowerCase().includes(searchLower) ?? false) ||
        (v.associatedCustomer?.contactPerson.toLowerCase().includes(searchLower) ?? false);

      if (!matchSearch) return false;

      // Category filter
      if (categoryFilter !== 'All' && v.leadCategory !== categoryFilter) return false;

      // Association filter
      if (associationFilter === 'Identified' && !v.associatedCustomer) return false;
      if (associationFilter === 'Anonymous' && v.associatedCustomer) return false;

      // Visits filter
      if (v.totalVisits < minVisits) return false;

      // Date range filter
      if (dateRangeFilter === '7d') {
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        if (new Date(v.lastSeen).getTime() < sevenDaysAgo) return false;
      } else if (dateRangeFilter === '30d') {
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        if (new Date(v.lastSeen).getTime() < thirtyDaysAgo) return false;
      }

      return true;
    });
  }, [visitors, searchTerm, categoryFilter, associationFilter, dateRangeFilter, minVisits]);

  const handleManualAssociate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisitor || !manualCompany || !manualPhone) return;

    associateVisitorWithCustomer(selectedVisitor.visitorHash, {
      companyName: manualCompany,
      contactPerson: manualPerson || 'Purchasing In-Charge',
      phone: manualPhone,
      email: manualEmail || 'contact@client.com',
      gstin: manualGstin,
      source: 'Account Login'
    });

    // Update locally selected
    setSelectedVisitor(prev =>
      prev
        ? {
            ...prev,
            associatedCustomer: {
              id: `cust-${Date.now()}`,
              companyName: manualCompany,
              contactPerson: manualPerson,
              phone: manualPhone,
              email: manualEmail,
              gstin: manualGstin,
              source: 'Account Login',
              associatedAt: new Date().toISOString()
            },
            leadScore: Math.min(100, Math.max(prev.leadScore, 85)),
            leadCategory: 'Hot'
          }
        : null
    );

    setManualAssocOpen(false);
    setManualCompany('');
    setManualPerson('');
    setManualPhone('');
    setManualEmail('');
    setManualGstin('');
  };

  const getLeadCategoryBadge = (category: LeadCategory, score: number) => {
    if (category === 'Hot') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 shadow-xs">
          <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
          <span>Hot Lead ({score})</span>
        </span>
      );
    }
    if (category === 'Warm') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          <span>Warm Lead ({score})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        <span>Cold ({score})</span>
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner for Works Console */}
      <div className="p-4 rounded-2xl bg-forest-950 text-cream-50 border border-forest-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-mustard-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-serif font-bold text-base text-cream-50">
              Privacy-Compliant Wholesale Visitor Tracking &amp; Lead Scoring
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
              Visitor IPs are secured via server-side HMAC-SHA256 salted hashes. Raw IP addresses are never exposed or retained in plaintext. Lead scores (0–100) are computed dynamically from wholesale inquiries, packaging depth, and mandi calculator engagement.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-xs font-bold bg-forest-900 px-3.5 py-2 rounded-xl border border-forest-700 text-mustard-300">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Active Pipeline: {metrics.hotLeads} Hot Leads</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Visitors
            </span>
            <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-forest-950">
            {metrics.total}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Privacy-preserved keyed visitor identities
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Hot Buying Leads
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-rose-600">
              {metrics.hotLeads}
            </span>
            <span className="text-xs text-slate-500">Score &ge; 70</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Active quotation &amp; bulk carton inquiries
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Warm Prospects
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-amber-600">
              {metrics.warmLeads}
            </span>
            <span className="text-xs text-slate-500">Score 40–69</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Repeat product &amp; mandi calculator visits
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Identified Wholesalers
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-forest-950">
              {metrics.identified}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">
              {Math.round((metrics.identified / Math.max(1, metrics.total)) * 100)}% Conversion
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Associated via Quotation or KYC submission
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Masked IP, Hash, or Company..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
            >
              <option value="All">All Lead Categories</option>
              <option value="Hot">🔥 Hot Leads (70-100)</option>
              <option value="Warm">⚡ Warm Leads (40-69)</option>
              <option value="Cold">❄️ Cold Visitors (0-39)</option>
            </select>
          </div>

          {/* Association Filter */}
          <div>
            <select
              value={associationFilter}
              onChange={e => setAssociationFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
            >
              <option value="All">All Identities</option>
              <option value="Identified">Identified Wholesalers</option>
              <option value="Anonymous">Anonymous Only</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <select
              value={dateRangeFilter}
              onChange={e => setDateRangeFilter(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
            >
              <option value="all">All-Time Visitors</option>
              <option value="7d">Active Last 7 Days</option>
              <option value="30d">Active Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Visit Frequency Pill Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-cream-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-mustard-600" />
            <span>Min. Repeat Visits:</span>
            {[1, 2, 5, 10].map(cnt => (
              <button
                key={cnt}
                type="button"
                onClick={() => setMinVisits(cnt)}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  minVisits === cnt
                    ? 'bg-forest-900 text-cream-50'
                    : 'bg-cream-100 text-slate-700 hover:bg-cream-200'
                }`}
              >
                {cnt}+
              </button>
            ))}
          </div>
          <div className="text-slate-500 text-[11px]">
            Showing <strong>{filteredVisitors.length}</strong> of {visitors.length} tracked visitor profiles
          </div>
        </div>
      </div>

      {/* Visitors List Table */}
      <div className="bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-cream-100/80 text-forest-950 font-bold uppercase text-[10px] tracking-wider border-b border-cream-200">
              <tr>
                <th className="py-3.5 px-4">Visitor / Masked IP</th>
                <th className="py-3.5 px-4">Lead Status &amp; Score</th>
                <th className="py-3.5 px-4">Associated Wholesaler</th>
                <th className="py-3.5 px-4 text-center">Visit Frequency</th>
                <th className="py-3.5 px-4">Top Pages Visited</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 text-slate-700">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No visitor records match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredVisitors.map(v => (
                  <tr key={v.id} className="hover:bg-cream-50/60 transition">
                    {/* Visitor ID & Masked IP */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-forest-950 text-xs">
                        {v.maskedIp}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[140px]" title={v.visitorHash}>
                        Hash: {v.visitorHash.substring(0, 14)}...
                      </div>
                    </td>

                    {/* Lead Score & Category */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {getLeadCategoryBadge(v.leadCategory, v.leadScore)}
                        {/* Visual Progress Bar */}
                        <div className="w-24 bg-cream-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              v.leadCategory === 'Hot'
                                ? 'bg-rose-500'
                                : v.leadCategory === 'Warm'
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${v.leadScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Associated Customer Identity */}
                    <td className="py-3.5 px-4">
                      {v.associatedCustomer ? (
                        <div className="space-y-0.5">
                          <div className="font-bold text-forest-950 text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate max-w-[160px]">{v.associatedCustomer.companyName}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {v.associatedCustomer.contactPerson} ({v.associatedCustomer.phone})
                          </div>
                          <span className="inline-block text-[9px] uppercase px-1.5 py-0.2 rounded bg-forest-100 text-forest-800 font-semibold">
                            via {v.associatedCustomer.source}
                          </span>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-xs flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                          <span>Anonymous Prospect</span>
                        </div>
                      )}
                    </td>

                    {/* Visit Counts */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-bold text-sm text-forest-950">
                        {v.totalVisits} visits
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {v.visitsLast7Days} in last 7d
                      </div>
                    </td>

                    {/* Most Visited Pages */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1 max-w-[200px]">
                        {v.mostVisitedPages.slice(0, 2).map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600 truncate">
                            <span className="truncate mr-2 font-medium" title={p.path}>
                              {p.title || p.path}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-cream-100 text-[10px] font-bold text-forest-900 shrink-0">
                              {p.count}x
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Last Seen */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      <div>{new Date(v.lastSeen).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(v.lastSeen).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedVisitor(v)}
                        className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition shadow-xs inline-flex items-center gap-1 cursor-pointer active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5 text-mustard-400" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visitor Detail Modal with Chronological History */}
      {selectedVisitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs no-print">
          <div className="bg-white text-forest-950 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-cream-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-forest-950 text-cream-50 p-5 flex items-center justify-between rounded-t-3xl border-b border-forest-800 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5 text-mustard-400" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-cream-50 flex items-center gap-2">
                    <span>Visitor Journey &amp; Lead Scorecard</span>
                  </h3>
                  <p className="text-xs text-mustard-300 font-mono">
                    Masked IP: {selectedVisitor.maskedIp} · Hash: {selectedVisitor.visitorHash.substring(0, 16)}...
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisitor(null)}
                className="p-1.5 rounded-xl hover:bg-forest-800 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Scorecard Hero Banner */}
              <div className="bg-cream-50 rounded-2xl p-5 border border-cream-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Lead Classification</span>
                  <div className="mt-1">
                    {getLeadCategoryBadge(selectedVisitor.leadCategory, selectedVisitor.leadScore)}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Frequency</span>
                  <div className="font-black text-forest-950 text-base mt-0.5">
                    {selectedVisitor.totalVisits} sessions
                  </div>
                  <span className="text-[10px] text-slate-500">{selectedVisitor.visitsLast7Days} in last 7 days</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">First Seen</span>
                  <div className="font-bold text-forest-950 mt-0.5">
                    {new Date(selectedVisitor.firstSeen).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Last Active</span>
                  <div className="font-bold text-forest-950 mt-0.5">
                    {new Date(selectedVisitor.lastSeen).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Customer Association Status */}
              <div className="bg-forest-50 p-5 rounded-2xl border border-forest-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-forest-700 uppercase tracking-wider block">
                    Confirmed Business Entity
                  </span>
                  {selectedVisitor.associatedCustomer ? (
                    <div className="mt-1">
                      <h4 className="font-serif font-black text-base text-forest-950">
                        {selectedVisitor.associatedCustomer.companyName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Contact: {selectedVisitor.associatedCustomer.contactPerson} · Phone: {selectedVisitor.associatedCustomer.phone}
                      </p>
                      {selectedVisitor.associatedCustomer.gstin && (
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          GSTIN: {selectedVisitor.associatedCustomer.gstin}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600 mt-0.5">
                      No customer record associated yet. Prospect is exploring wholesale packaging anonymously.
                    </p>
                  )}
                </div>

                {!selectedVisitor.associatedCustomer && (
                  <button
                    type="button"
                    onClick={() => setManualAssocOpen(true)}
                    className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-mustard-400" />
                    <span>Associate Business</span>
                  </button>
                )}
              </div>

              {/* Manual Association Form */}
              {manualAssocOpen && (
                <form onSubmit={handleManualAssociate} className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
                  <div className="font-bold text-xs text-amber-950 uppercase tracking-wider">
                    Link Visitor to Wholesaler Account (KYC/Phone)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Company / Firm Name *</label>
                      <input
                        type="text"
                        required
                        value={manualCompany}
                        onChange={e => setManualCompany(e.target.value)}
                        placeholder="e.g. Rajasthan Oil Traders"
                        className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        value={manualPerson}
                        onChange={e => setManualPerson(e.target.value)}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={manualPhone}
                        onChange={e => setManualPhone(e.target.value)}
                        placeholder="+91 90572 92529"
                        className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">GSTIN Number</label>
                      <input
                        type="text"
                        value={manualGstin}
                        onChange={e => setManualGstin(e.target.value)}
                        placeholder="08AAECP..."
                        className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setManualAssocOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-amber-100 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-forest-900 text-cream-50 font-bold text-xs shadow-xs"
                    >
                      Save Association
                    </button>
                  </div>
                </form>
              )}

              {/* Chronological Activity Timeline */}
              <div>
                <h4 className="font-serif font-bold text-sm text-forest-950 uppercase tracking-wider mb-4">
                  Chronological Visitor Activity &amp; Intent Journey
                </h4>
                <div className="border border-cream-200 rounded-2xl overflow-hidden divide-y divide-cream-100">
                  {selectedVisitor.events.map((evt, idx) => (
                    <div key={evt.id || idx} className="p-4 flex items-start justify-between gap-4 hover:bg-cream-50/50">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            evt.eventType === 'quote_submitted'
                              ? 'bg-rose-100 text-rose-700'
                              : evt.eventType === 'kyc_submitted'
                              ? 'bg-forest-100 text-forest-800'
                              : evt.eventType === 'add_to_cart'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-cream-200 text-slate-700'
                          }`}
                        >
                          +{evt.weight}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-forest-950 flex items-center gap-2">
                            <span>{evt.pageTitle}</span>
                            <span className="text-[10px] font-mono text-slate-400 font-normal">
                              ({evt.pagePath})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Event: <strong className="text-slate-700">{evt.eventType}</strong>
                            {evt.metadata && (
                              <span className="ml-2 text-forest-800 font-mono text-[10px]">
                                {JSON.stringify(evt.metadata)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 text-right shrink-0 whitespace-nowrap">
                        {new Date(evt.timestamp).toLocaleString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setSelectedVisitor(null)}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition"
                >
                  Close Scorecard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
