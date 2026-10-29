import React, { useState, useEffect } from 'react';
import { X, Star, Flame, Sparkles, Check, ShoppingBag, ShieldCheck, Clock, Layers, Wind } from 'lucide-react';
import { Product, ProductSizeOption } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSizeOption, quantity: number) => void;
  onBuyNow: (product: Product, size: ProductSizeOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(
    product.sizes[1] || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
      setQuantity(1);
      setSelectedImageIndex(0);
      setAddedToast(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentPrice = Math.round(product.price * selectedSize.priceMultiplier);
  const currentOriginalPrice = product.originalPrice 
    ? Math.round(product.originalPrice * selectedSize.priceMultiplier) 
    : undefined;

  const isOutOfStock = product.stock <= 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết sản phẩm"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#564E46] hover:text-[#2C2926] rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Showcase */}
          <div className="p-6 sm:p-8 bg-[#F4EFEB] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ECE4DC]">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shadow-xs bg-[#EFE9E2]">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />

              {product.featured && (
                <div className="absolute top-3 left-3 text-[11px] font-semibold text-[#8C5D30] bg-[#FAF3EA]/95 backdrop-blur-xs px-2.5 py-1 rounded border border-[#E9D9C8]">
                  Tuyển chọn Atelier
                </div>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#8C7A6B] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Candle Craftsmanship Guarantee */}
            <div className="mt-6 pt-6 border-t border-[#E8DFD5] space-y-2 text-xs text-[#7A7066]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C7A6B]" />
                <span>100% Sáp thực vật lành tính (Đậu nành & Bơ shea)</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#8C7A6B]" />
                <span>Bấc tự nhiên đạt chứng nhận an toàn, không pha tạp</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto">
            
            {/* Category and Burn Hours */}
            <div className="flex items-center gap-2 text-xs text-[#8C7E72] mb-1">
              <span>{product.scentFamilyLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Thời gian cháy: {selectedSize.burnHours}</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#2C2926]">
              {product.name}
            </h2>
            <p className="text-xs text-[#82756A] italic mt-0.5">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2 text-xs text-[#7A7066]">
              <div className="flex items-center text-[#C88A3B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 font-semibold text-[#2C2926] tabular-nums">{product.rating}</span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{product.reviewCount} lượt đánh giá từ khách hàng</span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 my-4 py-2 border-y border-[#ECE5DD]">
              <span className="text-2xl font-bold text-[#2C2926] tabular-nums">
                {formatVND(currentPrice)}
              </span>
              {currentOriginalPrice && (
                <span className="text-sm text-[#9E948A] line-through tabular-nums">
                  {formatVND(currentOriginalPrice)}
                </span>
              )}
              <span className="ml-auto text-xs text-[#6A6056]">
                {isOutOfStock ? (
                  <span className="text-red-600 font-semibold">Tạm hết hàng</span>
                ) : (
                  <span>Tồn kho: <strong className="text-[#2C2926] tabular-nums">{product.stock}</strong> hũ</span>
                )}
              </span>
            </div>

            {/* Scent Pyramid (Tháp Hương 3 Tầng) */}
            <div className="mb-5 p-3.5 bg-white border border-[#EAE2D8] rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6B]">
                <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
                <span>Tháp Hương Olfactory Pyramid</span>
              </div>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#2C2926] w-20 shrink-0">Hương đầu:</span>
                  <span className="text-[#655E57]">{product.topNotes.join(', ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#2C2926] w-20 shrink-0">Hương giữa:</span>
                  <span className="text-[#655E57]">{product.middleNotes.join(', ')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-[#2C2926] w-20 shrink-0">Hương cuối:</span>
                  <span className="text-[#655E57]">{product.baseNotes.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Size Variant Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#544B43] mb-2">
                Chọn Kích Thước & Trọng Lượng
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize.size === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2C2926] bg-[#2C2926] text-white shadow-xs'
                          : 'border-[#DDD4C9] bg-white text-[#4A423A] hover:border-[#8C7A6B]'
                      }`}
                    >
                      <p className="text-xs font-semibold">{s.size}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-[#D2C7BC]' : 'text-[#82776D]'}`}>
                        {s.burnHours}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Stock */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#DDD4C9] rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3 py-2 text-xs font-semibold text-[#544B43] hover:bg-[#F2ECE4] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-semibold text-[#2C2926] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-3 py-2 text-xs font-semibold text-[#544B43] hover:bg-[#F2ECE4] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-xs text-[#7A7066]">
                Phù hợp cho: <span className="text-[#2C2926] font-medium">{product.roomSuitability}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 mt-auto">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-white text-[#2C2926] border-2 border-[#2C2926] rounded-xl text-xs font-semibold hover:bg-[#2C2926] hover:text-white disabled:opacity-40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Đã thêm vào giỏ!' : 'Thêm Vào Giỏ'}</span>
                </button>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleBuy}
                  className="flex-1 py-3 bg-[#C25E34] text-white rounded-xl text-xs font-semibold hover:bg-[#A84E27] disabled:opacity-40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Mua Ngay</span>
                </button>
              </div>

              {addedToast && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã cập nhật sản phẩm vào giỏ hàng của bạn</span>
                </div>
              )}
            </div>

            {/* Care Guide Accordion / Snippet */}
            <div className="mt-6 pt-4 border-t border-[#ECE5DD] text-xs text-[#7A7066] space-y-1.5">
              <p className="font-semibold text-[#2C2926]">💡 Hướng dẫn chăm sóc nến chuẩn Atelier:</p>
              <ul className="list-disc pl-4 space-y-1 text-[#655C53]">
                <li>Đốt lần đầu liên tục 2–3 giờ để sáp tan chảy đều tới mép hũ, tránh hiện tượng lõm tim.</li>
                <li>Trước mỗi lần thắp lại, hãy dùng kéo tỉa ngắn đầu bấc gỗ còn khoảng 4–5mm.</li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
