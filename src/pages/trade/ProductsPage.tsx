import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/trade/ProductCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SEOHead } from '../../components/common/SEOHead';
import { Search, Filter, Info, Bot } from 'lucide-react';

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
    <div className="min-h-screen bg-cream-50/60 py-10">
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
            <span className="text-forest-900 font-bold">Product Catalog</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-forest-950">
                Wholesale Oilseeds, By-Products & Agro Commodities
              </h1>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Direct factory gate wholesale pricing for stockists, grain merchants, and bulk institutional buyers. Machine-cleaned sortex purity, verified moisture, and lab certified quality.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="bg-mustard-100 border border-mustard-300 rounded-xl px-4 py-2 text-xs text-mustard-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-mustard-700 shrink-0" />
                <span>Direct mill-gate rates updated daily.</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('open-trade-chatbot', {
                      detail: { query: 'Help me choose the right product and check MOQs' }
                    })
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-100 font-bold text-xs transition border border-mustard-500/40 shadow-xs cursor-pointer"
              >
                <Bot className="w-4 h-4 text-mustard-400" />
                <span>Need Order Help? Ask AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-cream-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by SKU, pack size (e.g. 15L Tin, 1L Pet, Drum), or grade..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 bg-cream-50 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-mustard-500"
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
            <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Pack Size:</span>
            </span>
            {packagingOptions.map(pack => (
              <button
                key={pack}
                onClick={() => setSelectedPackaging(pack)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition shrink-0 ${
                  selectedPackaging === pack
                    ? 'bg-forest-900 text-cream-50 shadow'
                    : 'bg-cream-100 hover:bg-cream-200 text-slate-700 border border-cream-200'
                }`}
              >
                {pack === 'All' ? 'All Packs' : pack}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count & Grid */}
        <div className="mb-4 flex justify-between items-center text-xs text-slate-500">
          <span>
            Showing <strong>{filteredProducts.length}</strong> wholesale SKU{filteredProducts.length !== 1 ? 's' : ''}
          </span>
          {(searchTerm || selectedGrade !== 'All' || selectedPackaging !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGrade('All');
                setSelectedPackaging('All');
              }}
              className="text-mustard-700 hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Mustard Oil SKUs Found"
            description="We couldn't find any products matching your selected search keywords and packaging filters. Try clearing your search or browsing all packs."
            actionText="View All Products"
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
