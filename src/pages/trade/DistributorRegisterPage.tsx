import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SEOHead } from '../../components/common/SEOHead';
import {
  Building2,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  FileCheck2
} from 'lucide-react';

export const DistributorRegisterPage: React.FC = () => {
  const { submitDistributorApplication } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('Managing Partner / Proprietor');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const [businessType, setBusinessType] = useState<
    'Wholesaler' | 'Super Stockist' | 'C&F Agent' | 'Modern Trade / Supermarket' | 'Food Processing Industry'
  >('Wholesaler');

  const [yearsInBusiness, setYearsInBusiness] = useState('5 to 10 Years');
  const [annualTurnover, setAnnualTurnover] = useState('₹5 - ₹10 Crores');
  const [godownCapacity, setGodownCapacity] = useState('2,500 Sq Ft Dry Warehouse');
  const [operatingStates, setOperatingStates] = useState('Uttar Pradesh, Bihar');

  const [gstin, setGstin] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setOtp('5842'); // Simulated OTP
  };

  const handleVerifyOtp = () => {
    if (otp === '5842') {
      setOtpVerified(true);
    } else {
      alert('Incorrect OTP. Use simulated code 5842.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !phone || !city || !address) {
      alert('Please fill all mandatory business profile fields.');
      return;
    }

    submitDistributorApplication({
      companyName,
      tradeName: tradeName || companyName,
      contactPerson,
      designation,
      email: email || `${phone}@distributor.in`,
      phone,
      businessType,
      yearsInBusiness,
      annualTurnover,
      operatingStates: operatingStates.split(',').map(s => s.trim()),
      godownCapacity,
      gstin: gstin.toUpperCase() || 'GST-PENDING',
      panNumber: panNumber.toUpperCase() || (gstin ? gstin.slice(2, 12) : 'PAN-PENDING'),
      address,
      city,
      state,
      pincode: pincode || '208001'
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen ambient-glass-canvas py-16 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-[#C49A32] flex items-center justify-center mx-auto shadow-inner border border-amber-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
              Distributor Application Received
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#2D2418]">
              Welcome, {companyName}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your business KYC has been registered and submitted to the Prime Fresh Oil Mills review board. Your distributor portal account is now active.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-xs text-left space-y-1.5 border border-white/80 shadow-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Company Name:</span>
              <strong className="text-[#2D2418]">{companyName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Business Segment:</span>
              <span className="text-[#2D2418] font-semibold">{businessType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Primary Territory:</span>
              <span className="text-[#2D2418] font-semibold">{city}, {state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Verification Status:</span>
              <span className="text-[#8C6B1B] font-bold bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300">
                Pending Mill Verification (Can Browse &amp; Request Quotes)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-sm shadow-md transition border border-[#C49A32]/40"
            >
              Start Ordering Wholesale Packs
            </Link>
            <Link
              to="/portal/profile"
              className="px-6 py-3 rounded-xl glass-panel hover:bg-white text-[#2D2418] font-bold text-sm transition shadow-xs border border-[#C49A32]/30"
            >
              View Business Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ambient-glass-canvas py-12 relative">
      <SEOHead
        title="Distributor Registration & Wholesale Onboarding KYC"
        description="Become an authorized distributor or wholesale partner for Prime Fresh Oil Mills. Direct mill pricing, dedicated credit tiers, priority dispatch, and territory allocation."
        keywords="mustard oil distributor registration, become edible oil dealer, oil agency dealership, wholesale oil distributorship India"
        canonicalPath="/portal/register"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
            Indian Wholesale Distribution Network
          </span>
          <h1 className="font-serif font-black text-2xl sm:text-4xl text-[#2D2418] mb-3">
            Distributor &amp; Super-Stockist Onboarding
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Partner directly with our primary crushing mill in Rajasthan. Gain access to protected district territories, factory gate pricing, and dedicated road tanker logistics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Section 1: Business Identity */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <Building2 className="w-5 h-5 text-[#C49A32]" />
              <span>Commercial Firm &amp; Trade Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Registered Entity / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Shree Balaji Agro Traders"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Trade / Mandi Shop Name</label>
                <input
                  type="text"
                  value={tradeName}
                  onChange={e => setTradeName(e.target.value)}
                  placeholder="e.g. Balaji Oil Depot"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Business Classification *</label>
                <select
                  value={businessType}
                  onChange={e => setBusinessType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="Wholesaler" className="bg-white">Mandi Wholesaler / Oil Trader</option>
                  <option value="Super Stockist" className="bg-white">Regional Super Stockist</option>
                  <option value="C&F Agent" className="bg-white">Carrying & Forwarding (C&F) Agent</option>
                  <option value="Modern Trade / Supermarket" className="bg-white">Supermarket Chain / Modern Trade</option>
                  <option value="Food Processing Industry" className="bg-white">Industrial Food / Namkeen / Pickle Manufacturer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Years in Wholesale Trade</label>
                <select
                  value={yearsInBusiness}
                  onChange={e => setYearsInBusiness(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="1 to 3 Years" className="bg-white">1 to 3 Years</option>
                  <option value="5 to 10 Years" className="bg-white">5 to 10 Years</option>
                  <option value="10 to 20 Years" className="bg-white">10 to 20 Years</option>
                  <option value="20+ Years" className="bg-white">20+ Years (Established Multigenerational Mandi Firm)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Person & Phone OTP */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <User className="w-5 h-5 text-[#C49A32]" />
              <span>Contact Person &amp; Mobile Verification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Authorized Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="e.g. Rajesh Agrawal"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  placeholder="e.g. Managing Partner, Director, Proprietor"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 98390 12345"
                    disabled={otpVerified}
                    className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden disabled:bg-slate-100/50"
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold shrink-0 transition cursor-pointer border border-[#C49A32]/40"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  )}
                </div>
                {otpVerified && (
                  <span className="text-[#C49A32] font-bold flex items-center gap-1 mt-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mobile number verified
                  </span>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Business Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. rajesh@balajiagrotraders.in"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              {otpSent && !otpVerified && (
                <div className="sm:col-span-2 p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center gap-3">
                  <div className="text-xs">
                    <span className="font-bold text-[#2D2418] block">Simulated OTP Code: 5842</span>
                    <span className="text-slate-600">Enter the 4-digit verification code below:</span>
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="5842"
                    maxLength={4}
                    className="w-24 px-3 py-1.5 rounded-lg border border-amber-300 font-bold text-center tracking-widest text-sm bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="px-4 py-1.5 bg-[#C49A32] hover:bg-[#B38927] font-bold rounded-lg text-white text-xs shadow-xs cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Business Address & Godown Storage */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <MapPin className="w-5 h-5 text-[#C49A32]" />
              <span>Business Address &amp; Logistics Infrastructure</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">Mandi / Godown Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Shop / Plot Number, Mandi Market Complex, Transport Road..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City / District *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. Kanpur, Patna, Kolkata"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="e.g. Uttar Pradesh, Bihar"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="e.g. 208001"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Godown Storage Capacity</label>
                <input
                  type="text"
                  value={godownCapacity}
                  onChange={e => setGodownCapacity(e.target.value)}
                  placeholder="e.g. 3,000 Sq Ft / 4,000 Tins stacking"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Annual Edible Oil Turnover</label>
                <input
                  type="text"
                  value={annualTurnover}
                  onChange={e => setAnnualTurnover(e.target.value)}
                  placeholder="e.g. ₹5 - ₹10 Crores"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Operating States</label>
                <input
                  type="text"
                  value={operatingStates}
                  onChange={e => setOperatingStates(e.target.value)}
                  placeholder="e.g. UP, Bihar, Bengal"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Tax & Compliance */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#2D2418] flex items-center gap-2 border-b border-slate-200/60 pb-3">
              <FileCheck2 className="w-5 h-5 text-[#C49A32]" />
              <span>Tax &amp; Identification Details (Optional at Registration)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  GSTIN (Goods and Services Tax ID)
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={e => setGstin(e.target.value.toUpperCase())}
                  placeholder="e.g. 09AAACB2041D1Z4 (15 characters)"
                  maxLength={15}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden uppercase"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Optional during initial registration. Required before commercial tax invoice dispatch.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  PAN (Permanent Account Number)
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={e => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. AAACB2041D"
                  maxLength={10}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden uppercase"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60">
            <div className="text-xs text-slate-500">
              Already registered with our sales department?{' '}
              <Link to="/portal/login" className="font-bold text-[#2D2418] hover:text-[#C49A32] underline">
                Sign In to Trade Account
              </Link>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer border border-[#C49A32]/40"
            >
              <span>Submit Dealership Application</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
