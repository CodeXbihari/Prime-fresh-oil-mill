import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Building,
  Truck,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight
} from 'lucide-react';

export const QuotationRequestPage: React.FC = () => {
  const { products, createDirectQuotation, user } = useApp();
  const location = useLocation();

  // Parse query params for prefilled product and qty
  const queryParams = new URLSearchParams(location.search);
  const prefillProductId = queryParams.get('productId');
  const prefillQty = parseInt(queryParams.get('qty') || '0', 10);
  const serviceParam = queryParams.get('service');

  // Selected products rows
  const [quoteItems, setQuoteItems] = useState<{ productId: string; quantity: number }[]>(() => {
    if (prefillProductId && prefillQty > 0) {
      return [{ productId: prefillProductId, quantity: prefillQty }];
    }
    const defaultProd = products[0];
    return [{ productId: defaultProd?.id || 'prod-yellow-mustard-seeds', quantity: defaultProd?.moq || 30 }];
  });

  // Business Profile
  const [companyName, setCompanyName] = useState(user.distributorInfo?.companyName || '');
  const [contactPerson, setContactPerson] = useState(user.distributorInfo?.contactPerson || '');
  const [phone, setPhone] = useState(user.distributorInfo?.phone || '');
  const [email, setEmail] = useState(user.distributorInfo?.email || '');
  const [gstin, setGstin] = useState(user.distributorInfo?.gstin || '');

  // Destination & Logistics
  const [deliveryType, setDeliveryType] = useState<'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)'>(
    'Door Delivery (Transporter)'
  );
  const [destinationCity, setDestinationCity] = useState(user.distributorInfo?.city || 'Kanpur');
  const [destinationState, setDestinationState] = useState(user.distributorInfo?.state || 'Uttar Pradesh');
  const [pincode, setPincode] = useState(user.distributorInfo?.pincode || '208001');
  const [shippingAddress, setShippingAddress] = useState(user.distributorInfo?.address || 'Wholesale Mandi Godown #14');
  const [transportPreference, setTransportPreference] = useState('VRL Logistics / TCI Freight');
  const [paymentTerms, setPaymentTerms] = useState('50% Advance RTGS, Balance against LR copy');
  const [deliveryUrgency, setDeliveryUrgency] = useState('Within 3-5 Working Days');
  const [clientNotes, setClientNotes] = useState(() => {
    if (serviceParam === 'private-label') {
      return 'Inquiry for Turnkey Private Label Packaging (Custom brand bottles / 15L tins). Please contact us with label design specs and minimum production run rates.';
    }
    if (serviceParam === 'road-tanker') {
      return 'Inquiry for 20-30 MT Road Tanker Supply (Loose cold-pressed mustard oil). Please provide spot tanker freight and computerized tare weighbridge terms.';
    }
    if (serviceParam === 'toll-crushing') {
      return 'Inquiry for Job Work / Toll Crushing of raw mustard seed lot. Please quote per-quintal processing charges and oil/khali recovery terms.';
    }
    return '';
  });

  const [generatedQuoteNumber, setGeneratedQuoteNumber] = useState<string | null>(null);

  const addItemRow = () => {
    const unselected = products.find(p => !quoteItems.some(item => item.productId === p.id)) || products[0];
    setQuoteItems(prev => [...prev, { productId: unselected.id, quantity: unselected.moq }]);
  };

  const removeItemRow = (index: number) => {
    if (quoteItems.length > 1) {
      setQuoteItems(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateItemRow = (index: number, updates: Partial<{ productId: string; quantity: number }>) => {
    setQuoteItems(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newProduct = updates.productId ? products.find(p => p.id === updates.productId) : null;
        return {
          ...item,
          ...updates,
          quantity: updates.productId && newProduct ? newProduct.moq : (updates.quantity ?? item.quantity)
        };
      })
    );
  };

  // Compute estimate
  const itemsWithProduct = quoteItems.map(item => {
    const p = products.find(prod => prod.id === item.productId) || products[0];
    let unitRate = p.indicativePrice;
    if (p.priceTiers) {
      const tier = [...p.priceTiers].sort((a, b) => b.minQty - a.minQty).find(t => item.quantity >= t.minQty);
      if (tier) unitRate = tier.pricePerUnit;
    }
    return { product: p, quantity: item.quantity, unitRate, lineTotal: unitRate * item.quantity };
  });

  const subtotal = itemsWithProduct.reduce((sum, item) => sum + item.lineTotal, 0);
  const gst = subtotal * 0.05;
  const freight = deliveryType === 'Door Delivery (Transporter)' ? 15000 : 0;
  const grandTotal = subtotal + gst + freight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone || !destinationCity) {
      alert('Please fill in Company Name, Phone, and Delivery Destination City.');
      return;
    }

    const quoteNum = createDirectQuotation(
      itemsWithProduct.map(i => ({ product: i.product, quantity: i.quantity })),
      {
        deliveryType,
        destinationCity,
        destinationState,
        pincode,
        shippingAddress,
        transportPreference,
        paymentTerms: `${paymentTerms} (Urgency: ${deliveryUrgency})`,
        clientNotes,
        companyName,
        contactPerson: contactPerson || 'Procurement Executive',
        phone,
        email: email || 'trade@distributor.com',
        gstin: gstin || undefined
      }
    );

    setGeneratedQuoteNumber(quoteNum);
  };

  if (generatedQuoteNumber) {
    return (
      <div className="min-h-screen bg-cream-50/60 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-mustard-600 uppercase tracking-widest block mb-1">
              Commercial Quotation Requested
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Quotation Ref: {generatedQuoteNumber}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your official request has been transmitted directly into the mill admin console. The mill works manager will generate a proforma quotation with live seed index pricing.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200 text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Wholesale Partner:</span>
              <strong className="text-forest-950">{companyName}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Destination Market:</span>
              <span className="font-bold text-forest-950">{destinationCity}, {destinationState}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Requested SKUs:</span>
              <span className="font-bold text-forest-950">{quoteItems.length} Product Line(s)</span>
            </div>
            <div className="flex justify-between text-slate-600 border-t border-cream-300 pt-2 font-bold text-sm">
              <span>Indicative Quotation Total:</span>
              <span className="text-mustard-700">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/portal/my-orders"
              className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm shadow transition"
            >
              View in My Quotations & Orders
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold text-sm transition"
            >
              Browse Full Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50/60 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-forest-900 font-bold">Request Official Quotation</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-4xl text-forest-950">
            Request Official Factory Quotation & Freight
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Specify desired packaging quantities, destination mandi, and delivery requirements. Our works team reviews daily crushing schedules and responds with a formal proforma quote within 2 working hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Product Selection & Quantities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-mustard-600" />
                  <span>Product Lines & Quantities</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select pack sizes and required quantities. Quantities adjust to minimum batch constraints.
                </p>
              </div>

              <button
                type="button"
                onClick={addItemRow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-bold transition self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Pack SKU</span>
              </button>
            </div>

            <div className="space-y-3">
              {quoteItems.map((item, idx) => {
                const currentProd = products.find(p => p.id === item.productId) || products[0];
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-cream-50/70 border border-cream-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex-1 w-full">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Select Packaging SKU
                      </label>
                      <select
                        value={item.productId}
                        onChange={e => updateItemRow(idx, { productId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.packaging}) — MOQ: {p.moq} {p.unitLabel}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full md:w-48">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        Quantity ({currentProd.unitLabel})
                      </label>
                      <input
                        type="number"
                        min={currentProd.moq}
                        value={item.quantity}
                        onChange={e => updateItemRow(idx, { quantity: parseInt(e.target.value) || currentProd.moq })}
                        className="w-full px-3 py-2 rounded-xl border border-cream-300 bg-white text-xs font-bold text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                      />
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-2 md:pt-4">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Est. Rate</span>
                        <span className="font-bold text-forest-950 text-xs">
                          ₹{currentProd.indicativePrice.toLocaleString('en-IN')}/{currentProd.unitLabel.replace(/s$/, '')}
                        </span>
                      </div>
                      {quoteItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Logistics & Commercial Terms */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2 border-b border-cream-200 pb-3">
              <Truck className="w-5 h-5 text-mustard-600" />
              <span>Logistics & Freight Requirements</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fulfillment Mode *</label>
                <select
                  value={deliveryType}
                  onChange={e => setDeliveryType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs font-semibold text-slate-800"
                >
                  <option value="Door Delivery (Transporter)">Door Delivery via Mill Commercial Transporter</option>
                  <option value="Ex-Mill (Pickup from Mill)">Ex-Mill Gate Collection (Customer Arranged Truck)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Urgency Timeline *</label>
                <select
                  value={deliveryUrgency}
                  onChange={e => setDeliveryUrgency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-xs font-semibold text-slate-800"
                >
                  <option value="Immediate Ready Stock (24-48 Hours)">Immediate Ready Stock (24-48 Hours)</option>
                  <option value="Within 3-5 Working Days">Within 3-5 Working Days</option>
                  <option value="Planned Next Week Dispatch">Planned Next Week Dispatch</option>
                  <option value="Monthly Long-Term Contract">Monthly Long-Term Bulk Lifting Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-3">
                <label className="block font-bold text-slate-700 mb-1">Godown / Delivery Street Address</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  placeholder="Plot/Shop address, Wholesale Mandi, Transport Nagar..."
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination City *</label>
                <input
                  type="text"
                  required
                  value={destinationCity}
                  onChange={e => setDestinationCity(e.target.value)}
                  placeholder="e.g. Kanpur, Patna, Kolkata"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination State *</label>
                <input
                  type="text"
                  required
                  value={destinationState}
                  onChange={e => setDestinationState(e.target.value)}
                  placeholder="e.g. Uttar Pradesh"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="e.g. 208001"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Transporter (if any)</label>
                <input
                  type="text"
                  value={transportPreference}
                  onChange={e => setTransportPreference(e.target.value)}
                  placeholder="e.g. VRL, TCI Freight, ARC Logistics, Local Mandi Carrier"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Commercial Payment Terms</label>
                <input
                  type="text"
                  value={paymentTerms}
                  onChange={e => setPaymentTerms(e.target.value)}
                  placeholder="e.g. 100% Advance RTGS, 20% Advance + Balance against LR"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Wholesaler Contact Info */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2 border-b border-cream-200 pb-3">
              <Building className="w-5 h-5 text-mustard-600" />
              <span>Wholesaler / Business Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. Shree Balaji Agro Traders"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Person & Designation *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="e.g. Rajesh Agrawal (Partner)"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. +91 98390 12345"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. rajesh@balajiagrotraders.in"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">GSTIN Number (Optional for inquiry)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={e => setGstin(e.target.value.toUpperCase())}
                  placeholder="e.g. 09AAACB2041D1Z4"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">Special Specifications / Stencil Notes</label>
              <textarea
                rows={2}
                value={clientNotes}
                onChange={e => setClientNotes(e.target.value)}
                placeholder="Mention any custom brand stenciling, carton markings, high-pungency lab report request, or mandi terms..."
                className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
              />
            </div>
          </div>

          {/* Submission Bar */}
          <div className="bg-forest-950 text-cream-50 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-mustard-400 uppercase tracking-wider block">
                Indicative Estimate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-black text-2xl sm:text-3xl text-cream-50">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-300">
                  (Includes ₹{Math.round(gst).toLocaleString('en-IN')} GST + {deliveryType === 'Door Delivery (Transporter)' ? '₹15,000 Freight' : 'Ex-Mill'})
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Final proforma rate will reflect the official Brassica seed closing index on quote issuance.
              </p>
            </div>

            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-sm tracking-wide shadow-lg transition flex items-center gap-2 shrink-0 group"
            >
              <span>Transmit Quotation Request</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
