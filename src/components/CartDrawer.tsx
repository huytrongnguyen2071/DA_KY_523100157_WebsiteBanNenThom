import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => void;
  discountAmount: number;
}

const FREE_SHIPPING_THRESHOLD = 500000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(discountCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const missingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    const clean = inputCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'LAURA10') {
      onApplyDiscount(clean);
      setCouponSuccess(true);
    } else {
      setCouponError('Mã ưu đãi không hợp lệ. Thử mã LAURA10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#EAE1D7]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#ECE5DD] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#8C7A6B]" />
              <h2 className="font-serif-luxury text-xl font-semibold text-[#2C2926]">
                Giỏ Hàng Của Bạn
              </h2>
              <span className="text-xs text-[#8C7E72] tabular-nums">
                ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} món)
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 text-[#7E746A] hover:text-[#2C2926] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#F4EFEB] border-b border-[#E8DFD5] text-xs">
            <div className="flex items-center justify-between text-[#594E44] mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#8C7A6B]" />
                {isFreeShipping ? (
                  <span className="font-semibold text-emerald-800">Bạn đã đủ điều kiện Miễn Phí Vận Chuyển!</span>
                ) : (
                  <span>Mua thêm <strong className="text-[#2C2926]">{formatVND(missingForFreeShip)}</strong> để freeship</span>
                )}
              </div>
              <span className="font-semibold tabular-nums">{freeShipProgress}%</span>
            </div>
            
            <div className="w-full h-1.5 bg-[#DDD3C7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C25E34] transition-all duration-300"
                style={{ width: `${freeShipProgress}%` }}
              />
            </div>
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0EAE1]">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8C7E72]">
                <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.2] text-[#B8AA9E]" />
                <p className="font-serif text-lg text-[#2C2926] mb-1">Giỏ hàng đang trống</p>
                <p className="text-xs text-[#7A7066] mb-6 max-w-xs">
                  Hãy khám phá bộ sưu tập nến thơm tự nhiên của L'Aura để mang hương an lành về ngôi nhà bạn.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#2C2926] text-white text-xs font-medium rounded-lg hover:bg-[#453F39] transition-colors cursor-pointer"
                >
                  Tiếp Tục Mua Sắm
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4 first:pt-0">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F4EFEB] rounded-lg overflow-hidden shrink-0 border border-[#ECE5DD]">
                    <img
                      src={item.product.images[0] || '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-medium text-[#2C2926] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#7E746A]">
                          Size: {item.selectedSize.label}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#9E948A] hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD3C7] rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="px-2.5 py-1 text-xs text-[#524941] hover:bg-[#F2ECE4] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums text-[#2C2926]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2.5 py-1 text-xs text-[#524941] hover:bg-[#F2ECE4] disabled:opacity-40 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="text-xs font-semibold text-[#2C2926] tabular-nums">
                        {formatVND(item.unitPrice * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#ECE5DD] space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8F8479] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Mã giảm giá (nhập LAURA10)"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#433B34] text-white text-xs font-medium rounded-lg hover:bg-[#2C2926] transition-colors cursor-pointer"
                >
                  Áp Dụng
                </button>
              </form>

              {couponSuccess && (
                <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Đã áp dụng mã LAURA10 giảm 10% giá trị đơn hàng!
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600">{couponError}</p>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B6156] pt-1">
                <div className="flex justify-between">
                  <span>Tạm tính hàng hóa:</span>
                  <span className="font-medium text-[#2C2926] tabular-nums">{formatVND(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Mã ưu đãi L’Aura:</span>
                    <span className="font-medium tabular-nums">-{formatVND(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span className="font-medium text-[#2C2926] tabular-nums">
                    {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#2C2926] pt-2 border-t border-[#EFE8E0]">
                  <span>Tổng thanh toán:</span>
                  <span className="text-base text-[#C25E34] tabular-nums">{formatVND(total)}</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 bg-[#2C2926] text-[#FAF8F5] rounded-xl text-xs font-semibold hover:bg-[#453F39] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
