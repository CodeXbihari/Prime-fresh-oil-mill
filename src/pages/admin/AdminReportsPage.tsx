import React from 'react';
import { SALES_REPORT_METRICS } from '../../data/mockData';
import {
  TrendingUp,
  Package,
  MapPin,
  Printer,
  Download
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { monthlyDispatchVolumeMT, packWiseDistribution, stateWiseWholesaleDemand, millOperationStats } =
    SALES_REPORT_METRICS;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Pack Size,Share %,Volume Litres,Revenue Share\n' +
      packWiseDistribution.map(e => `"${e.packType}",${e.sharePercent}%,"${e.volumeLitres}","${e.revenueShare}"`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'PrimeFresh_PackDistribution_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Executive Works Portal</span>
            <span>/</span>
            <span className="text-forest-900 font-bold">Production & Sales Analytics</span>
          </div>
          <h2 className="font-serif font-black text-2xl text-forest-950">
            Wholesale Oil Extraction & Mandi Dispatch Reports
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive production metrics, pack size distribution, and interstate wholesale demand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-950 font-bold text-xs border border-cream-300 transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-forest-800" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-mustard-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Daily Crushing
          </span>
          <span className="font-serif font-black text-2xl text-forest-950 block mt-1">
            {millOperationStats.dailySeedCrushingCapMT} MT
          </span>
          <span className="text-[10px] text-slate-500">Brassica Mustard Seeds</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Daily Oil Extraction
          </span>
          <span className="font-serif font-black text-2xl text-forest-950 block mt-1">
            {millOperationStats.dailyOilExtractionYieldLtr.toLocaleString('en-IN')} L
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">Cold Ghani Extraction</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Press Efficiency
          </span>
          <span className="font-serif font-black text-2xl text-forest-950 block mt-1">
            {millOperationStats.pureGhaniColdPressEfficiency}
          </span>
          <span className="text-[10px] text-slate-500">Mechanized Wood Ghanis</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Seed Silo Inventory
          </span>
          <span className="font-serif font-black text-2xl text-forest-950 block mt-1">
            {millOperationStats.currentSiloMustardSeedStockMT.toLocaleString('en-IN')} MT
          </span>
          <span className="text-[10px] text-slate-500">Alwar & Bharatpur Seeds</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-xs col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Lab Batch Pass Rate
          </span>
          <span className="font-serif font-black text-2xl text-emerald-800 block mt-1">
            {millOperationStats.laboratoryQualityPassRate}
          </span>
          <span className="text-[10px] text-slate-500">Agmark Grade-1 Standard</span>
        </div>
      </div>

      {/* Grid: Monthly Volume Trend & Pack Size Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Monthly Dispatch Volume Trend */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-cream-200 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-mustard-600" />
                <span>Monthly Crushing & Dispatch Trend (2026)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Metric Tonnes (MT) crushed and dispatched from Alwar facility
              </p>
            </div>
            <span className="text-xs font-bold text-forest-900 bg-mustard-100 px-2.5 py-1 rounded-lg">
              +54% Festive Growth
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4 pt-2">
            {monthlyDispatchVolumeMT.map(item => {
              const maxVol = 1200;
              const widthPct = Math.min(100, Math.round((item.volumeMT / maxVol) * 100));

              return (
                <div key={item.month} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.month}</span>
                    <div className="flex gap-3">
                      <span className="text-slate-500">₹{item.valueInLakhs} Lakhs</span>
                      <strong className="text-forest-950">{item.volumeMT} MT</strong>
                    </div>
                  </div>
                  <div className="h-4 bg-cream-100 rounded-full overflow-hidden border border-cream-200 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-forest-800 to-mustard-500 rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pack Size Distribution */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-cream-200 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="border-b border-cream-200 pb-4">
            <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
              <Package className="w-5 h-5 text-mustard-600" />
              <span>Packaging SKU Volume Share</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of total liquid mustard oil packaged by format
            </p>
          </div>

          <div className="space-y-4">
            {packWiseDistribution.map(pack => (
              <div key={pack.packType} className="p-3 rounded-xl bg-cream-50/70 border border-cream-200 text-xs">
                <div className="flex justify-between items-center mb-1.5">
                  <strong className="text-forest-950">{pack.packType}</strong>
                  <span className="font-black text-mustard-700 font-serif text-sm">
                    {pack.sharePercent}%
                  </span>
                </div>
                <div className="h-2 bg-cream-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-forest-900 rounded-full"
                    style={{ width: `${pack.sharePercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Volume: {pack.volumeLitres}</span>
                  <span>Revenue Contribution: {pack.revenueShare}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State-Wise Wholesale Demand Table */}
      <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="border-b border-cream-200 pb-4">
          <h3 className="font-serif font-bold text-lg text-forest-950 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-mustard-600" />
            <span>State-Wise Wholesale Demand & Primary Mandi Hubs</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Territorial consumption pattern across Northern, Eastern and Central India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateWiseWholesaleDemand.map(st => (
            <div key={st.state} className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-base text-forest-950">{st.state}</h4>
                <span className="px-2 py-0.5 rounded-full bg-forest-900 text-cream-50 font-bold text-[11px]">
                  {st.share} Share
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Key Wholesale Mandis</span>
                <p className="text-slate-700 font-semibold">{st.keyMandis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
