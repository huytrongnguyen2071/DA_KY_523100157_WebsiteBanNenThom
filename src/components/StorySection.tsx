import React from 'react';
import { Flame, Sparkles, Droplets, Feather } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story-section" className="py-20 sm:py-28 bg-[#F4EFEB] border-y border-[#ECE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#8C7A6B]">
            Triết Lý Chế Tác Atelier
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2926] mt-2 [text-wrap:balance]">
            Nghệ thuật thắp sáng sự bình an từ những nguyên liệu thuần khiết
          </h2>
          <p className="text-sm text-[#73695E] mt-4 leading-relaxed font-light">
            Tại L’Aura Atelier, chúng tôi tin rằng một hũ nến không chỉ đơn thuần là ánh sáng hay mùi hương, mà là nghi thức nhỏ đánh dấu khoảnh khắc bạn trở về với chính mình.
          </p>
        </div>

        {/* 3 Craftsmanship Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#FBF9F5] p-8 rounded-2xl border border-[#E8DFD5] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#EFE7DD] text-[#8C5D30] flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-[#2C2926]">
              100% Sáp Thực Vật Hữu Cơ
            </h3>
            <p className="text-xs text-[#6B6156] leading-relaxed">
              Chúng tôi cự tuyệt hoàn toàn sáp paraffin từ dầu mỏ. Toàn bộ nến được rót từ hỗn hợp sáp đậu nành biến tính tự nhiên cùng bơ hạt mỡ organic, giúp sáp tan chảy ở nhiệt độ thấp và tỏa hương dịu êm.
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-8 rounded-2xl border border-[#E8DFD5] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#EFE7DD] text-[#8C5D30] flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-[#2C2926]">
              Bấc Gỗ Tự Nhiên Nứt Tách
            </h3>
            <p className="text-xs text-[#6B6156] leading-relaxed">
              Bấc nến được làm từ gỗ phong bản địa xẻ rãnh kép. Khi thắp sáng, ngọn lửa cháy êm kèm theo âm thanh nứt tanh tách nhẹ nhàng như lò sưởi mùa đông, xoa dịu đôi tai và giảm âu lo.
            </p>
          </div>

          <div className="bg-[#FBF9F5] p-8 rounded-2xl border border-[#E8DFD5] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#EFE7DD] text-[#8C5D30] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-medium text-[#2C2926]">
              Tinh Dầu Thượng Hạng Grasse
            </h3>
            <p className="text-xs text-[#6B6156] leading-relaxed">
              Các tầng hương được pha trộn độc bản từ tinh dầu nhập khẩu Grasse (Pháp) và thảo mộc Việt Nam, đạt chứng nhận an toàn IFRA quốc tế, không chứa phthalate hay chì độc hại.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
