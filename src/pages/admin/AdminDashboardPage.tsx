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
  Clock,
  Activity,
  Flame
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { quotations, products, visitors } = useApp();

  const pendingQuotes = quotations.filter(q => q.status === 'Requested');
  const inProduction = quotations.filter(q => ['Confirmed', 'Processing'].includes(q.status));
  const activeDispatched = quotations.filter(q => q.status === 'Dispatched');
  const hotLeads = visitors.filter(v => v.leadCategory === 'Hot');

  // Total stock calculated from products
  const totalTinsInStock = products.reduce((sum, p) => sum + p.availableStock, 0);

  return (
    <div className="space-y-6">
      {/* KPI Cards Row — 5 evenly spaced cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Pending Quotations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
              Pending Quotations
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-slate-900">
              {pendingQuotes.length}
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-snug">
            Wholesale requests awaiting mandi rate & freight calculation
          </p>
          <Link
            to="/admin/quotations"
            className="text-xs font-bold text-slate-800 hover:text-amber-700 flex items-center gap-1 mt-3"
          >
            <span>Review Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* In Production / Processing */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
              In Crushing / Processing
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-slate-900">
              {inProduction.length}
            </span>
            <span className="text-xs text-blue-700 font-semibold">
              Active Orders
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-snug">
            Confirmed wholesale orders queued on packaging lines
          </p>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-slate-800 hover:text-blue-700 flex items-center gap-1 mt-3"
          >
            <span>View Production Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Consignments In Transit */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
              Dispatched In-Transit
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-slate-900">
              {activeDispatched.length}
            </span>
            <span className="text-xs text-cyan-700 font-semibold">
              LRs Assigned
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-snug">
            Consignments en route via VRL, TCI & road tankers
          </p>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-slate-800 hover:text-cyan-700 flex items-center gap-1 mt-3"
          >
            <span>Track Lorry Receipts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Finished Goods Inventory */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">
              Mill Finished Stock
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-slate-900">
              {totalTinsInStock.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">
              Units/Cases
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 leading-snug">
            Across 15L tins, 5L jars, retail bottles & drums
          </p>
          <Link
            to="/admin/products"
            className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1 mt-3"
          >
            <span>Manage Inventory & Rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hot Leads Intelligence Card */}
        <div className="bg-gradient-to-br from-rose-950 to-slate-900 text-white rounded-2xl p-5 border border-rose-800/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1 leading-tight">
              <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              <span>Hot Wholesale Leads</span>
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-black text-3xl text-rose-400">
              {hotLeads.length}
            </span>
            <span className="text-xs text-rose-200 font-semibold">
              High Buying Intent
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-2 leading-snug">
            {visitors.length} total tracked visitors across mandis &amp; stockists
          </p>
          <Link
            to="/admin/visitor-analytics"
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 mt-3"
          >
            <span>View Visitor Intelligence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Pending Quotations Action Queue & Live Inventory Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Pending Quotations Queue */}
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="truncate">Urgent Quotation Review Queue</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Incoming wholesale inquiries requiring verified mandi quotation
              </p>
            </div>
            <Link
              to="/admin/quotations"
              className="text-xs font-bold text-slate-800 hover:text-amber-700 flex items-center gap-1 shrink-0 ml-3"
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
                  className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-slate-900 text-sm font-serif">
                        {quote.quoteNumber}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                        {quote.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {quote.companyName} ({quote.destinationCity}, {quote.destinationState})
                    </p>
                    <p className="text-[11px] text-slate-600">
                      {quote.items.length} line item(s) • Est. ₹{quote.totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <Link
                    to={`/admin/quotations?quoteId=${quote.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition shrink-0"
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
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="min-w-0">
              <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="truncate">Pack Size Stock Availability</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Current factory godown levels & wholesale base rates
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-slate-800 hover:text-amber-700 shrink-0 ml-3"
            >
              Manage
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {products.map(prod => (
              <div key={prod.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
                    <img src={prod.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-slate-900 block truncate">
                      {prod.name.split('-')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500">{prod.packaging}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 block">
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
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="min-w-0">
            <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-slate-700 shrink-0" />
              <span className="truncate">Recent Consignment Dispatches & Mandi Deliveries</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live transit status with transporter LR numbers and vehicle allocation
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-xs font-bold text-slate-800 hover:text-amber-700 shrink-0"
          >
            Manage All Orders & Dispatches
          </Link>
        </div>

        <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 text-slate-800 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Consignment #</th>
                <th className="p-3">Distributor Firm</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Status</th>
                <th className="p-3">Transporter & LR Details</th>
                <th className="p-3 text-right rounded-r-lg">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotations.slice(0, 5).map(q => (
                <tr key={q.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 font-bold text-slate-900">
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
                  <td className="p-3 text-right font-bold text-slate-900">
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
