import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ScentFamily, ProductCategory } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedScentFamily: string;
  onScentFamilyChange: (scent: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const SCENT_FAMILIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất cả mùi hương' },
  { id: 'woody', label: 'Gỗ ấm & Hổ phách' },
  { id: 'floral', label: 'Hoa & Thảo mộc' },
  { id: 'citrus', label: 'Cam chanh & Tươi mới' },
  { id: 'gourmand', label: 'Ngọt béo & Vani' },
  { id: 'fresh', label: 'Biển & Khoáng chất' }
];

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất cả chủng loại' },
  { id: 'amber_glass', label: 'Hũ thủy tinh hổ phách' },
  { id: 'ceramic', label: 'Hũ gốm mờ men ngọc' },
  { id: 'sculptural', label: 'Nến hình thể nghệ thuật' },
  { id: 'gift_set', label: 'Bộ quà tặng cao cấp' }
];

const SIZES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất cả size' },
  { id: '100g', label: '100g (~22h)' },
  { id: '200g', label: '200g (~45h)' },
  { id: '350g', label: '350g (~75h)' }
];

const PRICE_RANGES: { id: string; label: string }[] = [
  { id: 'all', label: 'Tất cả mức giá' },
  { id: 'under_350k', label: 'Dưới 350.000₫' },
  { id: '350k_450k', label: '350.000₫ – 450.000₫' },
  { id: 'above_450k', label: 'Trên 450.000₫' }
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedScentFamily,
  onScentFamilyChange,
  selectedCategory,
  onCategoryChange,
  selectedSize,
  onSizeChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortByChange,
  onResetFilters,
  totalResults
}) => {
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedScentFamily !== 'all' ||
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    priceRange !== 'all';

  return (
    <div id="catalog-section" className="space-y-6 pt-12 pb-4">
      
      {/* Header and Live Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C2926] font-semibold">
            Bộ Sưu Tập Nến Thơm
          </h2>
          <p className="text-sm text-[#7A7168] mt-1">
            Tìm thấy <span className="font-semibold text-[#2C2926] tabular-nums">{totalResults}</span> tác phẩm nến thủ công
          </p>
        </div>

        {/* Search input field */}
        <div className="relative w-full md:w-80">
          <input
            id="candle-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên nến, nốt hương (gỗ, lài, thông...)"
            className="w-full pl-10 pr-9 py-2.5 text-xs bg-white border border-[#E2D8CE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]/30 focus:border-[#8C7A6B] text-[#2C2926] placeholder-[#A3998F] transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-[#8F8479] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8479] hover:text-[#2C2926] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scent Family Segmented Tabs */}
      <div>
        <div className="text-xs font-semibold text-[#8C7A6B] mb-2.5 flex items-center justify-between">
          <span>Nhóm Mùi Hương (Scent Family)</span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[#C25E34] hover:text-[#9A4621] text-xs font-normal normal-case flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {SCENT_FAMILIES.map((scent) => {
            const isActive = selectedScentFamily === scent.id;
            return (
              <button
                key={scent.id}
                onClick={() => onScentFamilyChange(scent.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-[#2C2926] text-[#FAF8F5] border-[#2C2926] shadow-sm'
                    : 'bg-white text-[#655E57] border-[#E8DFD5] hover:border-[#8C7A6B] hover:text-[#2C2926]'
                }`}
              >
                {scent.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filters row: Category, Size, Price, Sort */}
      <div className="p-4 bg-[#F5EFE8]/70 border border-[#E9E0D6] rounded-xl flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#7A7168]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span>Lọc chi tiết:</span>
          </div>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="text-xs bg-white border border-[#DDD3C7] rounded-lg px-3 py-1.5 text-[#2C2926] focus:outline-none focus:border-[#8C7A6B] cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Size Select */}
          <select
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
            className="text-xs bg-white border border-[#DDD3C7] rounded-lg px-3 py-1.5 text-[#2C2926] focus:outline-none focus:border-[#8C7A6B] cursor-pointer"
          >
            {SIZES.map((sz) => (
              <option key={sz.id} value={sz.id}>
                {sz.label}
              </option>
            ))}
          </select>

          {/* Price Range Select */}
          <select
            value={priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="text-xs bg-white border border-[#DDD3C7] rounded-lg px-3 py-1.5 text-[#2C2926] focus:outline-none focus:border-[#8C7A6B] cursor-pointer"
          >
            {PRICE_RANGES.map((pr) => (
              <option key={pr.id} value={pr.id}>
                {pr.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#7A7168]" />
          <span className="text-xs text-[#7A7168]">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="text-xs bg-white border border-[#DDD3C7] rounded-lg px-3 py-1.5 text-[#2C2926] focus:outline-none focus:border-[#8C7A6B] cursor-pointer font-medium"
          >
            <option value="featured">Nổi bật nhất</option>
            <option value="price_asc">Giá: Thấp đến cao</option>
            <option value="price_desc">Giá: Cao đến thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>

      </div>

    </div>
  );
};
