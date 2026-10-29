import React, { useState, useEffect } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, AlertCircle, ChevronRight, CornerDownRight, LogOut, ArrowRightLeft } from 'lucide-react';
import { Order, OrderStatus, User } from '../types';
import { formatVND, formatDate } from '../utils/formatters';
import { api } from '../services/api';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  targetOrder?: Order | null;
  onLogout?: () => void;
  onOpenAuth?: () => void;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; step: number }> = {
  pending: { label: 'Chờ xưởng tiếp nhận', color: 'text-amber-800 bg-amber-50 border-amber-200', step: 1 },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-800 bg-blue-50 border-blue-200', step: 2 },
  processing: { label: 'Đang chế tác & đóng gói', color: 'text-purple-800 bg-purple-50 border-purple-200', step: 3 },
  shipping: { label: 'Đang vận chuyển hỏa tốc', color: 'text-indigo-800 bg-indigo-50 border-indigo-200', step: 4 },
  completed: { label: 'Giao hàng thành công', color: 'text-emerald-800 bg-emerald-50 border-emerald-200', step: 5 },
  cancelled: { label: 'Đã hủy', color: 'text-red-800 bg-red-50 border-red-200', step: 0 }
};

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  targetOrder,
  onLogout,
  onOpenAuth
}) => {
  if (!isOpen) return null;

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(targetOrder || null);
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Load orders
  useEffect(() => {
    loadUserOrders();
  }, [currentUser]);

  useEffect(() => {
    if (targetOrder) {
      setSelectedOrder(targetOrder);
    }
  }, [targetOrder]);

  const loadUserOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getOrders(currentUser ? currentUser.id : undefined);
      setOrders(data);
      if (!selectedOrder && data.length > 0) {
        setSelectedOrder(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    const clean = searchCode.trim().replace('#', '').toUpperCase();
    if (!clean) return;

    try {
      setLoading(true);
      const res = await api.getOrder(clean);
      setSelectedOrder(res);
      // Also add to orders list if not present
      if (!orders.some(o => o.id === res.id)) {
        setOrders([res, ...orders]);
      }
    } catch (err: any) {
      setSearchError('Không tìm thấy đơn hàng với mã ' + clean);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) return;
    try {
      const res = await api.updateOrderStatus(orderId, 'cancelled', 'Khách hàng yêu cầu hủy đơn');
      if (res.success) {
        setSelectedOrder(res.order);
        setOrders(orders.map(o => (o.id === res.order.id ? res.order : o)));
      }
    } catch (err) {
      alert('Không thể hủy đơn hàng vào lúc này.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#ECE5DD] bg-white flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#8C7A6B] font-semibold">
              Tra Cứu & Trạng Thái
            </span>
            <h2 className="font-serif-luxury text-2xl font-semibold text-[#2C2926]">
              Lịch Sử Đơn Hàng L’Aura
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#FAF7F2] rounded-xl border border-[#ECE5DD] text-xs">
                <div className="w-5 h-5 rounded-full bg-[#2C2926] text-white flex items-center justify-center font-bold text-[10px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-[#2C2926] max-w-[100px] truncate">{currentUser.name}</span>
                {onOpenAuth && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAuth();
                    }}
                    className="text-[#8C7A6B] hover:text-[#2C2926] ml-1 underline cursor-pointer text-[11px]"
                  >
                    Đổi TK
                  </button>
                )}
                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="text-red-600 hover:text-red-700 ml-1 font-semibold cursor-pointer text-[11px] flex items-center gap-0.5"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Đăng xuất</span>
                  </button>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#7E746A] hover:text-[#2C2926] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar for Order Code / Phone */}
        <div className="p-4 bg-[#F5EFE8] border-b border-[#EAE0D6]">
          <form onSubmit={handleSearchOrder} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Tra cứu theo mã đơn (ví dụ: LAU-8921)"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926] uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2C2926] text-white text-xs font-semibold rounded-lg hover:bg-[#453F39] transition-colors cursor-pointer"
            >
              Tra Cứu
            </button>
          </form>
          {searchError && (
            <p className="text-xs text-red-600 mt-1.5">{searchError}</p>
          )}
        </div>

        {/* Body Grid: Left Orders List / Right Order Details */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3">
          
          {/* Left Column: Orders list */}
          <div className="border-r border-[#ECE5DD] overflow-y-auto max-h-[55vh] md:max-h-none divide-y divide-[#F0EAE1] bg-white">
            <div className="p-3 text-[11px] font-semibold text-[#8C7E72] bg-[#FAF7F2]">
              Danh sách đơn ({orders.length})
            </div>

            {loading && orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#7A7066]">
                Đang tải dữ liệu đơn hàng...
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#7A7066]">
                Bạn chưa có đơn hàng nào tại xưởng.
              </div>
            ) : (
              orders.map((ord) => {
                const isSelected = selectedOrder?.id === ord.id;
                const cfg = STATUS_CONFIG[ord.status] || STATUS_CONFIG.pending;
                return (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#F5EFE8]' : 'hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[#2C2926]">
                        #{ord.orderCode}
                      </span>
                      <span className="text-[11px] text-[#8C7E72] tabular-nums">
                        {formatDate(ord.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs font-semibold text-[#2C2926] tabular-nums">
                        {formatVND(ord.total)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Order Details & Timeline */}
          <div className="col-span-2 overflow-y-auto p-6 space-y-6 bg-[#FBF9F5]">
            {selectedOrder ? (
              <>
                {/* Order Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-[#ECE5DD]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif-luxury text-xl font-semibold text-[#2C2926]">
                        Đơn Hàng #{selectedOrder.orderCode}
                      </h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-md border font-medium ${STATUS_CONFIG[selectedOrder.status].color}`}>
                        {STATUS_CONFIG[selectedOrder.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A7066] mt-1">
                      Ngày khởi tạo: {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>

                  {selectedOrder.status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Hủy đơn hàng này
                    </button>
                  )}
                </div>

                {/* Tracking Progress Timeline */}
                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] space-y-4">
                  <h4 className="text-xs font-semibold text-[#8C7A6B] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Hành Trình Chế Tác & Giao Hàng</span>
                  </h4>

                  {/* Step Indicators */}
                  {selectedOrder.status !== 'cancelled' ? (
                    <div className="grid grid-cols-4 gap-2 text-center text-xs pb-3 border-b border-[#F2ECE4]">
                      {[
                        { title: 'Tiếp nhận', step: 1 },
                        { title: 'Xác nhận', step: 2 },
                        { title: 'Chế tác & Đóng gói', step: 3 },
                        { title: 'Giao hàng', step: 4 }
                      ].map((st) => {
                        const currentStep = STATUS_CONFIG[selectedOrder.status].step;
                        const isDone = currentStep >= st.step;
                        return (
                          <div key={st.step} className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-all ${
                              isDone ? 'bg-[#2C2926] text-white shadow-xs' : 'bg-[#EAE2D8] text-[#8C7E72]'
                            }`}>
                              {st.step}
                            </div>
                            <span className={`text-[11px] ${isDone ? 'font-medium text-[#2C2926]' : 'text-[#A3998E]'}`}>
                              {st.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 rounded-lg text-red-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Đơn hàng đã được đánh dấu hủy trên hệ thống.</span>
                    </div>
                  )}

                  {/* Detailed Timeline Events */}
                  <div className="space-y-3 pt-1">
                    {selectedOrder.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-[#8C7A6B] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#2C2926]">{item.label}</span>
                            <span className="text-[11px] text-[#8C7E72] tabular-nums">{formatDate(item.timestamp)}</span>
                          </div>
                          <p className="text-[#655E57] mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Items in this order */}
                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] space-y-3">
                  <h4 className="text-xs font-semibold text-[#8C7A6B]">
                    Sản Phẩm Trong Đơn ({selectedOrder.items.length})
                  </h4>

                  <div className="divide-y divide-[#F2ECE4]">
                    {selectedOrder.items.map((prod, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#F4EFEB] overflow-hidden shrink-0 border border-[#ECE5DD]">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-[#2C2926]">{prod.name}</p>
                            <p className="text-[11px] text-[#7A7066]">
                              {prod.selectedSize} · Số lượng: <strong className="text-[#2C2926]">{prod.quantity}</strong>
                            </p>
                          </div>
                        </div>

                        <span className="font-semibold text-[#2C2926] tabular-nums">
                          {formatVND(prod.price * prod.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary math */}
                  <div className="pt-3 border-t border-[#F2ECE4] space-y-1 text-xs text-[#6B6156]">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span className="tabular-nums font-medium text-[#2C2926]">{formatVND(selectedOrder.subtotal)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-800">
                        <span>Giảm giá:</span>
                        <span className="tabular-nums font-medium">-{formatVND(selectedOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span className="tabular-nums font-medium text-[#2C2926]">
                        {selectedOrder.shippingFee === 0 ? 'Miễn phí' : formatVND(selectedOrder.shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#2C2926] pt-1.5 border-t border-[#ECE5DD]">
                      <span>Tổng tiền đã tính:</span>
                      <span className="text-base text-[#C25E34] tabular-nums">{formatVND(selectedOrder.total)}</span>
                    </div>
                  </div>

                </div>

                {/* Delivery Information */}
                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] space-y-2 text-xs">
                  <h4 className="text-xs font-semibold text-[#8C7A6B]">
                    Thông Tin Người Nhận
                  </h4>
                  <p className="text-[#2C2926]">
                    <strong>Họ tên:</strong> {selectedOrder.customerInfo.name} · {selectedOrder.customerInfo.phone}
                  </p>
                  <p className="text-[#2C2926]">
                    <strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}
                  </p>
                  {selectedOrder.customerInfo.note && (
                    <p className="text-[#655E57] italic">
                      <strong>Ghi chú:</strong> {selectedOrder.customerInfo.note}
                    </p>
                  )}
                  <p className="text-[#2C2926] pt-1">
                    <strong>Phương thức:</strong>{' '}
                    {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : selectedOrder.paymentMethod === 'banking' ? 'Chuyển khoản VietQR' : 'Ví MoMo'}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-[#7E746A]">
                <Package className="w-10 h-10 mb-2 opacity-50" />
                <p className="text-sm font-medium">Chọn một đơn hàng từ danh sách để xem chi tiết</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
