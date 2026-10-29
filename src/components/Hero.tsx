import React from 'react';
import { ArrowDown, Flame, Sparkles, Feather } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuizClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#24201D] text-[#F9F6F0]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg"
          alt="Xưởng chế tác nến thơm thủ công L'Aura Atelier"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B19] via-[#24201D]/70 to-[#24201D]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36">
        <div className="max-w-3xl">
          
          {/* Subtle text kicker (No pill badge, natural letter spacing) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#E2B184] font-medium mb-4">
            <span>Chế tác thủ công</span>
            <span aria-hidden="true" className="text-[#A4998D]">·</span>
            <span>100% Sáp thực vật</span>
            <span aria-hidden="true" className="text-[#A4998D]">·</span>
            <span>Bấc gỗ nứt tanh tách</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.25] text-[#FAF8F5] mb-6 [text-wrap:balance]">
            Hương thơm khơi nguồn an yên cho từng góc nhỏ không gian sống
          </h1>

          <p className="text-base sm:text-lg text-[#D2C8BF] leading-relaxed mb-10 max-w-2xl font-light">
            Mỗi hũ nến tại L’Aura Atelier được rót tay cẩn trọng từ sáp đậu nành & bơ hạt mỡ tự nhiên, hòa quyện cùng tinh dầu nước hoa Pháp cao cấp mang lại cảm giác xoa dịu tâm trí sâu lắng.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 bg-[#E2B184] hover:bg-[#D5A070] text-[#241E1A] font-medium text-sm rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Xem Bộ Sưu Tập Nến</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onQuizClick}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-[#FAF8F5] font-medium text-sm rounded-lg border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E2B184]" />
              <span>Gợi Ý Mùi Hương (Scent Quiz)</span>
            </button>
          </div>

          {/* Claim-to-Proof Adjacency Row */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#C7BCB1]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E2B184] shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Bấc gỗ tự nhiên</p>
                <p className="text-[#A4998D]">Phát tiếng nứt tanh tách êm dịu</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E2B184] shrink-0">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">45–75 Giờ Cháy Sạch</p>
                <p className="text-[#A4998D]">Không khói đen, không độc hại</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E2B184] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Hương Thơm 3 Tầng</p>
                <p className="text-[#A4998D]">Top, Heart & Base notes đạt chuẩn</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
