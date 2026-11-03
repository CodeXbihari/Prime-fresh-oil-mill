import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingCart, Check, ArrowRight } from 'lucide-react';

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
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group">
      {/* Product Image & Badges */}
      <div className="relative h-56 bg-gradient-to-b from-white/40 to-white/10 overflow-hidden border-b border-white/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Glass Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg glass-pill bg-white/90 text-[#8C6B1B] border-[#C49A32]/30 shadow-xs">
            {product.grade.split('(')[0]}
          </span>
          <span
            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-lg backdrop-blur-md shadow-xs ${
              product.stockStatus === 'In Stock'
                ? 'bg-amber-100/90 text-amber-900 border border-amber-300/60'
                : 'bg-amber-600/85 text-white border border-amber-400/40'
            }`}
          >
            {product.stockStatus}
          </span>
        </div>

        {/* Bottom subtle glass bar on image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-black/55 text-white backdrop-blur-md border border-white/20">
            {product.packaging}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-black/55 text-[#F5C542] backdrop-blur-md border border-white/20">
            {product.specs.pungencyIndex.split('(')[0].trim()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            SKU: {product.sku}
          </div>
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D2418] hover:text-[#C49A32] transition-colors line-clamp-1 leading-snug mb-1.5">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed">
            {product.tagline}
          </p>

          {/* Quick Specs Glass Pill */}
          <div className="bg-white/60 backdrop-blur-xs rounded-xl p-2.5 border border-white/80 mb-3.5 grid grid-cols-2 gap-2 text-xs shadow-xs">
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-semibold">Net Content</span>
              <span className="font-semibold text-slate-800 truncate block">
                {product.volumeOrWeight}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block uppercase font-semibold">Min. Order (MOQ)</span>
              <span className="font-bold text-slate-800">
                {product.moq} {product.unitLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-3 border-t border-slate-200/60">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Indicative Ex-Mill Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-serif text-[#2D2418]">
                  ₹{product.indicativePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">/{product.unitLabel.toLowerCase().replace(/s$/, '')}</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-[#8C6B1B] bg-amber-50/80 px-2 py-0.5 rounded-lg border border-amber-200/80 backdrop-blur-xs">
              +5% GST
            </span>
          </div>

          {/* Quantity Selector & Action Button */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-white/80 rounded-xl bg-white/70 backdrop-blur-sm overflow-hidden text-xs shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(product.moq, prev - 10))}
                  className="px-2.5 py-1.5 hover:bg-white/90 font-bold text-slate-700 transition cursor-pointer"
                  title="Decrease by 10"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || product.moq))}
                  className="w-14 text-center font-bold text-slate-900 bg-transparent focus:outline-hidden py-1 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 10)}
                  className="px-2.5 py-1.5 hover:bg-white/90 font-bold text-slate-700 transition cursor-pointer"
                  title="Increase by 10"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-bold text-xs transition cursor-pointer shadow-sm ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C49A32] hover:bg-[#B38927] text-white border border-[#C49A32]/40'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3.5 h-3.5 text-white" />
                    <span>Add to Bulk Cart</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">
                Tier starting @ {product.moq} units
              </span>
              <Link
                to={`/products/${product.id}`}
                className="font-bold text-[#C49A32] hover:text-[#99731C] flex items-center gap-1"
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
