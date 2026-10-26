import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, OilGrade, PackagingType } from '../../types';
import {
  Plus,
  Edit2,
  Search,
  X,
  Trash2
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { products, updateProduct, addProduct, deleteProduct } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModal, setIsNewProductModal] = useState(false);

  // New product form
  const [newSku, setNewSku] = useState('PFM-AGR-NEW');
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newGrade, setNewGrade] = useState<OilGrade>('Raw Agro Commodity');
  const [newPackaging, setNewPackaging] = useState<PackagingType>('50 Kg Jute Gunny Bag');
  const [newVolume, setNewVolume] = useState('50 Kg Bag');
  const [newPrice, setNewPrice] = useState<number>(3400);
  const [newMoq, setNewMoq] = useState<number>(30);
  const [newUnitLabel, setNewUnitLabel] = useState('Bags');
  const [newStock, setNewStock] = useState<number>(500);
  const [newImage, setNewImage] = useState('/images/yellow-mustard-seeds.jpg');

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.packaging.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || p.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleInlinePriceChange = (id: string, newPriceVal: number) => {
    if (newPriceVal > 0) {
      updateProduct(id, { indicativePrice: newPriceVal });
    }
  };

  const handleInlineStockChange = (id: string, newStockVal: number) => {
    if (newStockVal >= 0) {
      updateProduct(id, {
        availableStock: newStockVal,
        stockStatus: newStockVal > 200 ? 'In Stock' : newStockVal > 0 ? 'Low Stock' : 'Milling Lead Time (3 Days)'
      });
    }
  };

  const handleSaveModalEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    }
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) {
      alert('Please enter a product name');
      return;
    }

    const created: Product = {
      id: `prod-${Date.now()}`,
      sku: newSku,
      name: newName,
      tagline: newTagline || 'Authentic Mill First Pressing',
      grade: newGrade,
      packaging: newPackaging,
      volumeOrWeight: newVolume,
      indicativePrice: newPrice,
      gstRate: 0.05,
      moq: newMoq,
      unitLabel: newUnitLabel,
      stockStatus: newStock > 100 ? 'In Stock' : 'Low Stock',
      availableStock: newStock,
      image: newImage,
      description: 'Manufactured at Prime Fresh Oil Mills under standard quality parameters.',
      specs: {
        pungencyIndex: 'High Pungency (> 0.30% AITC)',
        acidValue: '< 1.2 mg KOH/g',
        moistureContent: '< 0.15%',
        refractiveIndex: '1.4652 at 40°C',
        colorValue: 'Natural Golden Amber',
        shelfLife: '12 Months',
        masterPackaging: newPackaging
      },
      priceTiers: [
        { minQty: newMoq, maxQty: newMoq * 3, pricePerUnit: newPrice },
        { minQty: newMoq * 3 + 1, pricePerUnit: Math.round(newPrice * 0.97) }
      ],
      isFeatured: false
    };

    addProduct(created);
    setIsNewProductModal(false);
    setNewName('');
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Filter Header */}
      <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-xl text-forest-950">
              Wholesale SKU & Rate Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust wholesale prices, minimum order quantities (MOQ), and factory godown stock in real time.
            </p>
          </div>

          <button
            onClick={() => setIsNewProductModal(true)}
            className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs shadow flex items-center gap-1.5 transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-mustard-400" />
            <span>Add New Wholesale SKU</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by SKU, pack size, title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-cream-300 text-xs text-slate-800 bg-cream-50"
            />
          </div>

          <select
            value={selectedGrade}
            onChange={e => setSelectedGrade(e.target.value)}
            className="px-3 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-slate-800 bg-cream-50"
          >
            <option value="All">All Grades</option>
            <option value="Kachi Ghani (Cold Pressed)">Kachi Ghani (Cold Pressed)</option>
            <option value="Expeller Pressed Pure">Expeller Pressed Pure</option>
            <option value="Mustard Cake (By-Product Khali)">Mustard Cake (Khali)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-forest-950 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">SKU & Pack Details</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Wholesale Rate (₹ / Ex-Mill)</th>
                <th className="p-4">MOQ</th>
                <th className="p-4">Stock Availability</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-cream-50/70 transition">
                  {/* SKU & Pack details */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover bg-cream-100 shrink-0 border border-cream-200"
                      />
                      <div>
                        <span className="font-bold text-forest-950 block text-xs">
                          {product.name}
                        </span>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-mono font-bold text-forest-700">{product.sku}</span>
                          <span>•</span>
                          <span>{product.packaging}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Grade */}
                  <td className="p-4">
                    <span className="text-[11px] font-semibold text-forest-900 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200 whitespace-nowrap">
                      {product.grade.split('(')[0]}
                    </span>
                  </td>

                  {/* Price (Editable) */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-400">₹</span>
                      <input
                        type="number"
                        value={product.indicativePrice}
                        onChange={e => handleInlinePriceChange(product.id, parseInt(e.target.value) || product.indicativePrice)}
                        className="w-24 px-2 py-1 rounded-lg border border-cream-300 font-bold text-forest-950 text-xs bg-white focus:ring-1 focus:ring-mustard-500"
                      />
                      <span className="text-[10px] text-slate-400">/{product.unitLabel.replace(/s$/, '')}</span>
                    </div>
                  </td>

                  {/* MOQ (Editable) */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={product.moq}
                        onChange={e => updateProduct(product.id, { moq: Math.max(1, parseInt(e.target.value) || 1) })}
                        className="w-16 px-2 py-1 rounded-lg border border-cream-300 font-bold text-forest-950 text-xs bg-white focus:ring-1 focus:ring-mustard-500"
                      />
                      <span className="text-[10px] text-slate-400">{product.unitLabel}</span>
                    </div>
                  </td>

                  {/* Stock Units (Editable) */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={product.availableStock}
                        onChange={e => handleInlineStockChange(product.id, parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 rounded-lg border border-cream-300 font-bold text-forest-950 text-xs bg-white focus:ring-1 focus:ring-mustard-500"
                      />
                      <span className="text-[10px] text-slate-400">{product.unitLabel}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        product.stockStatus === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : product.stockStatus === 'Low Stock'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}
                    >
                      {product.stockStatus}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-forest-950 transition"
                        title="Edit Full Specifications"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${product.name}?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                        title="Delete SKU"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Full Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-cream-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-cream-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-forest-950">
                Edit SKU: {editingProduct.sku}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commercial Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={e => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Indicative Wholesale Base Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.indicativePrice}
                    onChange={e => setEditingProduct({ ...editingProduct, indicativePrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Minimum Order Quantity (MOQ)</label>
                  <input
                    type="number"
                    value={editingProduct.moq}
                    onChange={e => setEditingProduct({ ...editingProduct, moq: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Factory Godown Stock</label>
                  <input
                    type="number"
                    value={editingProduct.availableStock}
                    onChange={e => setEditingProduct({ ...editingProduct, availableStock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Status</label>
                  <select
                    value={editingProduct.stockStatus}
                    onChange={e => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 font-bold"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Milling Lead Time (3 Days)">Milling Lead Time (3 Days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {isNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-cream-200 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-cream-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-forest-950">
                Create New Wholesale Mustard Oil SKU
              </h3>
              <button
                onClick={() => setIsNewProductModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={newSku}
                    onChange={e => setNewSku(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Oil Extraction Grade *</label>
                  <select
                    value={newGrade}
                    onChange={e => setNewGrade(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 bg-cream-50 font-bold"
                  >
                    <option value="Kachi Ghani (Cold Pressed)">Kachi Ghani (Cold Pressed)</option>
                    <option value="Expeller Pressed Pure">Expeller Pressed Pure</option>
                    <option value="Refined Mustard Oil">Refined Mustard Oil</option>
                    <option value="Mustard Cake (By-Product Khali)">Mustard Cake (Khali)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Prime Pure Kachi Ghani Mustard Oil - 2 Litre Jar"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Commercial Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={e => setNewTagline(e.target.value)}
                  placeholder="e.g. High Pungency Cold Pressed First Extractions"
                  className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Packaging Type *</label>
                  <input
                    type="text"
                    required
                    value={newPackaging}
                    onChange={e => setNewPackaging(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Volume / Net Weight</label>
                  <input
                    type="text"
                    value={newVolume}
                    onChange={e => setNewVolume(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Wholesale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Minimum Order (MOQ)</label>
                  <input
                    type="number"
                    required
                    value={newMoq}
                    onChange={e => setNewMoq(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Label</label>
                  <input
                    type="text"
                    value={newUnitLabel}
                    onChange={e => setNewUnitLabel(e.target.value)}
                    placeholder="Tins, Boxes, Drums"
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Ready Stock</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={e => setNewStock(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={e => setNewImage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-cream-300 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setIsNewProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-950 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold shadow"
                >
                  Create Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
