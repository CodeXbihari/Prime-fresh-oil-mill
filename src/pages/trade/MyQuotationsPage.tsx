import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuotationOrOrder } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import {
  FileText,
  Truck,
  Eye,
  CheckCircle2,
  Printer,
  Calendar,
  Building,
  X,
  AlertCircle
} from 'lucide-react';

export const MyQuotationsPage: React.FC = () => {
  const { quotations, user, acceptQuotationByDistributor } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeModalQuote, setActiveModalQuote] = useState<QuotationOrOrder | null>(null);

  // Filter for currently logged in distributor
  const userQuotes = quotations.filter(q => {
    if (user.distributorInfo?.companyName) {
      return (
        q.companyName.toLowerCase().includes(user.distributorInfo.companyName.toLowerCase()) ||
        q.distributorId === user.distributorInfo.id ||
        true
      );
    }
    return true;
  });

  const filteredQuotes = userQuotes.filter(q => {
    if (selectedStatus === 'All') return true;
    return q.status === selectedStatus;
  });

  const statusFilters = [
    'All',
    'Requested',
    'Quotation Sent',
    'Confirmed',
    'Processing',
    'Dispatched',
    'Delivered',
    'Cancelled'
  ];

  const handleAcceptQuote = (id: string) => {
    if (window.confirm('Do you want to accept this quotation and confirm production booking?')) {
      acceptQuotationByDistributor(id);
      if (activeModalQuote && activeModalQuote.id === id) {
        setActiveModalQuote(prev => (prev ? { ...prev, status: 'Confirmed' } : null));
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen ambient-glass-canvas py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Distributor Portal</span>
              <span>/</span>
              <span className="text-[#2D2418] font-bold">Consignments &amp; Quotes</span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#2D2418]">
              My Quotations &amp; Order History
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Track quotation approvals, factory production batches, and transporter Lorry Receipts (LR).
            </p>
          </div>

          <div className="glass-panel rounded-2xl px-4 py-2 shadow-xs flex items-center gap-3 text-xs">
            <Building className="w-4 h-4 text-[#C49A32] shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Account</span>
              <span className="font-bold text-[#2D2418]">
                {user.distributorInfo?.companyName || 'Shree Balaji Agro Traders'}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs">
          {statusFilters.map(status => {
            const count = status === 'All' ? userQuotes.length : userQuotes.filter(q => q.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3.5 py-2 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-[#C49A32] text-white shadow-md border border-white/40'
                    : 'glass-panel hover:bg-white/90 text-slate-700'
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedStatus === status ? 'bg-white/30 text-white' : 'bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quotations & Orders List */}
        {filteredQuotes.length > 0 ? (
          <div className="space-y-4">
            {filteredQuotes.map(order => (
              <div
                key={order.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 shadow-md transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left: Numbers, Date & Status */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-serif font-black text-lg text-[#2D2418]">
                      {order.quoteNumber}
                    </span>
                    {order.orderNumber && (
                      <span className="text-xs font-bold text-[#2D2418] bg-white/70 px-2 py-0.5 rounded-md border border-white/80 shadow-xs">
                        Ord: {order.orderNumber}
                      </span>
                    )}
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.deliveryType} to {order.destinationCity}, {order.destinationState}</span>
                    </span>
                  </div>

                  {/* Line Item Preview */}
                  <div className="text-xs text-slate-700 pt-1">
                    <span className="font-semibold text-[#2D2418]">
                      {order.items.length} Pack Line(s):{' '}
                    </span>
                    <span className="text-slate-600">
                      {order.items.map(i => `${i.quantity} ${i.unitLabel} ${i.productName.split('-')[0]}`).join(', ')}
                    </span>
                  </div>

                  {/* Dispatch Lorry Receipt Callout if available */}
                  {order.dispatchDetails && (
                    <div className="bg-cyan-50/80 backdrop-blur-sm border border-cyan-200 rounded-xl p-2.5 text-xs text-cyan-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-cyan-700 shrink-0" />
                      <span>
                        LR #: <strong>{order.dispatchDetails.lrNumber}</strong> via {order.dispatchDetails.transporterName} (Truck: {order.dispatchDetails.vehicleNumber})
                      </span>
                    </div>
                  )}

                  {/* Special Callout if Quotation Sent & Waiting Acceptance */}
                  {order.status === 'Quotation Sent' && (
                    <div className="bg-purple-50/80 backdrop-blur-sm border border-purple-200 rounded-xl p-2.5 text-xs text-purple-900 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-purple-700 shrink-0" />
                        <span>Quotation prepared by mill! Special wholesale rate active for 48 hours.</span>
                      </div>
                      <button
                        onClick={() => handleAcceptQuote(order.id)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg text-xs shrink-0 transition cursor-pointer"
                      >
                        Accept &amp; Book Production
                      </button>
                    </div>
                  )}
                </div>

                {/* Right: Commercial Total & View Details Button */}
                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200/50">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Commercial Value</span>
                    <span className="font-serif font-black text-xl text-[#2D2418] block">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (Includes 5% Edible GST)
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveModalQuote(order)}
                    className="px-4 py-2.5 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer border border-white/20"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Proforma</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title={`No Orders with Status "${selectedStatus}"`}
            description="You do not have any quotation requests or consignments under this status filter."
            actionText="View All Consignments"
            onActionClick={() => setSelectedStatus('All')}
          />
        )}

        {/* Detailed Modal / Proforma View */}
        {activeModalQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="glass-panel rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/80 shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 bg-[#2D2418] text-white rounded-t-3xl flex items-center justify-between border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black text-xl text-[#FFF8E8]">
                      {activeModalQuote.quoteNumber}
                    </span>
                    <StatusBadge status={activeModalQuote.status} />
                  </div>
                  <p className="text-xs text-[#E5A000] mt-0.5">
                    Proforma Invoice / Mill Quotation Sheet
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition cursor-pointer"
                    title="Print Proforma"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveModalQuote(null)}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Progress Pipeline Bar */}
              <div className="px-6 py-4 bg-white/40 border-b border-slate-200/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Consignment Status Flow
                </span>
                <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-semibold">
                  {[
                    'Requested',
                    'Quotation Sent',
                    'Confirmed',
                    'Processing',
                    'Dispatched',
                    'Delivered'
                  ].map((step, idx) => {
                    const stepOrder = ['Requested', 'Quotation Sent', 'Confirmed', 'Processing', 'Dispatched', 'Delivered'];
                    const currentIdx = stepOrder.indexOf(activeModalQuote.status);
                    const isCompleted = currentIdx >= idx;
                    const isCurrent = activeModalQuote.status === step;

                    return (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-[11px] font-bold ${
                            isCurrent
                              ? 'bg-[#C49A32] text-white ring-2 ring-[#C49A32]'
                              : isCompleted
                              ? 'bg-[#2D2418] text-[#FFF8E8]'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span className={`truncate w-full ${isCurrent ? 'font-bold text-[#2D2418]' : 'text-slate-500'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 text-xs">
                {/* Mill & Distributor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-200/60">
                  <div className="flex gap-3 items-start">
                    <img
                      src="/images/logo.jpg"
                      alt="Prime Fresh Oil Mills"
                      className="w-14 h-14 object-contain rounded-xl border border-white/80 shrink-0 bg-white p-1 shadow-xs"
                    />
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[10px]">Manufacturer Mill Gate</span>
                      <strong className="text-[#2D2418] font-serif text-sm block">PRIME FRESH OIL MILLS</strong>
                      <p className="text-slate-600 mt-0.5">
                        Matsya Industrial Area, Alwar, Rajasthan - 301030
                      </p>
                      <p className="text-slate-600">GSTIN: 08AAAFP8901L1ZG | CIN: U15142RJ2018PTC061294</p>
                      <p className="text-slate-600">Trade Helpline: +91 90572 92529</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block uppercase font-bold text-[10px]">Wholesaler / Consignee</span>
                    <strong className="text-[#2D2418] font-serif text-sm block">{activeModalQuote.companyName}</strong>
                    <p className="text-slate-600 mt-0.5">Contact: {activeModalQuote.contactPerson} ({activeModalQuote.phone})</p>
                    <p className="text-slate-600">Delivery Address: {activeModalQuote.shippingAddress}</p>
                    <p className="text-slate-600">
                      Destination: {activeModalQuote.destinationCity}, {activeModalQuote.destinationState} - {activeModalQuote.pincode}
                    </p>
                    <p className="text-slate-600">GSTIN: {activeModalQuote.gstin || 'Unregistered / Pending'}</p>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <h4 className="font-bold text-[#2D2418] uppercase tracking-wider mb-2">
                    Commercial Mustard Oil SKUs
                  </h4>
                  <div className="border border-white/80 rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left">
                      <thead className="bg-white/60 text-[#2D2418] uppercase text-[10px] font-bold">
                        <tr>
                          <th className="p-3">Packaging Description</th>
                          <th className="p-3 text-center">Quantity</th>
                          <th className="p-3 text-right">Quoted Ex-Mill Rate</th>
                          <th className="p-3 text-right">5% GST</th>
                          <th className="p-3 text-right">Line Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/50 bg-white/40">
                        {activeModalQuote.items.map((item, idx) => {
                          const rate = item.quotedPricePerUnit || item.targetPricePerUnit || 0;
                          const lineSub = rate * item.quantity;
                          const lineGst = lineSub * 0.05;
                          return (
                            <tr key={idx} className="hover:bg-white/60">
                              <td className="p-3 font-semibold text-[#2D2418]">
                                <div>{item.productName}</div>
                                <span className="text-[10px] text-slate-500">{item.packaging}</span>
                              </td>
                              <td className="p-3 text-center font-bold">
                                {item.quantity} {item.unitLabel}
                              </td>
                              <td className="p-3 text-right">
                                ₹{rate.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 text-right text-emerald-800">
                                ₹{Math.round(lineGst).toLocaleString('en-IN')}
                              </td>
                              <td className="p-3 text-right font-bold text-[#2D2418]">
                                ₹{Math.round(lineSub + lineGst).toLocaleString('en-IN')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="flex justify-end">
                  <div className="w-72 space-y-1.5 bg-white/60 p-4 rounded-2xl border border-white/80 shadow-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Ex-Mill Subtotal:</span>
                      <span className="font-bold text-[#2D2418]">
                        ₹{activeModalQuote.subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Edible Oil GST (5%):</span>
                      <span className="font-bold text-emerald-800">
                        ₹{Math.round(activeModalQuote.gstAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Transporter Freight:</span>
                      <span className="font-bold text-[#2D2418]">
                        {activeModalQuote.freightCharges > 0
                          ? `₹${activeModalQuote.freightCharges.toLocaleString('en-IN')}`
                          : 'Ex-Mill Pickup (₹0)'}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2 flex justify-between font-bold text-sm">
                      <span className="text-[#2D2418]">Total Payable:</span>
                      <span className="text-[#C49A32] font-serif font-black text-base">
                        ₹{Math.round(activeModalQuote.totalAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dispatch Details if already shipped */}
                {activeModalQuote.dispatchDetails && (
                  <div className="bg-cyan-50/80 border border-cyan-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-900 font-bold text-xs uppercase tracking-wider">
                      <Truck className="w-4 h-4 text-cyan-700" />
                      <span>Transporter Lorry Receipt &amp; Dispatch Record</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">LR Number:</span>
                        <strong className="text-[#2D2418]">{activeModalQuote.dispatchDetails.lrNumber}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Transporter:</span>
                        <strong className="text-[#2D2418]">{activeModalQuote.dispatchDetails.transporterName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Vehicle Number:</span>
                        <strong className="text-[#2D2418]">{activeModalQuote.dispatchDetails.vehicleNumber}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Dispatch Date:</span>
                        <strong className="text-[#2D2418]">
                          {new Date(activeModalQuote.dispatchDetails.dispatchDate).toLocaleDateString('en-IN')}
                        </strong>
                      </div>
                    </div>
                    {activeModalQuote.dispatchDetails.remarks && (
                      <p className="text-[11px] text-slate-600 pt-1 border-t border-cyan-200/80">
                        Remarks: {activeModalQuote.dispatchDetails.remarks}
                      </p>
                    )}
                  </div>
                )}

                {/* Mill Notes */}
                {activeModalQuote.millNotes && (
                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong>Mill Dispatch Remarks:</strong> {activeModalQuote.millNotes}
                  </div>
                )}

                {/* Action buttons inside modal */}
                <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-slate-200/60">
                  <span className="text-[11px] text-slate-500">
                    Payment Terms: {activeModalQuote.paymentTerms}
                  </span>

                  <div className="flex gap-2">
                    {activeModalQuote.status === 'Quotation Sent' && (
                      <button
                        onClick={() => handleAcceptQuote(activeModalQuote.id)}
                        className="px-5 py-2.5 rounded-xl bg-[#C49A32] hover:bg-[#B38927] text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer border border-white/20"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Accept &amp; Confirm Production</span>
                      </button>
                    )}
                    <button
                      onClick={() => setActiveModalQuote(null)}
                      className="px-5 py-2.5 rounded-xl glass-panel hover:bg-white text-[#2D2418] font-bold text-xs transition cursor-pointer shadow-xs"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
