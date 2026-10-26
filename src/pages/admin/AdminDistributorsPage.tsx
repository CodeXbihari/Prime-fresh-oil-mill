import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DistributorApplication } from '../../types';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Search,
  X
} from 'lucide-react';

export const AdminDistributorsPage: React.FC = () => {
  const { distributors, updateDistributorApplication } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeDistributor, setActiveDistributor] = useState<DistributorApplication | null>(null);

  // Edit fields inside modal
  const [assignedTier, setAssignedTier] = useState<DistributorApplication['assignedTier']>('Tier 1 Prime Partner');
  const [creditLimit, setCreditLimit] = useState<number>(1000000);
  const [adminNotes, setAdminNotes] = useState('');

  const filteredDistributors = distributors.filter(d => {
    const matchesSearch =
      d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.gstin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || d.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReview = (dist: DistributorApplication) => {
    setActiveDistributor(dist);
    setAssignedTier(dist.assignedTier || 'Tier 2 Regional Stockist');
    setCreditLimit(dist.creditLimit || 500000);
    setAdminNotes(dist.adminNotes || '');
  };

  const handleUpdateStatus = (newStatus: DistributorApplication['status']) => {
    if (activeDistributor) {
      updateDistributorApplication(activeDistributor.id, newStatus, {
        assignedTier,
        creditLimit,
        adminNotes
      });
      setActiveDistributor(prev => (prev ? { ...prev, status: newStatus, assignedTier, creditLimit, adminNotes } : null));
      alert(`Distributor status updated to "${newStatus}"!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-forest-950">
              Distributor Onboarding & KYC Review
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review wholesaler registrations, verify GSTIN/PAN credentials, and assign commercial credit tiers.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-forest-950">
              {distributors.filter(d => d.status === 'Pending').length} Pending KYC
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company name, contact, city, or GSTIN..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 bg-cream-50"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {['All', 'Pending', 'Approved', 'Review Required', 'Rejected'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-forest-900 text-cream-50'
                    : 'bg-cream-100 hover:bg-cream-200 text-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Distributors Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Distributor Entity</th>
                <th className="p-4">Contact & Mobile</th>
                <th className="p-4">Territory / Location</th>
                <th className="p-4">Business Segment</th>
                <th className="p-4">GSTIN & PAN</th>
                <th className="p-4">KYC Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredDistributors.map(dist => (
                <tr key={dist.id} className="hover:bg-cream-50/70 transition">
                  <td className="p-4 font-bold text-forest-950">
                    <div className="flex items-center gap-2">
                      <span>{dist.companyName}</span>
                    </div>
                    {dist.tradeName && (
                      <span className="text-[10px] text-slate-500 font-normal block">
                        T/A {dist.tradeName}
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-slate-700">
                    <strong className="block text-forest-950">{dist.contactPerson}</strong>
                    <span className="text-[10px] text-slate-500">{dist.phone}</span>
                  </td>

                  <td className="p-4 text-slate-600">
                    <span className="font-semibold text-slate-800 block">{dist.city}, {dist.state}</span>
                    <span className="text-[10px] text-slate-400">PIN: {dist.pincode}</span>
                  </td>

                  <td className="p-4">
                    <span className="bg-cream-100 text-forest-950 px-2 py-0.5 rounded font-semibold text-[10px]">
                      {dist.businessType}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {dist.annualTurnover}
                    </div>
                  </td>

                  <td className="p-4 font-mono text-[11px] text-slate-700">
                    <div>{dist.gstin}</div>
                    <div className="text-[10px] text-slate-400">PAN: {dist.panNumber}</div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1 ${
                        dist.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : dist.status === 'Pending'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : dist.status === 'Review Required'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}
                    >
                      {dist.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenReview(dist)}
                      className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition shadow-xs inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review KYC</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review KYC Modal */}
      {activeDistributor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-cream-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-cream-200 pb-4">
              <div>
                <span className="text-[10px] font-bold text-mustard-600 uppercase tracking-widest block">
                  Distributor Application Dossier
                </span>
                <h3 className="font-serif font-black text-2xl text-forest-950">
                  {activeDistributor.companyName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Applied on {activeDistributor.applicationDate} • Mandi Territory: {activeDistributor.city}, {activeDistributor.state}
                </p>
              </div>
              <button
                onClick={() => setActiveDistributor(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* KYC Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cream-50 p-5 rounded-2xl border border-cream-200 text-xs">
              <div>
                <span className="text-slate-500 block">Contact Executive:</span>
                <strong className="text-forest-950 text-sm">{activeDistributor.contactPerson}</strong>
                <span className="text-[11px] text-slate-600 block">{activeDistributor.designation}</span>
                <span className="text-[11px] text-slate-600 block">{activeDistributor.phone} • {activeDistributor.email}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Godown / Registered Address:</span>
                <strong className="text-forest-950 block">{activeDistributor.address}</strong>
                <span className="text-[11px] text-slate-600 block">{activeDistributor.city}, {activeDistributor.state} - {activeDistributor.pincode}</span>
                <span className="text-[11px] text-slate-600 block">Godown Storage: {activeDistributor.godownCapacity}</span>
              </div>

              <div>
                <span className="text-slate-500 block">Tax & Banking Identification:</span>
                <strong className="font-mono text-forest-950 block">GSTIN: {activeDistributor.gstin}</strong>
                <strong className="font-mono text-slate-700 block">PAN: {activeDistributor.panNumber}</strong>
              </div>

              <div>
                <span className="text-slate-500 block">Wholesale Profile & Scale:</span>
                <span className="font-bold text-forest-950 block">{activeDistributor.businessType} ({activeDistributor.yearsInBusiness})</span>
                <span className="text-slate-600 block">Annual Turnover: {activeDistributor.annualTurnover}</span>
                <span className="text-slate-600 block">Operating States: {activeDistributor.operatingStates?.join(', ') || 'N/A'}</span>
              </div>
            </div>

            {/* Admin Commercial Assignment Options */}
            <div className="space-y-4 pt-2">
              <h4 className="font-serif font-bold text-sm text-forest-950 uppercase tracking-wider">
                Assign Commercial Terms & Partnership Tier
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Partner Tier</label>
                  <select
                    value={assignedTier}
                    onChange={e => setAssignedTier(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 font-bold bg-white"
                  >
                    <option value="Tier 1 Prime Partner">Tier 1 Prime Partner (Direct Factory Rate + Max Rebate)</option>
                    <option value="Tier 2 Regional Stockist">Tier 2 Regional Stockist (District Mandi Distributor)</option>
                    <option value="Authorized Wholesaler">Authorized Wholesaler (FOB Truckload lifting)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Approved Credit Line (₹)</label>
                  <input
                    type="number"
                    value={creditLimit}
                    onChange={e => setCreditLimit(parseInt(e.target.value) || 0)}
                    placeholder="e.g. 1000000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 font-bold bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Zero indicates strict advance RTGS payment before mill gate truck dispatch.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Internal Review Notes & Territory Allocation</label>
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={e => setAdminNotes(e.target.value)}
                    placeholder="e.g. Verified with local mandi traders in Kanpur. Authorized for 15L tin supply across Central UP..."
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Current Status: <strong>{activeDistributor.status}</strong>
              </span>

              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Approved')}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Grant Dealership</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Review Required')}
                  className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Mark Review Required</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Rejected')}
                  className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject KYC</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
