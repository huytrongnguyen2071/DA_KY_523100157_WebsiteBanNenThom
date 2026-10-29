import React, { useState } from 'react';
import { Eye, ShoppingBag, Star, Flame, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [imageError, setImageError] = useState(false);
  const primaryImage = product.images[0] || '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg';
  const isOutOfStock = product.stock <= 0;

  return (
    <article className="group flex flex-col bg-white border border-[#ECE5DC] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      
      {/* Product Image Slot (65-75% visual dominance) */}
      <div 
        onClick={() => onSelect(product)} 
        className="relative aspect-[4/3] bg-[#F4EFEB] overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={primaryImage}
            alt={`Hũ nến thơm ${product.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F5EFE8] to-[#E9DFD3] text-[#8C7A6B]">
            <Flame className="w-8 h-8 mb-2 opacity-60 text-[#A67C52]" />
            <span className="font-serif text-sm font-medium">{product.name}</span>
          </div>
        )}

        {/* Quiet status or feature note (No pill badge spam) */}
        {product.featured && (
          <div className="absolute top-3 left-3 text-[11px] font-semibold text-[#8C5D30] bg-[#FAF3EA]/95 backdrop-blur-xs px-2 py-0.5 rounded border border-[#E9D9C8]">
            Tuyển chọn Atelier
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#2C2926]/60 backdrop-blur-xs flex items-center justify-center">
            <span className="text-white text-xs font-semibold px-3 py-1 bg-black/70 rounded">
              Tạm hết hàng
            </span>
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2 bg-white/95 text-[#2C2926] text-xs font-medium rounded-lg shadow-sm hover:bg-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem chi tiết</span>
          </button>

          {!isOutOfStock && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              title="Thêm nhanh vào giỏ"
              className="p-2 bg-[#2C2926] text-white text-xs font-medium rounded-lg shadow-sm hover:bg-[#453F39] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center gap-2 text-xs text-[#8C7E72] mb-1.5">
          <span>{product.scentFamilyLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{product.burnHours}</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(product)} 
          className="font-serif-luxury text-lg font-medium text-[#2C2926] hover:text-[#8C5D30] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Fragrance Top Notes summary */}
        <p className="text-xs text-[#73685E] mt-1 line-clamp-1 font-light italic">
          {product.topNotes.slice(0, 3).join(', ')}
        </p>

        {/* Rating and Reviews (quiet metadata) */}
        <div className="flex items-center gap-2 mt-3 text-xs text-[#7A7066]">
          <div className="flex items-center text-[#C88A3B]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-semibold text-[#2C2926] tabular-nums">{product.rating}</span>
          </div>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">({product.reviewCount} đánh giá)</span>
        </div>

        {/* Bottom Price & Stock baseline */}
        <div className="mt-auto pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#2C2926] tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E948A] line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="text-[11px] text-[#7E746A]">
            {isOutOfStock ? (
              <span className="text-red-600 font-medium">Hết hàng</span>
            ) : product.stock <= 5 ? (
              <span className="text-[#C25E34] font-medium">Chỉ còn {product.stock} hũ</span>
            ) : (
              <span>Còn {product.stock} hũ</span>
            )}
          </div>
        </div>

      </div>

    </article>
  );
};
