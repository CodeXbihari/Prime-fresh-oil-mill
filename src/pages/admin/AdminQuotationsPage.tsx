import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { QuotationOrOrder } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import {
  FileText,
  Send,
  Clock,
  Search,
  X
} from 'lucide-react';

export const AdminQuotationsPage: React.FC = () => {
  const { quotations, updateQuotationStatus } = useApp();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeQuotation, setActiveQuotation] = useState<QuotationOrOrder | null>(null);

  // Preparation form state
  const [quotedRates, setQuotedRates] = useState<{ [productId: string]: number }>({});
  const [freightCharges, setFreightCharges] = useState<number>(12500);
  const [millNotes, setMillNotes] = useState('');
  const [validityDays, setValidityDays] = useState('48 Hours (Mandi Volatility Disclaimer)');

  // Auto-open modal if quoteId is in query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quoteId = params.get('quoteId');
    if (quoteId) {
      const found = quotations.find(q => q.id === quoteId);
      if (found) {
        handleOpenPrepare(found);
      }
    }
  }, [location.search, quotations]);

  const filteredQuotes = quotations.filter(q => {
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || q.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPrepare = (quote: QuotationOrOrder) => {
    setActiveQuotation(quote);
    const rates: { [id: string]: number } = {};
    quote.items.forEach(i => {
      rates[i.productId] = i.quotedPricePerUnit || i.targetPricePerUnit || 1950;
    });
    setQuotedRates(rates);
    setFreightCharges(quote.freightCharges || (quote.deliveryType === 'Door Delivery (Transporter)' ? 14000 : 0));
    setMillNotes(quote.millNotes || 'Special wholesale rate offered for immediate lifting. Laboratory test report enclosed.');
  };

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuotation) return;

    const updatedRates = Object.entries(quotedRates).map(([productId, rate]) => ({
      productId,
      rate
    }));

    updateQuotationStatus(activeQuotation.id, 'Quotation Sent', {
      freightCharges,
      millNotes: `${millNotes} [Validity: ${validityDays}]`,
      updatedItemRates: updatedRates
    });

    alert(`Formal Quotation ${activeQuotation.quoteNumber} has been issued and sent to ${activeQuotation.companyName}!`);
    setActiveQuotation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-forest-950">
              Quotation Review & Proforma Generation Desk
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review wholesaler product requests, verify daily seed mandi prices, and issue binding proforma quotes.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 text-xs text-amber-900 font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>{quotations.filter(q => q.status === 'Requested').length} Inquiries Pending Action</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by quote number (e.g. PFM-QT-2026), company name, city..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 bg-cream-50"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {['All', 'Requested', 'Quotation Sent', 'Confirmed', 'Processing', 'Dispatched'].map(st => (
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

      {/* Quotations Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Quote Number</th>
                <th className="p-4">Wholesale Distributor</th>
                <th className="p-4">Destination Mandi</th>
                <th className="p-4">Requested Line Items</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Indicative Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredQuotes.map(quote => (
                <tr key={quote.id} className="hover:bg-cream-50/70 transition">
                  <td className="p-4 font-bold text-forest-950 font-serif">
                    <div>{quote.quoteNumber}</div>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      {new Date(quote.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </td>

                  <td className="p-4 text-slate-800 font-semibold">
                    <div>{quote.companyName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {quote.contactPerson} ({quote.phone})
                    </div>
                  </td>

                  <td className="p-4 text-slate-600">
                    <div>{quote.destinationCity}, {quote.destinationState}</div>
                    <span className="text-[10px] text-slate-400">{quote.deliveryType}</span>
                  </td>

                  <td className="p-4 text-slate-700">
                    <span className="font-bold">{quote.items.length} Pack Line(s): </span>
                    <span className="text-[11px] text-slate-500">
                      {quote.items.map(i => `${i.quantity} ${i.unitLabel}`).join(', ')}
                    </span>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={quote.status} size="sm" />
                  </td>

                  <td className="p-4 text-right font-bold text-forest-950">
                    ₹{quote.totalAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenPrepare(quote)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition shadow-xs inline-flex items-center gap-1 ${
                        quote.status === 'Requested'
                          ? 'bg-mustard-500 hover:bg-mustard-400 text-forest-950 ring-1 ring-mustard-600'
                          : 'bg-forest-900 hover:bg-forest-800 text-cream-50'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{quote.status === 'Requested' ? 'Prepare Quote' : 'View / Edit Quote'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prepare Quotation Modal */}
      {activeQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-cream-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-cream-200 pb-4">
              <div>
                <span className="text-[10px] font-bold text-mustard-600 uppercase tracking-widest block">
                  Mill Works Proforma Preparation
                </span>
                <h3 className="font-serif font-black text-2xl text-forest-950">
                  Prepare Quotation: {activeQuotation.quoteNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Client: <strong>{activeQuotation.companyName}</strong> ({activeQuotation.destinationCity}, {activeQuotation.destinationState})
                </p>
              </div>
              <button
                onClick={() => setActiveQuotation(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuotation} className="space-y-6 text-xs">
              {/* Product items rate adjustment */}
              <div className="space-y-3">
                <h4 className="font-bold text-forest-950 uppercase tracking-wider">
                  Adjust Quoted Unit Ex-Mill Rates
                </h4>

                <div className="border border-cream-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Packaging SKU</th>
                        <th className="p-3 text-center">Quantity</th>
                        <th className="p-3 text-right">Quoted Unit Ex-Mill Rate (₹)</th>
                        <th className="p-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {activeQuotation.items.map(item => {
                        const currentRate = quotedRates[item.productId] ?? item.quotedPricePerUnit ?? item.targetPricePerUnit ?? 0;
                        const lineSub = currentRate * item.quantity;
                        return (
                          <tr key={item.productId} className="hover:bg-cream-50">
                            <td className="p-3 font-semibold text-forest-950">
                              <div>{item.productName}</div>
                              <span className="text-[10px] text-slate-500">{item.packaging}</span>
                            </td>
                            <td className="p-3 text-center font-bold">
                              {item.quantity} {item.unitLabel}
                            </td>
                            <td className="p-3 text-right">
                              <input
                                type="number"
                                value={currentRate}
                                onChange={e => {
                                  const val = parseInt(e.target.value) || 0;
                                  setQuotedRates(prev => ({ ...prev, [item.productId]: val }));
                                }}
                                className="w-24 px-2 py-1 text-right font-bold border border-cream-300 rounded-lg"
                              />
                            </td>
                            <td className="p-3 text-right font-bold text-forest-950">
                              ₹{lineSub.toLocaleString('en-IN')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Freight, Validity & Commercial Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-cream-50 p-4 rounded-2xl border border-cream-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Transporter Freight Charge (₹)
                  </label>
                  <input
                    type="number"
                    value={freightCharges}
                    onChange={e => setFreightCharges(parseInt(e.target.value) || 0)}
                    placeholder="Enter freight amount"
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Mode: {activeQuotation.deliveryType}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quotation Validity Window
                  </label>
                  <select
                    value={validityDays}
                    onChange={e => setValidityDays(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold bg-white"
                  >
                    <option value="48 Hours (Mandi Volatility Disclaimer)">48 Hours (Mandi Volatility Disclaimer)</option>
                    <option value="72 Hours Standard Validity">72 Hours Standard Validity</option>
                    <option value="7 Days Contract Lock-In">7 Days Contract Lock-In</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Mill Remarks & Dispatch Commitment
                  </label>
                  <textarea
                    rows={2}
                    value={millNotes}
                    onChange={e => setMillNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs bg-white"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-xs text-slate-500">
                  Submitting will mark status as <strong>"Quotation Sent"</strong> in the shared store.
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveQuotation(null)}
                    className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs shadow flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-mustard-400" />
                    <span>Send Formal Quotation to Distributor</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
