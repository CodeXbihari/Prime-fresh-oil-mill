import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  User,
  MapPin,
  FileCheck2,
  Check
} from 'lucide-react';

export const DistributorProfilePage: React.FC = () => {
  const { user, updateCurrentProfile } = useApp();
  const dist = user.distributorInfo;

  const [companyName, setCompanyName] = useState(dist?.companyName || '');
  const [tradeName, setTradeName] = useState(dist?.tradeName || '');
  const [contactPerson, setContactPerson] = useState(dist?.contactPerson || '');
  const [designation, setDesignation] = useState(dist?.designation || '');
  const [email, setEmail] = useState(dist?.email || '');
  const [phone, setPhone] = useState(dist?.phone || '');
  const [address, setAddress] = useState(dist?.address || '');
  const [city, setCity] = useState(dist?.city || '');
  const [state, setState] = useState(dist?.state || '');
  const [pincode, setPincode] = useState(dist?.pincode || '');
  const [gstin, setGstin] = useState(dist?.gstin || '');
  const [panNumber, setPanNumber] = useState(dist?.panNumber || '');
  const [godownCapacity, setGodownCapacity] = useState(dist?.godownCapacity || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentProfile({
      companyName,
      tradeName,
      contactPerson,
      designation,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      gstin: gstin.toUpperCase(),
      panNumber: panNumber.toUpperCase(),
      godownCapacity
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen ambient-glass-canvas py-10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Profile Summary */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#C49A32] text-white font-serif font-black text-2xl flex items-center justify-center shadow-md border border-white/40">
              {companyName ? companyName.charAt(0) : 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-black text-2xl text-[#2D2418]">
                  {companyName || 'Distributor Profile'}
                </h1>
                <span className="glass-pill text-emerald-800 text-xs px-2.5 py-0.5 font-bold border-emerald-300">
                  {dist?.status || 'Active Wholesaler'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {dist?.assignedTier || 'Authorized Wholesale Partner'} • Registered for {city}, {state}
              </p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/80 text-xs space-y-1 shadow-xs">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Approved Credit Line:</span>
              <strong className="text-[#2D2418]">
                {dist?.creditLimit ? `₹${(dist.creditLimit / 100000).toFixed(1)} Lakhs` : 'Against RTGS / LR'}
              </strong>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Primary Delivery Corridor:</span>
              <span className="font-semibold text-[#2D2418]">{state || 'Rajasthan/UP/Bihar'}</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50/90 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Business profile updated and synced successfully.</span>
            </div>
          )}

          {/* Business Entity */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <Building2 className="w-5 h-5 text-[#C49A32]" />
              <span>Business Entity Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Registered Firm Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mandi Trade / Shop Name</label>
                <input
                  type="text"
                  value={tradeName}
                  onChange={e => setTradeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <User className="w-5 h-5 text-[#C49A32]" />
              <span>Contact Person Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation / Role</label>
                <input
                  type="text"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Business Address & Godown */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <MapPin className="w-5 h-5 text-[#C49A32]" />
              <span>Registered Godown &amp; Billing Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">Street Address / Mandi Yard</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City / District</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">Warehouse / Godown Stacking Capacity</label>
                <input
                  type="text"
                  value={godownCapacity}
                  onChange={e => setGodownCapacity(e.target.value)}
                  placeholder="e.g. 4,000 Tins stacking / 3,000 Sq Ft"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Tax Compliance */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <FileCheck2 className="w-5 h-5 text-[#C49A32]" />
              <span>Tax &amp; Identification Numbers</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={e => setGstin(e.target.value.toUpperCase())}
                  placeholder="09AAACB2041D1Z4"
                  maxLength={15}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 uppercase focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PAN Card Number</label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={e => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="AAACB2041D"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 uppercase focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-sm tracking-wide shadow-md transition flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Check className="w-4 h-4 text-white" />
              <span>Save Business Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
