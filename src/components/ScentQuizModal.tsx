import React, { useState } from 'react';
import { X, Sparkles, Flame, ArrowRight, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAdd
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedAroma, setSelectedAroma] = useState<string>('');
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const spaces = [
    { id: 'bedroom', title: 'Phòng Ngủ & Nghỉ Ngơi', desc: 'Không gian tĩnh lặng, cần hương dịu xoa dịu giấc ngủ' },
    { id: 'workspace', title: 'Bàn Làm Việc & Đọc Sách', desc: 'Cần sự tỉnh táo, thanh lọc trí não và tăng tập trung' },
    { id: 'livingroom', title: 'Phòng Khách Ấm Cúng', desc: 'Tạo dấu ấn tiếp khách tinh tế, ấm áp và sang trọng' },
    { id: 'spa', title: 'Góc Thiền / Yoga / Spa', desc: 'Cân bằng năng lượng, xua tan áp lực bộn bề' }
  ];

  const moods = [
    { id: 'relax', title: 'Giảm Stress & Xoa Dịu', desc: 'Cần một góc bình yên, vỗ về tâm trạng sau ngày dài' },
    { id: 'focus', title: 'Hứng Khởi & Sáng Tạo', desc: 'Đánh thức năng lượng mới, tinh thần sảng khoái' },
    { id: 'cozy', title: 'Ấm Áp & Lãng Mạn', desc: 'Ngọt ngào như chiếc chăn cashmere buổi tối mùa đông' },
    { id: 'fresh', title: 'Thanh Khiết & Thoáng Đãng', desc: 'Hơi thở thiên nhiên nguyên sơ, sạch sẽ tinh tươm' }
  ];

  const aromas = [
    { id: 'woody', title: 'Gỗ Tuyết Tùng & Đàn Hương', desc: 'Trầm ấm, cổ kính, tĩnh tại' },
    { id: 'floral', title: 'Hoa Lài Trắng & Trà Sớm', desc: 'Thanh tao, tao nhã, ngát hương sương mai' },
    { id: 'citrus', title: 'Vỏ Quýt & Hoa Cam Neroli', desc: 'Tươi tắn, mọng nước, tràn ngập ánh nắng' },
    { id: 'gourmand', title: 'Vani Bourbon & Hạnh Nhân', desc: 'Béo bùi, ấm nồng, ngọt dịu say mê' }
  ];

  const handleFinish = (chosenAroma: string) => {
    setSelectedAroma(chosenAroma);

    // Matching logic
    let matched = products.find(p => p.scentFamily === chosenAroma);
    if (!matched && selectedMood === 'cozy') {
      matched = products.find(p => p.scentFamily === 'gourmand' || p.scentFamily === 'woody');
    }
    if (!matched && selectedMood === 'focus') {
      matched = products.find(p => p.scentFamily === 'citrus' || p.scentFamily === 'fresh');
    }
    if (!matched) {
      matched = products[0];
    }

    setRecommendedProduct(matched || products[0]);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedSpace('');
    setSelectedMood('');
    setSelectedAroma('');
    setRecommendedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E0D6] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#564E46] hover:text-[#2C2926] rounded-full shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-xs text-[#8C7A6B] font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Scent Matchmaker</span>
            </span>
            <h2 className="font-serif-luxury text-3xl font-semibold text-[#2C2926] mt-1">
              Khám Phá Hương Nến Dành Riêng Cho Bạn
            </h2>
            <p className="text-xs text-[#7A7066] mt-1">
              Chỉ 3 câu hỏi nhanh giúp bạn tìm ra nốt hương hòa hợp nhất với cảm xúc & không gian
            </p>
          </div>

          {/* Step 1: Space */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-semibold">
                <span>Bước 1 / 3: Không gian thắp nến</span>
                <span>Tiến độ 33%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spaces.map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpace(sp.id);
                      setStep(2);
                    }}
                    className="p-4 rounded-xl border border-[#DDD3C7] bg-white hover:border-[#2C2926] hover:bg-[#FAF7F2] text-left transition-all cursor-pointer group"
                  >
                    <p className="font-serif text-base font-medium text-[#2C2926] group-hover:text-[#8C5D30]">
                      {sp.title}
                    </p>
                    <p className="text-xs text-[#7A7066] mt-1">
                      {sp.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Mood */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-semibold">
                <span>Bước 2 / 3: Tâm trạng bạn mong muốn</span>
                <span>Tiến độ 66%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {moods.map((md) => (
                  <button
                    key={md.id}
                    type="button"
                    onClick={() => {
                      setSelectedMood(md.id);
                      setStep(3);
                    }}
                    className="p-4 rounded-xl border border-[#DDD3C7] bg-white hover:border-[#2C2926] hover:bg-[#FAF7F2] text-left transition-all cursor-pointer group"
                  >
                    <p className="font-serif text-base font-medium text-[#2C2926] group-hover:text-[#8C5D30]">
                      {md.title}
                    </p>
                    <p className="text-xs text-[#7A7066] mt-1">
                      {md.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Aroma Preference */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-[#8C7A6B] font-semibold">
                <span>Bước 3 / 3: Hương vị thiên nhiên yêu thích</span>
                <span>Tiến độ 100%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aromas.map((ar) => (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => handleFinish(ar.id)}
                    className="p-4 rounded-xl border border-[#DDD3C7] bg-white hover:border-[#2C2926] hover:bg-[#FAF7F2] text-left transition-all cursor-pointer group"
                  >
                    <p className="font-serif text-base font-medium text-[#2C2926] group-hover:text-[#8C5D30]">
                      {ar.title}
                    </p>
                    <p className="text-xs text-[#7A7066] mt-1">
                      {ar.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Recommendation Result */}
          {step === 4 && recommendedProduct && (
            <div className="space-y-6 text-center animate-in zoom-in-95">
              <div className="p-6 bg-white border border-[#EAE2D8] rounded-2xl shadow-sm text-left flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-44 aspect-square rounded-xl bg-[#F4EFEB] overflow-hidden shrink-0 border border-[#ECE5DD]">
                  <img
                    src={recommendedProduct.images[0]}
                    alt={recommendedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="text-[11px] font-semibold text-[#A67C52]">
                    Khuyên Dùng Cho Bạn · {recommendedProduct.scentFamilyLabel}
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-[#2C2926]">
                    {recommendedProduct.name}
                  </h3>
                  <p className="text-xs text-[#6B6156] leading-relaxed">
                    {recommendedProduct.description}
                  </p>
                  <p className="text-xs text-[#82756A] italic">
                    Nốt hương: {recommendedProduct.topNotes.slice(0, 2).join(', ')} · {recommendedProduct.middleNotes.slice(0, 2).join(', ')}
                  </p>
                  <div className="pt-2 text-base font-bold text-[#2C2926] tabular-nums">
                    {formatVND(recommendedProduct.price)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onSelectProduct(recommendedProduct);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2C2926] text-white text-xs font-semibold rounded-xl hover:bg-[#453F39] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Xem Chi Tiết Mùi Hương Này</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onQuickAdd(recommendedProduct);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C25E34] text-white text-xs font-semibold rounded-xl hover:bg-[#A84E27] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Flame className="w-4 h-4" />
                  <span>Thêm Ngay Vào Giỏ</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-3 text-[#7A7066] hover:text-[#2C2926] transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chọn Lại</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
