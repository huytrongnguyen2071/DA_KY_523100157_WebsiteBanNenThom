import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, QrCode, ArrowRight, Package } from 'lucide-react';
import { CartItem, CustomerInfo, PaymentMethod, User, Order } from '../types';
import { formatVND } from '../utils/formatters';
import { api } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  discountAmount: number;
  onOrderSuccess: (order: Order) => void;
  onViewOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  discountAmount,
  onOrderSuccess,
  onViewOrder
}) => {
  if (!isOpen) return null;

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [submitting, setSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= 500000 || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng.');
      return;
    }

    try {
      setSubmitting(true);
      const orderPayload = {
        userId: currentUser?.id || 'guest',
        customerInfo,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.product.name,
          selectedSize: item.selectedSize.label,
          price: item.unitPrice,
          quantity: item.quantity,
          image: item.product.images[0] || ''
        })),
        paymentMethod,
        subtotal,
        shippingFee,
        discount: discountAmount,
        total
      };

      const res = await api.createOrder(orderPayload);
      if (res.success && res.order) {
        setCreatedOrder(res.order);
        onOrderSuccess(res.order);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi đặt hàng, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng thanh toán"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#564E46] hover:text-[#2C2926] rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If Order is Created: Show Confirmation screen */}
        {createdOrder ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs text-[#8C7A6B] font-semibold">
                Đặt Hàng Thành Công
              </span>
              <h2 className="font-serif-luxury text-3xl font-semibold text-[#2C2926] mt-1">
                Cảm ơn bạn đã lựa chọn L'Aura
              </h2>
              <p className="text-xs text-[#7A7066] mt-2 max-w-md mx-auto">
                Mã đơn hàng của bạn là <strong className="text-[#2C2926] font-mono text-sm">#{createdOrder.orderCode}</strong>.
                Chúng tôi sẽ sớm liên hệ xác nhận và tiến hành chuẩn bị nến cho bạn.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="p-5 bg-white border border-[#EAE2D8] rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#7A7066]">Người nhận:</span>
                <span className="font-semibold text-[#2C2926]">{createdOrder.customerInfo.name} ({createdOrder.customerInfo.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7066]">Địa chỉ giao:</span>
                <span className="font-medium text-[#2C2926] text-right max-w-[240px] truncate">{createdOrder.customerInfo.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A7066]">Phương thức:</span>
                <span className="font-medium text-[#2C2926] uppercase">
                  {createdOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận (COD)' : createdOrder.paymentMethod === 'banking' ? 'Chuyển khoản VietQR' : 'Ví MoMo'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F2ECE4] text-sm">
                <span className="font-semibold text-[#2C2926]">Tổng tiền:</span>
                <span className="font-bold text-[#C25E34] tabular-nums">{formatVND(createdOrder.total)}</span>
              </div>
            </div>

            {/* VietQR instructions if banking selected */}
            {createdOrder.paymentMethod === 'banking' && (
              <div className="p-4 bg-[#F2ECE4] rounded-xl text-left text-xs max-w-md mx-auto border border-[#E2D8CE]">
                <p className="font-semibold text-[#2C2926] mb-1 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#8C7A6B]" />
                  Thông tin chuyển khoản nhanh:
                </p>
                <p className="text-[#594E44]">Ngân hàng: <strong>Vietcombank - CN Sài Gòn</strong></p>
                <p className="text-[#594E44]">Số tài khoản: <strong>1028 9988 7766</strong></p>
                <p className="text-[#594E44]">Chủ TK: <strong>LAURA CANDLE ATELIER</strong></p>
                <p className="text-[#594E44]">Nội dung CK: <strong className="text-[#C25E34]">{createdOrder.orderCode} - {createdOrder.customerInfo.phone}</strong></p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onViewOrder(createdOrder);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#2C2926] text-white text-xs font-semibold rounded-xl hover:bg-[#453F39] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Package className="w-4 h-4" />
                <span>Xem Tiến Độ Đơn Hàng</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-white text-[#2C2926] border border-[#DDD3C7] text-xs font-semibold rounded-xl hover:bg-[#F4EFEB] transition-colors cursor-pointer"
              >
                <span>Về Trang Chủ Mua Thêm</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#ECE5DD] pb-4">
              <span className="text-xs text-[#8C7A6B] font-semibold">
                Thanh Toán Đơn Hàng
              </span>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#2C2926] mt-0.5">
                Thông Tin Giao Hàng & Thanh Toán
              </h2>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Họ và tên người nhận *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Hương Lan"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Số điện thoại nhận hàng *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder="Ví dụ: 0908123456"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Địa chỉ chi tiết nhận hàng *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Ghi chú cho xưởng nến (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={customerInfo.note}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                  placeholder="Ví dụ: Viết thiệp chúc mừng sinh nhật, giao giờ hành chính..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#8C7A6B] mb-2.5">
                Phương Thức Thanh Toán
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* COD */}
                <label 
                  className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-[#2C2926] bg-[#2C2926]/5 ring-1 ring-[#2C2926]' : 'border-[#DDD3C7] bg-white hover:border-[#8C7A6B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Banknote className="w-5 h-5 text-[#8C7A6B]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#2C2926]"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2C2926]">Tiền mặt (COD)</p>
                    <p className="text-[11px] text-[#7A7066]">Thanh toán khi nhận hàng</p>
                  </div>
                </label>

                {/* Banking / VietQR */}
                <label 
                  className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'banking' ? 'border-[#2C2926] bg-[#2C2926]/5 ring-1 ring-[#2C2926]' : 'border-[#DDD3C7] bg-white hover:border-[#8C7A6B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <QrCode className="w-5 h-5 text-[#8C7A6B]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'banking'}
                      onChange={() => setPaymentMethod('banking')}
                      className="accent-[#2C2926]"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2C2926]">Chuyển Khoản</p>
                    <p className="text-[11px] text-[#7A7066]">Quét mã VietQR 24/7</p>
                  </div>
                </label>

                {/* MoMo */}
                <label 
                  className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'momo' ? 'border-[#2C2926] bg-[#2C2926]/5 ring-1 ring-[#2C2926]' : 'border-[#DDD3C7] bg-white hover:border-[#8C7A6B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-[#8C7A6B]" />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="accent-[#2C2926]"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2C2926]">Ví MoMo</p>
                    <p className="text-[11px] text-[#7A7066]">Thanh toán siêu tốc</p>
                  </div>
                </label>

              </div>
            </div>

            {/* Total Review */}
            <div className="p-4 bg-white border border-[#EAE2D8] rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-[#655E57]">
                <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                <span className="tabular-nums font-medium text-[#2C2926]">{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Khuyến mãi (LAURA10):</span>
                  <span className="tabular-nums font-medium">-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#655E57]">
                <span>Phí vận chuyển toàn quốc:</span>
                <span className="tabular-nums font-medium text-[#2C2926]">
                  {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2C2926] pt-2 border-t border-[#F2ECE4]">
                <span>Tổng cộng cần thanh toán:</span>
                <span className="text-base text-[#C25E34] tabular-nums">{formatVND(total)}</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#2C2926] text-white rounded-xl text-xs font-semibold hover:bg-[#453F39] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{submitting ? 'Đang tạo đơn hàng...' : 'Xác Nhận & Đặt Hàng Ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
