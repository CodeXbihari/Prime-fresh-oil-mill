import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
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
      <div className="min-h-screen bg-cream-50/60 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-cream-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-mustard-600 uppercase tracking-widest block mb-1">
              Quotation Request Transmitted
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Quotation Ref: {submittedQuoteNumber}
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your bulk order requirements have been received directly at our mill dispatch desk. The works manager will review today's seed index and issue a proforma invoice.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl p-5 border border-cream-200 text-left text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Distributor / Firm:</span>
              <strong className="text-forest-950">{companyName}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Destination:</span>
              <span className="font-bold text-forest-950">{destinationCity}, {destinationState}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Fulfillment Logistics:</span>
              <span className="font-bold text-forest-950">{deliveryType}</span>
            </div>
            <div className="flex justify-between text-slate-600 border-t border-cream-300 pt-2 font-bold text-sm">
              <span>Indicative Amount:</span>
              <span className="text-mustard-700">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/portal/my-orders"
              className="px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm shadow transition"
            >
              Track in My Orders & Quotations
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold text-sm transition"
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
      <div className="min-h-screen bg-cream-50/60 py-16 px-4">
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
    <div className="min-h-screen bg-cream-50/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-forest-950">
              Wholesale Bulk Order Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Review commercial line items, quantities, and specify delivery destination terms.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 self-start sm:self-auto"
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
              <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-cream-100/60 border-b border-cream-200 flex justify-between items-center text-xs font-bold text-forest-950 uppercase tracking-wider">
                  <span>Selected Wholesale SKUs ({cart.length})</span>
                  <span>Minimum Order Quantity Check</span>
                </div>

                <div className="divide-y divide-cream-100">
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
                      <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover bg-cream-100 shrink-0 border border-cream-200"
                          />
                          <div>
                            <span className="text-[10px] font-bold text-mustard-700 uppercase tracking-wider block">
                              {item.product.packaging}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-forest-950">
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
                          <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 overflow-hidden text-xs">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 10)}
                              className="px-2.5 py-1.5 hover:bg-cream-200 font-bold text-slate-700 transition"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center font-bold text-forest-950 bg-transparent py-1 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 10)}
                              className="px-2.5 py-1.5 hover:bg-cream-200 font-bold text-slate-700 transition"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[100px]">
                            <span className="text-sm font-bold text-forest-950 block">
                              ₹{lineSubtotal.toLocaleString('en-IN')}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[11px] text-rose-500 hover:text-rose-700 hover:underline mt-0.5"
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
              <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm space-y-5">
                <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-mustard-600" />
                  <span>Logistics & Delivery Destination</span>
                </h3>

                {/* Delivery Type Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      deliveryType === 'Door Delivery (Transporter)'
                        ? 'bg-mustard-50/60 border-mustard-500 ring-1 ring-mustard-400'
                        : 'bg-white border-cream-200 hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Door Delivery (Transporter)'}
                      onChange={() => setDeliveryType('Door Delivery (Transporter)')}
                      className="mt-1 text-mustard-600 focus:ring-mustard-500"
                    />
                    <div>
                      <strong className="text-forest-950 text-sm block">Door Delivery via Transporter</strong>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mill arranges dedicated cargo truck or part-load lorry receipt (LR) delivery to your city godown.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      deliveryType === 'Ex-Mill (Pickup from Mill)'
                        ? 'bg-mustard-50/60 border-mustard-500 ring-1 ring-mustard-400'
                        : 'bg-white border-cream-200 hover:bg-cream-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Ex-Mill (Pickup from Mill)'}
                      onChange={() => setDeliveryType('Ex-Mill (Pickup from Mill)')}
                      className="mt-1 text-mustard-600 focus:ring-mustard-500"
                    />
                    <div>
                      <strong className="text-forest-950 text-sm block">Ex-Mill Factory Gate Collection</strong>
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
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                  />
                </div>
              </div>

              {/* Distributor Business Credentials */}
              <div className="bg-white rounded-2xl border border-cream-200 p-6 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
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
                    <label className="block font-bold text-slate-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={e => setContactPerson(e.target.value)}
                      placeholder="e.g. Rajesh Agrawal"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. trade@distributor.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GSTIN (Optional at quote stage)</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={e => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 09AAACB2041D1Z4"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Commercial Payment Terms</label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={e => setPaymentTerms(e.target.value)}
                      placeholder="e.g. 50% Advance RTGS, Balance against LR"
                      className="w-full px-3.5 py-2 rounded-xl border border-cream-300 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Cost Summary & Action Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-cream-200 p-6 shadow-md space-y-5 sticky top-28">
                <h3 className="font-serif font-bold text-lg text-forest-950 pb-3 border-b border-cream-200">
                  Commercial Quotation Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Ex-Mill Subtotal:</span>
                    <span className="font-bold text-forest-950">
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
                    <span className="font-bold text-forest-950">
                      {freightCharge > 0 ? `₹${freightCharge.toLocaleString('en-IN')}` : 'Ex-Mill (₹0)'}
                    </span>
                  </div>

                  <div className="border-t border-cream-200 pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-sm text-forest-950 block">Estimated Proforma Total</span>
                      <span className="text-[10px] text-slate-400">Subject to daily seed mandi index</span>
                    </div>
                    <span className="font-serif font-black text-2xl text-mustard-700">
                      ₹{Math.round(grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="bg-cream-50 p-3.5 rounded-xl border border-cream-200 text-[11px] text-slate-600 space-y-1.5">
                  <div className="flex items-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
                    <span>Quotation submitted here directly creates an entry in the mill dispatch queue.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-forest-800 shrink-0 mt-0.5" />
                    <span>Works manager reviews and responds with verified dispatch date.</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 group"
                >
                  <span>Submit Official Quotation Request</span>
                  <ArrowRight className="w-4 h-4 text-mustard-400 group-hover:translate-x-1 transition-transform" />
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
