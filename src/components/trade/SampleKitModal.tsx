import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  X,
  CheckCircle2,
  Truck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = 'Prime Fresh Pure Yellow Mustard Oil (500ml Bottle)'
}) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    selectedProduct: defaultProduct,
    buyerType: 'Super Stockist / Distributor'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    if (defaultProduct) {
      setFormData(prev => ({ ...prev, selectedProduct: defaultProduct }));
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockRef = `PFM-SMP-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingNumber(mockRef);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white text-forest-950 rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-cream-300">
        {/* Header */}
        <div className="sticky top-0 bg-forest-950 text-cream-50 p-4 sm:p-5 flex items-center justify-between rounded-t-2xl border-b border-forest-800 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-mustard-500/20 border border-mustard-500/40 flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-mustard-400" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-cream-50 leading-tight">
                Request Free 500ml Lab Sample Kit
              </h3>
              <p className="text-xs text-mustard-300">
                Delivered free via Express Courier for sensory & lab testing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-forest-800 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-2xl text-forest-950">
                  Sample Dispatch Order Placed!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your complimentary 500ml commercial testing bottle is being packed at our Alwar QC godown with an enclosed batch COA certificate.
                </p>
              </div>

              <div className="bg-cream-100 p-4 rounded-xl border border-cream-300 max-w-sm mx-auto text-xs space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
                  Express Courier Tracking Reference
                </span>
                <span className="font-mono font-black text-lg text-forest-950 block">
                  {trackingNumber}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Estimated delivery in 48-72 hours
                </span>
              </div>

              <div className="text-xs text-slate-500 pt-2">
                A trade representative from our Alwar desk will WhatsApp the courier AWB receipt shortly to <strong>{formData.phone}</strong>.
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-mustard-50 border border-mustard-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-mustard-950">
                <Sparkles className="w-4 h-4 text-mustard-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Distributor & Wholesale Policy:</strong> Commercial samples are sent free of charge to registered traders, edible oil stockists, and institutional buyers across India.
                </span>
              </div>

              {/* Sample Product Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sample Item Required
                </label>
                <select
                  value={formData.selectedProduct}
                  onChange={e => setFormData({ ...formData, selectedProduct: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600 bg-white"
                >
                  <option value="Prime Fresh Pure Yellow Mustard Oil (500ml Bottle)">
                    Prime Fresh Pure Yellow Mustard Oil (500ml PET Sample Bottle)
                  </option>
                  <option value="Prime Black Mustard Seed (1 Kg Lab Testing Pouch)">
                    Prime Black Mustard Seed (1 Kg Lab Testing Pouch)
                  </option>
                  <option value="Prime Yellow Mustard Seed (1 Kg Lab Testing Pouch)">
                    Prime Yellow Mustard Seed (1 Kg Lab Testing Pouch)
                  </option>
                  <option value="High Protein Mustard Cake / Khali (1 Kg Sample)">
                    High Protein Mustard Cake / Khali (1 Kg Sample)
                  </option>
                </select>
              </div>

              {/* Business & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Company / Firm Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shree Balaji Traders"
                      value={formData.businessName}
                      onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-9 text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Aggarwal"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile / WhatsApp No. *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98290 12345"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="trade@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                    />
                  </div>
                </div>
              </div>

              {/* GSTIN & Business Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    GSTIN (Recommended)
                  </label>
                  <input
                    type="text"
                    placeholder="08AAECP..."
                    value={formData.gstin}
                    onChange={e => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Primary Trade Profile
                  </label>
                  <select
                    value={formData.buyerType}
                    onChange={e => setFormData({ ...formData, buyerType: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600 bg-white"
                  >
                    <option>Super Stockist / Distributor</option>
                    <option>Wholesale Mandi Merchant</option>
                    <option>Food Processor / Halwai Chain</option>
                    <option>Private Label Brand Owner</option>
                    <option>Ex-Mill Broker / Commission Agent</option>
                  </select>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Godown / Sample Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="Shop/Godown No, Street, Landmark, City & Pincode"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-9 text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                />
                <input
                  type="text"
                  required
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                  className="text-xs p-2.5 rounded-xl border border-cream-300 focus:outline-hidden focus:border-forest-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition shadow-sm"
                >
                  Dispatch Free Sample Kit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

