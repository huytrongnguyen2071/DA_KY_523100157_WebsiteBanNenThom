import React, { useState } from 'react';
import { X, User as UserIcon, Lock, Mail, Phone, MapPin, Shield, Check, LogOut, ArrowRightLeft } from 'lucide-react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  currentUser?: User | null;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  onLogout
}) => {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await api.login(email, password);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Email hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await api.register({ name, email, password, phone, address });
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi tạo tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Logins
  const handleQuickCustomer = async () => {
    try {
      setLoading(true);
      const res = await api.login('huong.lan@gmail.com', 'user123');
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdmin = async () => {
    try {
      setLoading(true);
      const res = await api.login('admin@laura.vn', 'admin123');
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng tài khoản"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#564E46] hover:text-[#2C2926] rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-5">
            <span className="font-serif-luxury text-2xl font-bold text-[#2C2926]">
              L'AURA ATELIER
            </span>
            <p className="text-xs text-[#7A7066] mt-1">
              {currentUser
                ? 'Đang đăng nhập - Bạn có thể chuyển sang tài khoản khác hoặc đăng xuất'
                : isRegister
                ? 'Tạo tài khoản thành viên để lưu địa chỉ và theo dõi đơn'
                : 'Đăng nhập vào không gian thành viên'}
            </p>
          </div>

          {/* Active Account Status Bar (if logged in) */}
          {currentUser && (
            <div className="mb-5 p-3.5 bg-[#FAF4ED] border border-[#E8D9C9] rounded-xl flex items-center justify-between gap-3 text-xs shadow-xs">
              <div className="overflow-hidden">
                <p className="text-[10px] text-[#8C7A6B] font-semibold uppercase tracking-wider">
                  Tài khoản hiện tại:
                </p>
                <p className="font-bold text-[#2C2926] truncate">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-[#7E746A] truncate">
                  {currentUser.email} · <span className="font-medium text-[#A67C52]">{currentUser.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</span>
                </p>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                  }}
                  className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Đăng xuất</span>
                </button>
              )}
            </div>
          )}

          {/* Tab Switcher */}
          <div className="flex bg-[#EFE9E1] p-1 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                !isRegister ? 'bg-white text-[#2C2926] shadow-xs' : 'text-[#73685E] hover:text-[#2C2926]'
              }`}
            >
              {currentUser ? 'Chuyển / Đăng Nhập Khác' : 'Đăng Nhập'}
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setErrorMsg(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isRegister ? 'bg-white text-[#2C2926] shadow-xs' : 'text-[#73685E] hover:text-[#2C2926]'
              }`}
            >
              Đăng Ký Mới
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Quick Demo Login Preset Bar */}
          {!isRegister && (
            <div className="mb-5 p-3.5 bg-white border border-[#E8DFD5] rounded-xl space-y-2">
              <p className="text-[11px] font-semibold text-[#8C7A6B] text-center">
                {currentUser ? 'Chuyển nhanh sang tài khoản thử nghiệm:' : 'Đăng nhập nhanh thử nghiệm:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickCustomer}
                  className="py-2 px-3 text-xs bg-[#F5EFE8] hover:bg-[#EAE0D4] text-[#2C2926] rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#8C7A6B]" />
                  <span>Khách Hàng</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickAdmin}
                  className="py-2 px-3 text-xs bg-[#2C2926] hover:bg-[#453F39] text-[#FAF8F5] rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#D8B998]" />
                  <span>Quản Trị (Admin)</span>
                </button>
              </div>
            </div>
          )}

          {/* Login Form */}
          {!isRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tenban@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7A6B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#2C2926] text-white rounded-xl text-xs font-semibold hover:bg-[#453F39] disabled:opacity-50 transition-colors cursor-pointer shadow-sm"
              >
                {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Trần Minh Thư"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="minhthu@gmail.com"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Mật khẩu *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#564E46] mb-1">
                  Địa chỉ giao hàng mặc định
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, đường, phường, quận..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3C7] rounded-lg focus:outline-none focus:border-[#8C7A6B] text-[#2C2926]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#C25E34] text-white rounded-xl text-xs font-semibold hover:bg-[#A84E27] disabled:opacity-50 transition-colors cursor-pointer shadow-sm mt-2"
              >
                {loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản Mới'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
