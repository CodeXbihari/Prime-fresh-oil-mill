import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/Badge';
import {
  FileText,
  Truck,
  Package,
  ArrowRight,
  Factory,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { quotations, products } = useApp();

  const pendingQuotes = quotations.filter(q => q.status === 'Requested');
  const inProduction = quotations.filter(q => ['Confirmed', 'Processing'].includes(q.status));
  const activeDispatched = quotations.filter(q => q.status === 'Dispatched');

  // Total stock calculated from products
  const totalTinsInStock = products.reduce((sum, p) => sum + p.availableStock, 0);

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Quotations */}
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pending Quotations
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-forest-950">
              {pendingQuotes.length}
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Wholesale requests awaiting mandi rate & freight calculation
          </p>
          <Link
            to="/admin/quotations"
            className="text-xs font-bold text-forest-900 hover:text-mustard-600 flex items-center gap-1 mt-3"
          >
            <span>Review Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* In Production / Processing */}
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              In Crushing / Processing
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Factory className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-forest-950">
              {inProduction.length}
            </span>
            <span className="text-xs text-blue-700 font-semibold">
              Active Orders
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Confirmed wholesale orders queued on packaging lines
          </p>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-forest-900 hover:text-mustard-600 flex items-center gap-1 mt-3"
          >
            <span>View Production Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Consignments In Transit */}
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dispatched In-Transit
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-forest-950">
              {activeDispatched.length}
            </span>
            <span className="text-xs text-cyan-700 font-semibold">
              LRs Assigned
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Consignments en route via VRL, TCI & road tankers
          </p>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-forest-900 hover:text-mustard-600 flex items-center gap-1 mt-3"
          >
            <span>Track Lorry Receipts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Finished Goods Inventory */}
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mill Finished Stock
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-forest-950">
              {totalTinsInStock.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">
              Units/Cases
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Across 15L tins, 5L jars, retail bottles & drums
          </p>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-forest-900 hover:text-mustard-600 flex items-center gap-1 mt-3"
          >
            <span>Manage Inventory & Rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Pending Quotations Action Queue & Live Inventory Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pending Quotations Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-cream-200 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Urgent Quotation Review Queue</span>
              </h2>
              <p className="text-xs text-slate-500">
                Incoming wholesale inquiries requiring verified mandi quotation
              </p>
            </div>
            <Link
              to="/admin/quotations"
              className="text-xs font-bold text-forest-900 hover:text-mustard-600 flex items-center gap-1"
            >
              <span>View All ({quotations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {pendingQuotes.length > 0 ? (
              pendingQuotes.map(quote => (
                <div
                  key={quote.id}
                  className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-forest-950 text-sm font-serif">
                        {quote.quoteNumber}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        {quote.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-forest-900">
                      {quote.companyName} ({quote.destinationCity}, {quote.destinationState})
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {quote.items.length} line item(s) • Est. ₹{quote.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <Link
                    to={`/admin/quotations?quoteId=${quote.id}`}
                    className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs shadow transition shrink-0"
                  >
                    Prepare Formal Quotation
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span>All quotation requests are currently processed and up-to-date!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Finished Goods Inventory Summary & Alerts */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-cream-200 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <div>
              <h2 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                <Package className="w-5 h-5 text-mustard-600" />
                <span>Pack Size Stock Availability</span>
              </h2>
              <p className="text-xs text-slate-500">
                Current factory godown levels & wholesale base rates
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-forest-900 hover:text-mustard-600"
            >
              Manage
            </Link>
          </div>

          <div className="divide-y divide-cream-100 text-xs">
            {products.map(prod => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-100 shrink-0 overflow-hidden border border-cream-200">
                    <img src={prod.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-forest-950 block truncate max-w-[180px]">
                      {prod.name.split('-')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500">{prod.packaging}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-forest-950 block">
                    {prod.availableStock} {prod.unitLabel}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ₹{prod.indicativePrice.toLocaleString('en-IN')}/{prod.unitLabel.replace(/s$/, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Dispatches & Consignments */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
              <Truck className="w-5 h-5 text-forest-800" />
              <span>Recent Consignment Dispatches & Mandi Deliveries</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live transit status with transporter LR numbers and vehicle allocation
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-bold text-forest-900 hover:text-mustard-600"
          >
            Manage All Orders & Dispatches
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Consignment #</th>
                <th className="p-3">Distributor Firm</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Status</th>
                <th className="p-3">Transporter & LR Details</th>
                <th className="p-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {quotations.slice(0, 5).map(q => (
                <tr key={q.id} className="hover:bg-cream-50">
                  <td className="p-3 font-bold text-forest-950">
                    <div>{q.orderNumber || q.quoteNumber}</div>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {new Date(q.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-800">
                    {q.companyName}
                  </td>
                  <td className="p-3 text-slate-600">
                    {q.destinationCity}, {q.destinationState}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={q.status} size="sm" />
                  </td>
                  <td className="p-3 text-slate-700">
                    {q.dispatchDetails ? (
                      <div>
                        <span className="font-bold text-cyan-900">
                          {q.dispatchDetails.lrNumber}
                        </span>
                        <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                          {q.dispatchDetails.transporterName} • {q.dispatchDetails.vehicleNumber}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Awaiting dispatch slot</span>
                    )}
                  </td>
                  <td className="p-3 text-right font-bold text-forest-950">
                    ₹{q.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
