import React, { useState } from 'react';
import { Mail, Check, Phone, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#24201D] text-[#C4B7AA] border-t border-[#352F2B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif-luxury text-2xl font-bold text-[#FAF8F5]">
              L'AURA ATELIER
            </span>
            <p className="text-xs text-[#A89C8F] leading-relaxed max-w-sm">
              Xưởng nến thơm nghệ thuật & thủ công. Chắt chiu tinh dầu tự nhiên, sáp đậu nành và bấc gỗ để mang lại cảm giác vỗ về cho không gian sống hiện đại.
            </p>
            <div className="space-y-1.5 text-xs text-[#B5A89B] pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8B998]" />
                <span>Atelier: 88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8B998]" />
                <span>Hotline xưởng: 0988 776 655 (09:00 - 21:00)</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF8F5]">
              Về Chúng Tôi
            </h4>
            <ul className="space-y-2 text-[#A89C8F]">
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Bộ sưu tập nến thơm</a></li>
              <li><a href="#story-section" className="hover:text-white transition-colors">Nghệ thuật sáp & bấc gỗ</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Chính sách bảo hành & đổi trả 7 ngày</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Dịch vụ quà tặng doanh nghiệp</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF8F5]">
              Nhận Thư Từ Atelier
            </h4>
            <p className="text-[#A89C8F] text-xs">
              Đăng ký nhận thông báo về những đợt rót nến số lượng giới hạn theo mùa và ưu đãi 10%.
            </p>
            
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-lg flex items-center gap-2 text-xs">
                <Check className="w-4 h-4" />
                <span>Cảm ơn bạn đã đăng ký nhận tin!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8F8479] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#8F8479] focus:outline-none focus:border-[#D8B998]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#D8B998] text-[#24201D] font-semibold text-xs rounded-lg hover:bg-[#C8A988] transition-colors cursor-pointer"
                >
                  Đăng Ký
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8C8075] text-[11px]">
          <p>© 2026 L'AURA Atelier. Bản quyền thuộc về thương hiệu nến thơm L'Aura.</p>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn IFRA Quốc Tế</span>
            <span>·</span>
            <span>100% Thuần Chay & Không Thử Nghiệm Trên Động Vật</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
