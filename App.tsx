/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ScentQuizModal } from './components/ScentQuizModal';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { Product, ProductSizeOption, CartItem, User, Order } from './types';
import { api } from './services/api';

const CART_STORAGE_KEY = 'laura_candle_cart_v1';
const USER_STORAGE_KEY = 'laura_candle_user_v1';

export default function App() {
  // Global States
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [targetOrderForTracking, setTargetOrderForTracking] = useState<Order | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScentFamily, setSelectedScentFamily] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Notification Banner
  const [toastMsg, setToastMsg] = useState('');

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Load products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.scentFamilyLabel.toLowerCase().includes(q) ||
        p.topNotes.some(n => n.toLowerCase().includes(q)) ||
        p.middleNotes.some(n => n.toLowerCase().includes(q)) ||
        p.baseNotes.some(n => n.toLowerCase().includes(q))
      );
    }

    // Scent family
    if (selectedScentFamily !== 'all') {
      result = result.filter(p => p.scentFamily === selectedScentFamily);
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Size
    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes.some(s => s.size === selectedSize));
    }

    // Price range
    if (priceRange === 'under_350k') {
      result = result.filter(p => p.price < 350000);
    } else if (priceRange === '350k_450k') {
      result = result.filter(p => p.price >= 350000 && p.price <= 450000);
    } else if (priceRange === 'above_450k') {
      result = result.filter(p => p.price > 450000);
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedScentFamily, selectedCategory, selectedSize, priceRange, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, size: ProductSizeOption, quantity: number) => {
    const unitPrice = Math.round(product.price * size.priceMultiplier);
    const cartItemId = `${product.id}-${size.size}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          product,
          selectedSize: size,
          unitPrice,
          quantity
        }
      ];
    });

    triggerToast(`Đã thêm ${quantity}x "${product.name}" vào giỏ hàng`);
  };

  const handleQuickAdd = (product: Product) => {
    const standardSize = product.sizes[1] || product.sizes[0];
    handleAddToCart(product, standardSize, 1);
  };

  const handleBuyNow = (product: Product, size: ProductSizeOption, quantity: number) => {
    handleAddToCart(product, size, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleApplyDiscount = (code: string) => {
    setDiscountCode(code);
    const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    setDiscountAmount(Math.round(subtotal * 0.1)); // 10% off
  };

  const handleOrderSuccess = (order: Order) => {
    setCartItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
    fetchProducts(); // Refresh stock
    setTargetOrderForTracking(order);
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedScentFamily('all');
    setSelectedCategory('all');
    setSelectedSize('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  const handleSearchFocus = () => {
    const el = document.getElementById('candle-search-input');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2C2926]">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C2926] text-white px-5 py-3 rounded-xl shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E2B184]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentUser={currentUser}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrders={() => {
          setTargetOrderForTracking(null);
          setIsOrderHistoryOpen(true);
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSearchFocus={handleSearchFocus}
        onScrollToCatalog={handleScrollToCatalog}
        onScrollToStory={handleScrollToStory}
        onLogout={() => {
          setCurrentUser(null);
          triggerToast('Đã đăng xuất tài khoản');
        }}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleScrollToCatalog}
        onQuizClick={() => setIsQuizOpen(true)}
      />

      {/* Main Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        
        {/* Search & Filter Controls */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedScentFamily={selectedScentFamily}
          onScentFamilyChange={setSelectedScentFamily}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        {loadingProducts ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#8C7A6B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#7A7066]">Đang tải bộ sưu tập nến thơm L’Aura...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#ECE5DD] p-8 max-w-md mx-auto my-6">
            <p className="font-serif-luxury text-xl text-[#2C2926] mb-2">
              Không tìm thấy mùi hương phù hợp
            </p>
            <p className="text-xs text-[#7A7066] mb-6">
              Bạn hãy thử điều chỉnh hoặc xóa bớt tiêu chí lọc để khám phá các dòng nến thơm khác của xưởng.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#2C2926] text-white text-xs font-semibold rounded-lg hover:bg-[#453F39] transition-colors cursor-pointer"
            >
              Xóa Toàn Bộ Bộ Lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}

      </main>

      {/* Craftsmanship & Brand Story */}
      <StorySection />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountAmount={discountAmount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
        onViewOrder={(order) => {
          setTargetOrderForTracking(order);
          setIsOrderHistoryOpen(true);
        }}
      />

      {/* Order History / Tracking Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => {
          setIsOrderHistoryOpen(false);
          setTargetOrderForTracking(null);
        }}
        currentUser={currentUser}
        targetOrder={targetOrderForTracking}
        onLogout={() => {
          setCurrentUser(null);
          triggerToast('Đã đăng xuất tài khoản');
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          triggerToast('Đã đăng xuất tài khoản');
        }}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          triggerToast(`Chào mừng ${user.name} đã trở lại!`);
        }}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChanged={fetchProducts}
      />

      {/* Scent Finder Quiz */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

    </div>
  );
}
