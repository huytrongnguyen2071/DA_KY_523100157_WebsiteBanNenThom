import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Edit2, Trash2, Package, ShoppingCart, TrendingUp, AlertTriangle, 
  Check, RefreshCw, Layers, Shield, Search 
} from 'lucide-react';
import { Product, Order, OrderStatus, ScentFamily, ProductCategory } from '../types';
import { formatVND, formatDate } from '../utils/formatters';
import { api } from '../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'stats'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product Create/Edit Modal state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [prods, ords, st] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getStats()
      ]);
      setProducts(prods);
      setOrders(ords);
      setStats(st);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Stock inline quick update
  const handleUpdateStock = async (product: Product, newStock: number) => {
    try {
      const updated = await api.updateProduct(product.id, { stock: Math.max(0, newStock) });
      setProducts(products.map(p => (p.id === updated.id ? updated : p)));
      onDataChanged();
    } catch (err) {
      alert('Không thể cập nhật tồn kho.');
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm nến này khỏi xưởng?')) return;
    try {
      await api.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
      onDataChanged();
    } catch (err) {
      alert('Lỗi khi xóa sản phẩm.');
    }
  };

  // Save product (New or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;

    try {
      if (editingProduct.id) {
        // Update
        const updated = await api.updateProduct(editingProduct.id, editingProduct);
        setProducts(products.map(p => (p.id === updated.id ? updated : p)));
      } else {
        // Create
        const created = await api.createProduct(editingProduct);
        setProducts([created, ...products]);
      }
      setIsEditingProduct(false);
      setEditingProduct(null);
      onDataChanged();
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Lỗi lưu sản phẩm');
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders(orders.map(o => (o.id === res.order.id ? res.order : o)));
        onDataChanged();
        loadAllData();
      }
    } catch (err) {
      alert('Lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  // Reset seed
  const handleResetSeed = async () => {
    if (!window.confirm('Khôi phục toàn bộ danh mục sản phẩm về mặc định?')) return;
    try {
      await api.resetSeed();
      await loadAllData();
      onDataChanged();
      alert('Đã khôi phục dữ liệu ban đầu thành công!');
    } catch (err) {
      alert('Lỗi khôi phục.');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.scentFamilyLabel.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orderStatusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === orderStatusFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-4 flex flex-col h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#ECE5DD] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2C2926] text-[#D8B998] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#8C7A6B] font-semibold">
                Bảng Điều Khiển Xưởng Nến
              </span>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#2C2926]">
                Quản Trị Viên L'Aura
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSeed}
              title="Khôi phục catalog mẫu"
              className="px-3 py-1.5 text-xs text-[#7A7066] hover:text-[#2C2926] bg-[#F4EFEB] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Khôi phục mẫu</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7E746A] hover:text-[#2C2926] hover:bg-[#F2ECE4] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#ECE5DD] bg-white flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#2C2926] text-[#2C2926]'
                : 'border-transparent text-[#7E746A] hover:text-[#2C2926]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Quản Lý Sản Phẩm & Tồn Kho ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#2C2926] text-[#2C2926]'
                : 'border-transparent text-[#7E746A] hover:text-[#2C2926]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Quản Lý Đơn Hàng ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'border-[#2C2926] text-[#2C2926]'
                : 'border-transparent text-[#7E746A] hover:text-[#2C2926]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Thống Kê Doanh Thu & Cảnh Báo</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FBF9F5]">
          
          {/* TAB 1: PRODUCTS & INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Tìm theo tên nến, nhóm hương..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      tagline: 'Nến thơm thủ công tinh dầu tự nhiên',
                      category: 'ceramic',
                      scentFamily: 'woody',
                      scentFamilyLabel: 'Gỗ ấm & Hổ phách',
                      topNotes: ['Cam Bergamot'],
                      middleNotes: ['Hổ phách'],
                      baseNotes: ['Gỗ tuyết tùng'],
                      description: 'Nến thơm tự nhiên đổ tay từ sáp thực vật.',
                      story: 'Hương thơm khơi gợi sự tĩnh lặng bình an.',
                      price: 380000,
                      stock: 20,
                      waxType: '100% Sáp đậu nành & bơ hạt mỡ',
                      wickType: 'Bấc gỗ tự nhiên nứt tanh tách',
                      burnHours: '45 - 50 giờ',
                      roomSuitability: 'Phòng khách, phòng ngủ 20-30m²',
                      images: ['/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'],
                      featured: false
                    });
                    setIsEditingProduct(true);
                  }}
                  className="px-4 py-2 bg-[#2C2926] text-white text-xs font-semibold rounded-lg hover:bg-[#453F39] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Sản Phẩm Nến Mới</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-[#ECE5DD] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-[#7E746A] border-b border-[#ECE5DD] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Sản Phẩm</th>
                        <th className="py-3 px-3">Nhóm Mùi Hương</th>
                        <th className="py-3 px-3">Giá Bán</th>
                        <th className="py-3 px-3">Tồn Kho (Hũ)</th>
                        <th className="py-3 px-3">Bấc / Cháy</th>
                        <th className="py-3 px-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2ECE4]">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#F4EFEB] overflow-hidden shrink-0 border border-[#ECE5DD]">
                                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-semibold text-[#2C2926]">{p.name}</p>
                                <p className="text-[11px] text-[#8C7E72] italic line-clamp-1">{p.tagline}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#524941]">
                            {p.scentFamilyLabel}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#2C2926] tabular-nums">
                            {formatVND(p.price)}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateStock(p, p.stock - 1)}
                                className="w-6 h-6 rounded bg-[#F4EFEB] hover:bg-[#EAE0D4] text-[#2C2926] flex items-center justify-center font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className={`min-w-[32px] text-center font-semibold tabular-nums ${
                                p.stock <= 5 ? 'text-[#C25E34]' : 'text-[#2C2926]'
                              }`}>
                                {p.stock}
                              </span>
                              <button
                                onClick={() => handleUpdateStock(p, p.stock + 1)}
                                className="w-6 h-6 rounded bg-[#F4EFEB] hover:bg-[#EAE0D4] text-[#2C2926] flex items-center justify-center font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#7A7066]">
                            {p.burnHours}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct({ ...p });
                                  setIsEditingProduct(true);
                                }}
                                className="p-1.5 text-[#564E46] hover:text-[#2C2926] hover:bg-[#F2ECE4] rounded-md transition-colors cursor-pointer"
                                title="Chỉnh sửa sản phẩm"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 text-[#9E948A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Xóa nến"
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

            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              
              {/* Order status filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#7A7066]">Trạng thái:</span>
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'pending', label: 'Chờ tiếp nhận' },
                  { id: 'confirmed', label: 'Đã xác nhận' },
                  { id: 'processing', label: 'Đang chế tác' },
                  { id: 'shipping', label: 'Đang giao' },
                  { id: 'completed', label: 'Hoàn thành' },
                  { id: 'cancelled', label: 'Đã hủy' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id)}
                    className={`px-3 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                      orderStatusFilter === st.id
                        ? 'bg-[#2C2926] text-white border-[#2C2926]'
                        : 'bg-white text-[#655E57] border-[#DDD3C7] hover:border-[#8C7A6B]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-[#ECE5DD] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] text-[#7E746A] border-b border-[#ECE5DD] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Mã Đơn</th>
                        <th className="py-3 px-4">Khách Hàng</th>
                        <th className="py-3 px-4">Sản Phẩm & SL</th>
                        <th className="py-3 px-3">Tổng Tiền</th>
                        <th className="py-3 px-3">Trạng Thái</th>
                        <th className="py-3 px-4 text-right">Chuyển Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2ECE4]">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#2C2926]">
                            #{ord.orderCode}
                            <p className="font-sans font-normal text-[10px] text-[#8C7E72] mt-0.5">
                              {formatDate(ord.createdAt)}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold text-[#2C2926]">{ord.customerInfo.name}</p>
                            <p className="text-[11px] text-[#7A7066]">{ord.customerInfo.phone}</p>
                            <p className="text-[11px] text-[#8C7E72] line-clamp-1 max-w-[200px]" title={ord.customerInfo.address}>
                              {ord.customerInfo.address}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <ul className="space-y-0.5 text-[11px] text-[#564E46]">
                              {ord.items.map((it, idx) => (
                                <li key={idx}>
                                  <strong>{it.quantity}x</strong> {it.name} ({it.selectedSize})
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#C25E34] tabular-nums">
                            {formatVND(ord.total)}
                            <p className="text-[10px] font-normal uppercase text-[#8C7E72]">{ord.paymentMethod}</p>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded border bg-[#FAF7F2] text-[#2C2926] border-[#E2D8CE]">
                              {ord.status === 'pending' ? 'Chờ xác nhận' :
                               ord.status === 'confirmed' ? 'Đã xác nhận' :
                               ord.status === 'processing' ? 'Đang chế tác' :
                               ord.status === 'shipping' ? 'Đang giao hàng' :
                               ord.status === 'completed' ? 'Giao thành công' : 'Đã hủy'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-xs bg-[#FBF9F5] border border-[#DDD3C7] rounded-lg px-2.5 py-1 text-[#2C2926] focus:outline-none focus:border-[#8C7A6B] cursor-pointer"
                            >
                              <option value="pending">Chờ xác nhận</option>
                              <option value="confirmed">Đã xác nhận</option>
                              <option value="processing">Đang chế tác</option>
                              <option value="shipping">Đang giao hàng</option>
                              <option value="completed">Hoàn thành</option>
                              <option value="cancelled">Hủy đơn</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: STATS & ALERTS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] shadow-xs">
                  <span className="text-xs text-[#8C7E72] font-semibold">
                    Tổng Doanh Thu Xưởng
                  </span>
                  <p className="text-2xl sm:text-3xl font-bold text-[#2C2926] mt-2 tabular-nums">
                    {stats ? formatVND(stats.totalRevenue) : '0đ'}
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-1">Từ các đơn hàng thành công & đang xử lý</p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] shadow-xs">
                  <span className="text-xs text-[#8C7E72] font-semibold">
                    Tổng Đơn Hàng Tiếp Nhận
                  </span>
                  <p className="text-2xl sm:text-3xl font-bold text-[#2C2926] mt-2 tabular-nums">
                    {stats?.totalOrders || 0}
                  </p>
                  <p className="text-[11px] text-[#7A7066] mt-1">Bao gồm toàn bộ khách lẻ & quà tặng</p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#ECE5DD] shadow-xs">
                  <span className="text-xs text-[#8C7E72] font-semibold">
                    Cảnh Báo Tồn Kho Thấp
                  </span>
                  <p className="text-2xl sm:text-3xl font-bold text-[#C25E34] mt-2 tabular-nums">
                    {stats?.lowStockCount || 0} <span className="text-sm font-normal text-[#7A7066]">loại nến</span>
                  </p>
                  <p className="text-[11px] text-[#7A7066] mt-1">Có số lượng dưới 10 hũ tại xưởng</p>
                </div>
              </div>

              {/* Low stock item list */}
              {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
                <div className="p-5 bg-white rounded-xl border border-amber-200 bg-amber-50/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Danh Sách Cần Chuẩn Bị Rót Sáp Thêm:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {stats.lowStockProducts.map((prod: any) => (
                      <div key={prod.id} className="p-3 bg-white rounded-lg border border-amber-200 flex items-center justify-between text-xs">
                        <span className="font-medium text-[#2C2926]">{prod.name}</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold tabular-nums">
                          Còn {prod.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Atelier Commitment */}
              <div className="p-6 bg-white rounded-xl border border-[#ECE5DD] space-y-2 text-xs text-[#6B6156]">
                <h4 className="font-semibold text-sm text-[#2C2926]">Tiêu chuẩn xưởng L’Aura Atelier</h4>
                <p>• Sáp đậu nành & bơ hạt mỡ tự nhiên: Đạt chứng nhận không độc tố, độ tỏa hương êm dịu, không khói muội than.</p>
                <p>• Bấc gỗ nhập khẩu tự nhiên: Được xẻ rãnh kép cho âm thanh nứt tanh tách thư giãn như ngồi trước lò sưởi ấm cúng.</p>
              </div>

            </div>
          )}

        </div>

        {/* Product Create/Edit Submodal */}
        {isEditingProduct && editingProduct && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FBF9F5] rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-[#E9E0D6] shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE5DD] mb-4">
                <h3 className="font-serif-luxury text-xl font-medium text-[#2C2926]">
                  {editingProduct.id ? 'Chỉnh Sửa Nến Thơm' : 'Thêm Nến Thơm Mới Vào Xưởng'}
                </h3>
                <button
                  onClick={() => setIsEditingProduct(false)}
                  className="p-1 text-[#7A7066] hover:text-[#2C2926]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block font-medium text-[#564E46] mb-1">Tên Nến Thơm *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="Ví dụ: Sandalwood & Golden Amber"
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Nhóm Hương (Scent Family)</label>
                    <select
                      value={editingProduct.scentFamily || 'woody'}
                      onChange={(e) => {
                        const val = e.target.value as ScentFamily;
                        const labels: Record<ScentFamily, string> = {
                          woody: 'Gỗ ấm & Hổ phách',
                          floral: 'Hoa & Thảo mộc',
                          citrus: 'Cam chanh & Tươi mới',
                          gourmand: 'Ngọt béo & Vani',
                          fresh: 'Biển & Khoáng chất'
                        };
                        setEditingProduct({
                          ...editingProduct,
                          scentFamily: val,
                          scentFamilyLabel: labels[val]
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    >
                      <option value="woody">Gỗ ấm & Hổ phách</option>
                      <option value="floral">Hoa & Thảo mộc</option>
                      <option value="citrus">Cam chanh & Tươi mới</option>
                      <option value="gourmand">Ngọt béo & Vani</option>
                      <option value="fresh">Biển & Khoáng chất</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Chủng loại hũ</label>
                    <select
                      value={editingProduct.category || 'ceramic'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    >
                      <option value="amber_glass">Hũ thủy tinh hổ phách</option>
                      <option value="ceramic">Hũ gốm mờ men ngọc</option>
                      <option value="sculptural">Nến hình thể điêu khắc</option>
                      <option value="gift_set">Hộp quà tặng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Giá bán cơ bản (VND) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Số lượng tồn kho (Hũ)</label>
                    <input
                      type="number"
                      value={editingProduct.stock ?? 20}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block font-medium text-[#564E46] mb-1">Câu đề tựa (Tagline)</label>
                    <input
                      type="text"
                      value={editingProduct.tagline || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                      placeholder="Gỗ tuyết tùng trầm mặc và hương hoa sớm mai"
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Hương đầu (phân tách dấu phẩy)</label>
                    <input
                      type="text"
                      value={editingProduct.topNotes?.join(', ') || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, topNotes: e.target.value.split(',').map(s => s.trim()) })}
                      placeholder="Cam Bergamot, Tiêu hồng"
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[#564E46] mb-1">Hương giữa (phân tách dấu phẩy)</label>
                    <input
                      type="text"
                      value={editingProduct.middleNotes?.join(', ') || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, middleNotes: e.target.value.split(',').map(s => s.trim()) })}
                      placeholder="Gỗ tuyết tùng, Hổ phách"
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block font-medium text-[#564E46] mb-1">Hương cuối (phân tách dấu phẩy)</label>
                    <input
                      type="text"
                      value={editingProduct.baseNotes?.join(', ') || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, baseNotes: e.target.value.split(',').map(s => s.trim()) })}
                      placeholder="Gỗ đàn hương Mysore, Vani"
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block font-medium text-[#564E46] mb-1">Mô tả sản phẩm</label>
                    <textarea
                      rows={2}
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926]"
                    />
                  </div>

                  <div className="col-span-2 flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="featCheck"
                      checked={Boolean(editingProduct.featured)}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      className="accent-[#2C2926]"
                    />
                    <label htmlFor="featCheck" className="text-xs text-[#2C2926] cursor-pointer">
                      Đánh dấu là Nến Tuyển Chọn Nổi Bật (Featured Atelier)
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ECE5DD] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProduct(false)}
                    className="px-4 py-2 bg-white border border-[#DDD3C7] rounded-lg text-[#2C2926] hover:bg-[#F2ECE4]"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2C2926] text-white rounded-lg font-semibold hover:bg-[#453F39]"
                  >
                    Lưu Nến Thơm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
