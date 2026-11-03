import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/trade/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SEOHead } from '../../components/common/SEOHead';
import { Search, Filter, Info, PhoneCall } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedPackaging, setSelectedPackaging] = useState<string>('All');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.packaging.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade =
        selectedGrade === 'All' || product.grade === selectedGrade;

      const matchesPackaging =
        selectedPackaging === 'All' || product.packaging.includes(selectedPackaging);

      return matchesSearch && matchesGrade && matchesPackaging;
    });
  }, [products, searchTerm, selectedGrade, selectedPackaging]);

  const packagingOptions = [
    'All',
    '1 Litre',
    '15 Litre',
    '50 Kg',
    '40 Kg',
    '25 Kg',
    '200 Litre'
  ];

  const gradeOptions = [
    'All',
    'Kachi Ghani (Cold Pressed)',
    'Raw Agro Commodity',
    'Mustard Cake (By-Product Khali)'
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <SEOHead
        title="Wholesale Mustard Oil, Seeds & Khali Catalog | Bulk Packaging"
        description="Browse our wholesale catalog of Kachi Ghani cold pressed mustard oil, yellow & black mustard seeds, sesame oil, and cattle feed mustard cake (DOC). Available in 15L tins, HDPE drums, and bulk tankers."
        keywords="mustard oil catalog, 15L tin mustard oil price, bulk mustard oil drum, mustard cake khali, agro commodities wholesale, cold pressed oil distributor"
        canonicalPath="/products"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>Wholesale Supply</span>
            <span>/</span>
            <span className="text-[#102B20] font-bold">Product Catalog</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#102B20]">
                Wholesale Oilseeds, By-Products &amp; Agro Commodities
              </h1>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Direct factory gate wholesale pricing for stockists, grain merchants, and bulk institutional buyers. Machine-cleaned sortex purity, verified moisture, and lab certified quality.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <div className="bg-white border border-[#EBE7DD] rounded-xl px-3.5 py-2 text-xs text-slate-700 flex items-center gap-2 shadow-xs">
                <Info className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>Direct mill-gate rates updated daily</span>
              </div>
              <a
                href="tel:9057292529"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#102B20] hover:bg-[#1A3D2E] text-[#FFF8E8] font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E5A000]" />
                <span>Trade Desk: +91 90572 92529</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EBE7DD] shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by SKU, pack size (e.g. 15L Tin, 1L Pet, Drum), or grade..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-[#FAF8F5] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C49A32]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Grade Selector */}
            <div className="w-full md:w-64">
              <select
                value={selectedGrade}
                onChange={e => setSelectedGrade(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#FAF8F5] text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C49A32]"
              >
                {gradeOptions.map(g => (
                  <option key={g} value={g}>
                    {g === 'All' ? 'All Oil Grades' : g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Packaging Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1 text-[11px]">
              <Filter className="w-3.5 h-3.5" />
              <span>Pack Format:</span>
            </span>
            {packagingOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedPackaging(opt)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap cursor-pointer text-xs ${
                  selectedPackaging === opt
                    ? 'bg-[#102B20] text-[#FFF8E8] shadow-xs'
                    : 'bg-[#FAF8F5] text-slate-600 hover:bg-slate-200/70 border border-[#EBE7DD]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Products Match Your Filter"
            description="Try clearing your search term or selecting a different packaging format."
            actionText="Reset All Filters"
            onActionClick={() => {
              setSearchTerm('');
              setSelectedGrade('All');
              setSelectedPackaging('All');
            }}
          />
        )}
      </div>
    </div>
  );
};
