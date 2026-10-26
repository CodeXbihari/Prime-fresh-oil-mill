import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Check, ArrowRight, Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(product.moq);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col group shimmer-card">
      {/* Product Image & Badges */}
      <div className="relative h-60 bg-cream-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-forest-950/90 text-mustard-300 backdrop-blur-md border border-mustard-400/40 shadow-md">
            {product.grade}
          </span>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
              product.stockStatus === 'In Stock'
                ? 'bg-emerald-500/90 text-white border border-emerald-400/50'
                : 'bg-amber-500/90 text-white border border-amber-400/50'
            }`}
          >
            {product.stockStatus}
          </span>
        </div>

        {/* Bottom image overlay information */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-xs font-semibold text-mustard-300 flex items-center gap-1.5 drop-shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-mustard-400 text-mustard-400" />
            {product.specs.pungencyIndex.split('(')[0]}
          </span>
          <p className="text-xs text-cream-100 font-medium truncate mt-0.5">
            {product.packaging}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-bold text-forest-700 tracking-wider uppercase mb-1">
            SKU: {product.sku}
          </div>
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif font-bold text-lg text-forest-950 hover:text-mustard-600 transition-colors line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {product.tagline}
          </p>

          {/* Quick Specs Pill */}
          <div className="bg-cream-100/70 rounded-xl p-3 border border-cream-200 mb-4 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Net Content</span>
              <span className="font-semibold text-forest-950 truncate block">
                {product.volumeOrWeight}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Min. Order (MOQ)</span>
              <span className="font-bold text-forest-950">
                {product.moq} {product.unitLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-cream-200">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-500 block">Indicative Wholesale Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-serif text-forest-950">
                  ₹{product.indicativePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">/{product.unitLabel.toLowerCase().replace(/s$/, '')}</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +5% Edible GST
            </span>
          </div>

          {/* Quantity Selector & Action Button */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50 overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(product.moq, prev - 10))}
                  className="px-2.5 py-2 hover:bg-cream-200 font-bold text-slate-700 transition"
                  title="Decrease by 10"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || product.moq))}
                  className="w-16 text-center font-bold text-forest-950 bg-transparent focus:outline-hidden py-1"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 10)}
                  className="px-2.5 py-2 hover:bg-cream-200 font-bold text-slate-700 transition"
                  title="Increase by 10"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-semibold text-xs transition shadow-sm ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-forest-900 hover:bg-forest-800 text-cream-50 hover:shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-mustard-400" />
                    <span>Add to Bulk Cart</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-500">
                Tier starting @ {product.moq} units
              </span>
              <Link
                to={`/products/${product.id}`}
                className="font-bold text-mustard-700 hover:text-mustard-800 flex items-center gap-1"
              >
                <span>Full Specs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
