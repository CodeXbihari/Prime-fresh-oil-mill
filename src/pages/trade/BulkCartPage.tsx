import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
import { SEOHead } from '../../components/common/SEOHead';
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Building,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const BulkCartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartGstEstimate,
    cartTotalEstimate,
    createQuotationFromCart,
    user
  } = useApp();

  // Commercial / Delivery Preferences
  const [deliveryType, setDeliveryType] = useState<'Ex-Mill (Pickup from Mill)' | 'Door Delivery (Transporter)'>(
    'Door Delivery (Transporter)'
  );

  // Business Information (prefilled from user profile if available)
  const [companyName, setCompanyName] = useState(user.distributorInfo?.companyName || '');
  const [contactPerson, setContactPerson] = useState(user.distributorInfo?.contactPerson || '');
  const [phone, setPhone] = useState(user.distributorInfo?.phone || '');
  const [email, setEmail] = useState(user.distributorInfo?.email || '');
  const [gstin, setGstin] = useState(user.distributorInfo?.gstin || '');
  const [destinationCity, setDestinationCity] = useState(user.distributorInfo?.city || 'Kanpur');
  const [destinationState, setDestinationState] = useState(user.distributorInfo?.state || 'Uttar Pradesh');
  const [pincode, setPincode] = useState(user.distributorInfo?.pincode || '208001');
  const [shippingAddress, setShippingAddress] = useState(user.distributorInfo?.address || 'Mandi Godown #12, Transport Nagar');
  const [transportPreference, setTransportPreference] = useState('VRL Logistics / TCI Freight');
  const [paymentTerms, setPaymentTerms] = useState('50% Advance RTGS, Balance against Transporter Lorry Receipt');
  const [clientNotes, setClientNotes] = useState('');

  const [submittedQuoteNumber, setSubmittedQuoteNumber] = useState<string | null>(null);

  const freightCharge = deliveryType === 'Door Delivery (Transporter)' ? 12500 : 0;
  const grandTotal = cartTotalEstimate + freightCharge;

  const handleSubmitQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone || !destinationCity) {
      alert('Please fill in Company Name, Phone, and Delivery City.');
      return;
    }

    const quoteNum = createQuotationFromCart({
      deliveryType,
      destinationCity,
      destinationState,
      pincode,
      shippingAddress,
      transportPreference,
      paymentTerms,
      clientNotes,
      companyName,
      contactPerson: contactPerson || 'Procurement Incharge',
      phone,
      email: email || 'trade@distributor.com',
      gstin: gstin || undefined
    });

    setSubmittedQuoteNumber(quoteNum);
  };

  if (submittedQuoteNumber) {
    return (
      <div className="min-h-screen ambient-glass-canvas py-16 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100/90 text-emerald-800 flex items-center justify-center mx-auto shadow-inner border border-emerald-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#C49A32] uppercase tracking-widest block mb-1">
              Quotation Request Transmitted
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#102B20]">
              Quotation Ref: {submittedQuoteNumber}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your bulk order requirements have been received directly at our mill dispatch desk. The works manager will review today's seed index and issue a proforma invoice.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 text-left text-xs space-y-2 shadow-xs">
            <div className="flex justify-between text-slate-600">
              <span>Distributor / Firm:</span>
              <strong className="text-[#102B20]">{companyName}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Destination:</span>
              <span className="font-bold text-[#102B20]">{destinationCity}, {destinationState}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fulfillment Logistics:</span>
              <span className="font-bold text-[#102B20]">{deliveryType}</span>
            </div>
            <div className="flex justify-between text-slate-600 border-t border-slate-200/60 pt-2 font-bold text-sm">
              <span>Indicative Amount:</span>
              <span className="text-[#C49A32]">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/portal/my-orders"
              className="px-6 py-3 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-sm shadow-sm transition border border-white/20"
            >
              Track in My Orders &amp; Quotations
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl glass-panel hover:bg-white text-[#102B20] font-bold text-sm transition shadow-xs"
            >
              Continue Browsing Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen ambient-glass-canvas py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <EmptyState
            icon={ShoppingCart}
            title="Your Bulk Cart is Currently Empty"
            description="You have not added any mustard oil pack sizes to your bulk order cart yet. Browse our wholesale commercial tins, pet jars, and master boxes to begin."
            actionText="Explore Wholesale Pack Catalog"
            actionLink="/products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ambient-glass-canvas py-10 relative">
      <SEOHead
        title="Bulk Order Cart & Wholesale Consignment Request"
        description="Review wholesale mustard oil line items, packaging, transport preferences, and generate a formal commercial invoice quotation."
        canonicalPath="/cart"
        noIndex={true}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#102B20]">
              Wholesale Bulk Order Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Review commercial line items, quantities, and specify delivery destination terms.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer glass-panel px-3 py-1.5 rounded-lg shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Cart</span>
          </button>
        </div>

        <form onSubmit={handleSubmitQuotation}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Cart Items Table & Delivery Settings */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items Card */}
              <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
                <div className="px-6 py-4 bg-white/40 border-b border-slate-200/60 flex justify-between items-center text-xs font-bold text-[#102B20] uppercase tracking-wider">
                  <span>Selected Wholesale SKUs ({cart.length})</span>
                  <span>Minimum Order Quantity Check</span>
                </div>

                <div className="divide-y divide-slate-200/50">
                  {cart.map(item => {
                    const isBelowMoq = item.quantity < item.product.moq;
                    // volume discount check
                    let unitPrice = item.product.indicativePrice;
                    if (item.product.priceTiers && item.product.priceTiers.length > 0) {
                      const tier = [...item.product.priceTiers]
                        .sort((a, b) => b.minQty - a.minQty)
                        .find(t => item.quantity >= t.minQty);
                      if (tier) unitPrice = tier.pricePerUnit;
                    }
                    const lineSubtotal = unitPrice * item.quantity;

                    return (
                      <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/40 transition">
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover bg-white/60 shrink-0 border border-white/80 shadow-xs"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-[#C49A32] uppercase tracking-wider block">
                              {item.product.packaging}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-[#102B20]">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <span>Rate: <strong>₹{unitPrice.toLocaleString('en-IN')}</strong>/{item.product.unitLabel.replace(/s$/, '')}</span>
                              <span>•</span>
                              <span>MOQ: {item.product.moq} {item.product.unitLabel}</span>
                            </div>
                            {isBelowMoq && (
                              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 mt-1">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>Quantity is below recommended MOQ ({item.product.moq})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter & Line Subtotal */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                          <div className="flex items-center border border-white/80 rounded-xl bg-white/80 backdrop-blur-sm overflow-hidden text-xs shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 10)}
                              className="px-2.5 py-1.5 hover:bg-slate-100 font-bold text-slate-700 transition cursor-pointer"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center font-bold text-[#102B20] bg-transparent py-1 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 10)}
                              className="px-2.5 py-1.5 hover:bg-slate-100 font-bold text-slate-700 transition cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[100px]">
                            <span className="text-sm font-bold text-[#102B20] block">
                              ₹{lineSubtotal.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline mt-0.5 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Logistics & Transporter Details */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
                <h3 className="font-serif font-bold text-lg text-[#102B20] flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#C49A32]" />
                  <span>Logistics &amp; Delivery Destination</span>
                </h3>

                {/* Delivery Type Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      deliveryType === 'Door Delivery (Transporter)'
                        ? 'bg-white/90 border-[#C49A32] shadow-sm ring-1 ring-[#C49A32]'
                        : 'bg-white/40 border-white/70 hover:bg-white/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Door Delivery (Transporter)'}
                      onChange={() => setDeliveryType('Door Delivery (Transporter)')}
                      className="mt-1 text-[#C49A32] focus:ring-[#C49A32]"
                    />
                    <div>
                      <strong className="text-[#102B20] text-sm block">Door Delivery via Transporter</strong>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mill arranges dedicated cargo truck or part-load lorry receipt (LR) delivery to your city godown.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      deliveryType === 'Ex-Mill (Pickup from Mill)'
                        ? 'bg-white/90 border-[#C49A32] shadow-sm ring-1 ring-[#C49A32]'
                        : 'bg-white/40 border-white/70 hover:bg-white/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Ex-Mill (Pickup from Mill)'}
                      onChange={() => setDeliveryType('Ex-Mill (Pickup from Mill)')}
                      className="mt-1 text-[#C49A32] focus:ring-[#C49A32]"
                    />
                    <div>
                      <strong className="text-[#102B20] text-sm block">Ex-Mill Factory Gate Collection</strong>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Your own vehicle/transporter collects consignment from our Alwar mill gate. Zero freight added.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Address & City Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination City *</label>
                    <input
                      type="text"
                      required
                      value={destinationCity}
                      onChange={e => setDestinationCity(e.target.value)}
                      placeholder="e.g. Kanpur, Patna, Kolkata"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination State *</label>
                    <input
                      type="text"
                      required
                      value={destinationState}
                      onChange={e => setDestinationState(e.target.value)}
                      placeholder="e.g. Uttar Pradesh, Bihar"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      placeholder="e.g. 208001"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Godown / Delivery Address</label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={e => setShippingAddress(e.target.value)}
                    placeholder="Godown address, Mandi market plot, Transport Nagar location..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Distributor Business Credentials */}
              <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#102B20] flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C49A32]" />
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
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Person *</label>
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
                    <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. +91 98390 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. trade@distributor.com"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GSTIN (Optional at quote stage)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={e => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 09AAACB2041D1Z4"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Transporter</label>
                    <input
                      type="text"
                      value={transportPreference}
                      onChange={e => setTransportPreference(e.target.value)}
                      placeholder="e.g. VRL Logistics, TCI Express"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Commercial Payment Terms</label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={e => setPaymentTerms(e.target.value)}
                      placeholder="e.g. 50% Advance RTGS, Balance against LR"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-800 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 text-xs">Special Instructions / Target Delivery Timeline</label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={e => setClientNotes(e.target.value)}
                    placeholder="Mention any custom packaging requirements, festive delivery urgency, or preferred local transporter..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Cost Summary & Action Card */}
            <div className="lg:col-span-4">
              <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 sticky top-28 border border-white/80">
                <h3 className="font-serif font-bold text-lg text-[#102B20] pb-3 border-b border-slate-200/60">
                  Commercial Quotation Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Ex-Mill Subtotal:</span>
                    <span className="font-bold text-[#102B20]">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Applicable GST (5% Edible Oil):</span>
                    <span className="font-bold text-emerald-800">
                      ₹{Math.round(cartGstEstimate).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Transporter Freight:</span>
                    <span className="font-bold text-[#102B20]">
                      {freightCharge > 0 ? `₹${freightCharge.toLocaleString('en-IN')}` : 'Ex-Mill (₹0)'}
                    </span>
                  </div>

                  <div className="border-t border-slate-200/60 pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-sm text-[#102B20] block">Estimated Proforma Total</span>
                      <span className="text-[10px] text-slate-400">Subject to daily seed mandi index</span>
                    </div>
                    <span className="font-serif font-black text-2xl text-[#C49A32]">
                      ₹{Math.round(grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 text-[11px] text-slate-600 space-y-1.5 shadow-xs">
                  <div className="flex items-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#102B20] shrink-0 mt-0.5" />
                    <span>Quotation submitted here directly creates an entry in the mill dispatch queue.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#102B20] shrink-0 mt-0.5" />
                    <span>Works manager reviews and responds with verified dispatch date.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-sm tracking-wide shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer border border-white/20"
                >
                  <span>Submit Official Quotation Request</span>
                  <ArrowRight className="w-4 h-4 text-[#E5A000] group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[10px] text-center text-slate-500">
                  No payment required right now. Quotation and proforma invoice will be delivered to your account.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
