import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, User as UserIcon, Shield, Search, Sparkles, ChevronDown, LogOut, ArrowRightLeft, Package } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenOrders: () => void;
  onOpenQuiz: () => void;
  onSearchFocus: () => void;
  onScrollToCatalog: () => void;
  onScrollToStory: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenAdmin,
  onOpenOrders,
  onOpenQuiz,
  onSearchFocus,
  onScrollToCatalog,
  onScrollToStory,
  onLogout
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#ECE5DD] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#2C2926]">
            L'AURA ATELIER
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#655E57]">
          <button
            onClick={onScrollToCatalog}
            className="hover:text-[#2C2926] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#8C7A6B]"
          >
            Bộ Sưu Tập Nến
          </button>
          
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 hover:text-[#2C2926] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#8C7A6B]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
            <span>Scent Finder</span>
          </button>

          <button
            onClick={onScrollToStory}
            className="hover:text-[#2C2926] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#8C7A6B]"
          >
            Nghệ Thuật Sáp & Bấc
          </button>

          <button
            onClick={onOpenOrders}
            className="hover:text-[#2C2926] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#8C7A6B]"
          >
            Kiểm Tra Đơn Hàng
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onSearchFocus}
            title="Tìm kiếm nến thơm"
            aria-label="Tìm kiếm nến thơm"
            className="p-2 text-[#655E57] hover:text-[#2C2926] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7C4A27] bg-[#F6EDE4] border border-[#E7D6C4] rounded-lg hover:bg-[#EFE2D6] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Quản Trị</span>
            </button>
          )}

          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer border ${
                  isUserMenuOpen
                    ? 'bg-[#EFE6DC] border-[#D9C8B5] shadow-xs'
                    : 'bg-[#F7F2EB] hover:bg-[#EFE7DE] border-[#E8DDD1] text-[#2C2926]'
                }`}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2C2926] text-[#F5EFE8] flex items-center justify-center font-serif font-bold text-xs shadow-xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-semibold text-[#2C2926] max-w-[110px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-[#8C7A6B]">
                    {currentUser.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[#8C7A6B] transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 py-2 bg-white rounded-2xl shadow-2xl border border-[#E8DFD5] z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Account Info Header */}
                  <div className="px-4 py-3 border-b border-[#F4EFEB] bg-[#FAF7F2]/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#2C2926] text-[#F5EFE8] flex items-center justify-center font-serif font-bold text-sm">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[#2C2926] truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-[#7E746A] truncate">{currentUser.email}</p>
                        <span className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          currentUser.role === 'admin' 
                            ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          {currentUser.role === 'admin' ? 'Quyền Quản Trị Viên' : 'Khách Hàng Thành Viên'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions List */}
                  <div className="py-1">
                    {currentUser.role === 'admin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenAdmin();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#2C2926] hover:bg-[#FAF7F2] flex items-center gap-2.5 cursor-pointer font-medium transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#A66E38]" />
                        <span>Bảng Quản Trị Xưởng & Tồn Kho</span>
                      </button>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenOrders();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#2C2926] hover:bg-[#FAF7F2] flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#8C7A6B]" />
                      <span>Lịch sử & Theo dõi đơn hàng</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#7A5B3E] hover:bg-[#FAF5EF] flex items-center gap-2.5 cursor-pointer transition-colors font-medium border-t border-[#F4EFEB]"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-[#A67C52]" />
                      <span>Đổi / Đăng nhập tài khoản khác</span>
                    </button>
                  </div>
                  
                  {/* Logout Button */}
                  <div className="pt-1 border-t border-[#F4EFEB] px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Đăng xuất tài khoản này</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2C2926] bg-[#F2ECE4] hover:bg-[#EAE0D4] border border-[#DDD3C7] rounded-xl transition-colors cursor-pointer"
            >
              <UserIcon className="w-4 h-4 text-[#8C7A6B]" />
              <span>Đăng nhập</span>
            </button>
          )}

          {/* Cart action button */}
          <button
            onClick={onOpenCart}
            aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}
            className="relative flex items-center justify-center p-2.5 bg-[#2C2926] text-[#FBF9F5] rounded-full hover:bg-[#433E39] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#C25E34] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
