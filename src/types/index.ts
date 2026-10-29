export type Role = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
  createdAt: string;
}

export type ScentFamily = 'woody' | 'floral' | 'citrus' | 'gourmand' | 'fresh';
export type ProductCategory = 'ceramic' | 'amber_glass' | 'sculptural' | 'gift_set';

export interface ProductSizeOption {
  size: string; // e.g., '100g', '200g', '350g'
  label: string; // e.g., 'Tiêu chuẩn (200g)'
  burnHours: string; // e.g., '~45 giờ'
  priceMultiplier: number; // e.g. 1, 0.7, 1.65
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  scentFamily: ScentFamily;
  scentFamilyLabel: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  description: string;
  story: string;
  price: number; // in VND
  originalPrice?: number;
  stock: number;
  sizes: ProductSizeOption[];
  waxType: string;
  wickType: string;
  burnHours: string;
  roomSuitability: string;
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  cartItemId: string; // generated client-side: productId + '-' + selectedSize
  productId: string;
  product: Product;
  selectedSize: ProductSizeOption;
  unitPrice: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipping' | 'completed' | 'cancelled';
export type PaymentMethod = 'cod' | 'banking' | 'momo';

export interface OrderItem {
  productId: string;
  name: string;
  selectedSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  note?: string;
}

export interface OrderTimelineItem {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  orderCode: string;
  userId: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineItem[];
}
