import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuotationOrOrder, OrderStatus } from '../../types';
import { StatusBadge } from '../../components/common/Badge';
import {
  Truck,
  CheckCircle2,
  Search,
  X
} from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { quotations, updateQuotationStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeOrder, setActiveOrder] = useState<QuotationOrOrder | null>(null);

  // Dispatch details modal state
  const [targetStatus, setTargetStatus] = useState<OrderStatus>('Dispatched');
  const [transporterName, setTransporterName] = useState('VRL Logistics Ltd');
  const [lrNumber, setLrNumber] = useState('VRL-ALW-992140');
  const [vehicleNumber, setVehicleNumber] = useState('RJ-02-GB-8841');
  const [dispatchDate, setDispatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [estimatedArrival, setEstimatedArrival] = useState(
    new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0]
  );
  const [dispatchRemarks, setDispatchRemarks] = useState(
    'Consignment loaded with security seals. Driver mobile: +91 90572 92529. Transit insurance covered under Mill Policy.'
  );
  const [millNotes, setMillNotes] = useState('');

  const filteredOrders = quotations.filter(q => {
    const matchesSearch =
      (q.orderNumber && q.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || q.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDispatchModal = (order: QuotationOrOrder) => {
    setActiveOrder(order);
    setTargetStatus(
      order.status === 'Confirmed'
        ? 'Processing'
        : order.status === 'Processing'
        ? 'Dispatched'
        : order.status === 'Dispatched'
        ? 'Delivered'
        : order.status
    );
    if (order.dispatchDetails) {
      setTransporterName(order.dispatchDetails.transporterName);
      setLrNumber(order.dispatchDetails.lrNumber);
      setVehicleNumber(order.dispatchDetails.vehicleNumber);
      setDispatchRemarks(order.dispatchDetails.remarks);
    } else {
      setLrNumber(`LR-${order.destinationCity.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`);
    }
    setMillNotes(order.millNotes || '');
  };

  const handleSaveDispatchUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;

    const dispatchDetails =
      targetStatus === 'Dispatched' || targetStatus === 'Delivered'
        ? {
            transporterName,
            lrNumber,
            vehicleNumber,
            dispatchDate,
            estimatedArrival,
            remarks: dispatchRemarks
          }
        : activeOrder.dispatchDetails;

    updateQuotationStatus(activeOrder.id, targetStatus, {
      millNotes,
      dispatchDetails
    });

    alert(`Order ${activeOrder.orderNumber || activeOrder.quoteNumber} status updated to "${targetStatus}"!`);
    setActiveOrder(null);
  };

  const allStatuses: (OrderStatus | 'All')[] = [
    'All',
    'Requested',
    'Quotation Sent',
    'Confirmed',
    'Processing',
    'Dispatched',
    'Delivered',
    'Cancelled'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-forest-950">
              Orders Fulfillment & Dispatch Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Update factory packaging progress, assign Lorry Receipts (LR), and record transport vehicle dispatches.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-forest-950 bg-forest-50 px-3 py-1.5 rounded-xl border border-forest-200">
              Total Orders in Pipeline: {quotations.length}
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order #, Quote #, Company Name, or Mandi City..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 bg-cream-50"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto text-xs">
            {allStatuses.map(st => (
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

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Order / Quote #</th>
                <th className="p-4">Wholesaler Entity</th>
                <th className="p-4">Destination Mandi</th>
                <th className="p-4">Consignment Quantities</th>
                <th className="p-4">Status</th>
                <th className="p-4">Transporter LR Info</th>
                <th className="p-4 text-right">Value (₹)</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-cream-50/70 transition">
                  <td className="p-4 font-bold text-forest-950 font-serif">
                    <div>{order.orderNumber || order.quoteNumber}</div>
                    <span className="text-[10px] text-slate-400 font-sans font-normal">
                      {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </td>

                  <td className="p-4 text-slate-800 font-semibold">
                    <div>{order.companyName}</div>
                    <span className="text-[10px] text-slate-400 font-normal block">
                      {order.contactPerson} • {order.phone}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">
                    <span className="font-semibold text-slate-800 block">
                      {order.destinationCity}, {order.destinationState}
                    </span>
                    <span className="text-[10px] text-slate-400">{order.deliveryType}</span>
                  </td>

                  <td className="p-4 text-slate-700">
                    <div className="font-bold">{order.items.length} Product Line(s)</div>
                    <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                      {order.items.map(i => `${i.quantity} ${i.unitLabel}`).join(', ')}
                    </div>
                  </td>

                  <td className="p-4">
                    <StatusBadge status={order.status} size="sm" />
                  </td>

                  <td className="p-4">
                    {order.dispatchDetails ? (
                      <div className="text-[11px]">
                        <strong className="text-cyan-900 block font-mono">
                          {order.dispatchDetails.lrNumber}
                        </strong>
                        <span className="text-slate-500 text-[10px]">
                          {order.dispatchDetails.transporterName} ({order.dispatchDetails.vehicleNumber})
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">No LR assigned yet</span>
                    )}
                  </td>

                  <td className="p-4 text-right font-bold text-forest-950">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDispatchModal(order)}
                      className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs transition shadow-xs inline-flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Update Status / LR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Status Update Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-cream-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-start border-b border-cream-200 pb-4">
              <div>
                <span className="text-[10px] font-bold text-mustard-600 uppercase tracking-widest block">
                  Consignment Dispatch Control
                </span>
                <h3 className="font-serif font-black text-2xl text-forest-950">
                  Update Status: {activeOrder.orderNumber || activeOrder.quoteNumber}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distributor: <strong>{activeOrder.companyName}</strong> • Destination: {activeOrder.destinationCity}, {activeOrder.destinationState}
                </p>
              </div>
              <button
                onClick={() => setActiveOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDispatchUpdate} className="space-y-5 text-xs">
              {/* Order Status Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Consignment Status *
                </label>
                <select
                  value={targetStatus}
                  onChange={e => setTargetStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 font-bold text-sm bg-cream-50 text-forest-950"
                >
                  <option value="Requested">Requested (Awaiting Quotation)</option>
                  <option value="Quotation Sent">Quotation Sent (Waiting Wholesaler Confirmation)</option>
                  <option value="Confirmed">Confirmed (Advance Realized / Order Booked)</option>
                  <option value="Processing">Processing (Packaging Lines & Tanker Loading Active)</option>
                  <option value="Dispatched">Dispatched (Transporter LR Issued & En Route)</option>
                  <option value="Delivered">Delivered (Received at Consignee Godown)</option>
                  <option value="Cancelled">Cancelled (Order Voided)</option>
                </select>
              </div>

              {/* Show Lorry Receipt Details if moving to Dispatched or Delivered */}
              {(targetStatus === 'Dispatched' || targetStatus === 'Delivered') && (
                <div className="bg-cyan-50/70 p-5 rounded-2xl border border-cyan-200 space-y-4">
                  <h4 className="font-bold text-cyan-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-cyan-700" />
                    <span>Lorry Receipt (LR) & Transporter Dispatch Entry</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Commercial Transporter Name *</label>
                      <input
                        type="text"
                        required
                        value={transporterName}
                        onChange={e => setTransporterName(e.target.value)}
                        placeholder="e.g. VRL Logistics, TCI Express, ARC Freight"
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Lorry Receipt (LR) Bilty Number *</label>
                      <input
                        type="text"
                        required
                        value={lrNumber}
                        onChange={e => setLrNumber(e.target.value)}
                        placeholder="e.g. VRL-ALW-992140"
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Vehicle / Truck Registration Number *</label>
                      <input
                        type="text"
                        required
                        value={vehicleNumber}
                        onChange={e => setVehicleNumber(e.target.value)}
                        placeholder="e.g. RJ-02-GB-8841"
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-mono font-bold uppercase"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Dispatch Date</label>
                      <input
                        type="date"
                        value={dispatchDate}
                        onChange={e => setDispatchDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Estimated Arrival at Destination</label>
                      <input
                        type="date"
                        value={estimatedArrival}
                        onChange={e => setEstimatedArrival(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Transit Remarks & Driver Contact</label>
                      <input
                        type="text"
                        value={dispatchRemarks}
                        onChange={e => setDispatchRemarks(e.target.value)}
                        placeholder="Driver mobile number, tare weighbridge certificate, seal numbers..."
                        className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mill Operational Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Internal Factory Log / Consignment Remarks
                </label>
                <textarea
                  rows={2}
                  value={millNotes}
                  onChange={e => setMillNotes(e.target.value)}
                  placeholder="e.g. Loaded from Alwar Mill Unit 1. Batch Certificate #KG-2026-OCT-18 verified."
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-cream-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-mustard-400" />
                  <span>Update Order Pipeline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
