import { Product, Order, User, OrderStatus } from '../types';

export const api = {
  // Products
  async getProducts(params?: {
    category?: string;
    scentFamily?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sort?: string;
    featured?: boolean;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
    }
    const res = await fetch(`/api/products?${query.toString()}`);
    if (!res.ok) throw new Error('Không thể tải danh sách sản phẩm');
    return res.json();
  },

  async getProduct(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
    return res.json();
  },

  async createProduct(data: Partial<Product>): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Lỗi tạo sản phẩm');
    }
    return res.json();
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Lỗi cập nhật sản phẩm');
    }
    return res.json();
  },

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Lỗi xóa sản phẩm');
    }
    return res.json();
  },

  // Orders
  async getOrders(userId?: string): Promise<Order[]> {
    const url = userId ? `/api/orders?userId=${encodeURIComponent(userId)}` : '/api/orders';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Không thể tải danh sách đơn hàng');
    return res.json();
  },

  async getOrder(id: string): Promise<Order> {
    const res = await fetch(`/api/orders/${id}`);
    if (!res.ok) throw new Error('Không tìm thấy đơn hàng');
    return res.json();
  },

  async createOrder(orderData: any): Promise<{ success: boolean; order: Order }> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Lỗi tạo đơn hàng');
    }
    return res.json();
  },

  async updateOrderStatus(id: string, status: OrderStatus, note?: string): Promise<{ success: boolean; order: Order }> {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Lỗi cập nhật trạng thái đơn');
    }
    return res.json();
  },

  // Auth
  async login(email: string, password?: string): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Đăng nhập không thành công');
    }
    return res.json();
  },

  async register(data: { name: string; email: string; password: string; phone?: string; address?: string }): Promise<{ success: boolean; user: User }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Đăng ký không thành công');
    }
    return res.json();
  },

  // Admin stats & reset
  async getStats() {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Lỗi lấy thống kê');
    return res.json();
  },

  async resetSeed() {
    const res = await fetch('/api/seed/reset', { method: 'POST' });
    return res.json();
  }
};
