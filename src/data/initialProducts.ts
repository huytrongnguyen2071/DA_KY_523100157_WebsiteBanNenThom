import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'laura-san-01',
    name: 'Sandalwood & Golden Amber',
    tagline: 'Gỗ đàn hương hoàng hôn & hổ phách ấm nồng',
    category: 'amber_glass',
    scentFamily: 'woody',
    scentFamilyLabel: 'Gỗ ấm & Hổ phách',
    topNotes: ['Cam Bergamot Calabria', 'Nhục đậu khấu', 'Hạt tiêu hồng'],
    middleNotes: ['Gỗ tuyết tùng Virginia', 'Hổ phách vàng', 'Nhựa cây bồ đề'],
    baseNotes: ['Gỗ đàn hương Mysore', 'Vani Madagascar', 'Xạ hương trắng'],
    description: 'Chiếc nến thủy tinh hổ phách mang đậm hơi thở của chiều hoàng hôn tĩnh lặng. Hòa quyện giữa gỗ đàn hương Mysore êm dịu cùng hổ phách ấm áp và tia ngọt nhẹ của vani.',
    story: 'Lấy cảm hứng từ những xưởng mộc cổ kính xứ Florence lúc chạng vạng, khi ánh mặt trời rọi qua từng thớ gỗ bách niên.',
    price: 390000,
    originalPrice: 450000,
    stock: 24,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: '100% Sáp đậu nành hữu cơ & bơ hạt mỡ',
    wickType: 'Bấc gỗ tự nhiên nứt tanh tách như lò sưởi',
    burnHours: '45 - 50 giờ',
    roomSuitability: 'Phòng đọc sách, phòng ngủ, không gian 20-35m²',
    images: [
      '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg',
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg'
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'laura-jas-02',
    name: 'White Jasmine & Imperial Tea',
    tagline: 'Hoa lài sương mai & trà trắng thanh tao',
    category: 'ceramic',
    scentFamily: 'floral',
    scentFamilyLabel: 'Hoa & Thảo mộc',
    topNotes: ['Trà trắng Bạch Hào', 'Chanh vàng Sorrento', 'Búp lê non'],
    middleNotes: ['Hoa nhài Sambac', 'Hoa linh lan trắng', 'Hoa mẫu đơn'],
    baseNotes: ['Gỗ tuyết tùng trắng', 'Xạ hương tơ lụa', 'Hổ phách trong'],
    description: 'Chứa trong hũ gốm mờ làm thủ công men ngọc, hương thơm thanh khiết của đồi chè ngậm sương kết hợp hoa nhài nở lúc bình minh.',
    story: 'Tái hiện khu vườn trà trên đỉnh cao nguyên vào sớm đầu xuân, khi những giọt sương đọng trên cánh hoa nhài vừa hé nở.',
    price: 420000,
    originalPrice: 480000,
    stock: 18,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: '100% Sáp đậu nành tự nhiên không khói',
    wickType: 'Bấc sợi bông dệt sợi cotton hữu cơ Đức',
    burnHours: '45 - 50 giờ',
    roomSuitability: 'Phòng khách, bàn trà thiền, phòng tắm spa',
    images: [
      '/src/assets/images/candle_jasmine_white_tea_1791094558546.jpg',
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg'
    ],
    featured: true,
    rating: 4.95,
    reviewCount: 52
  },
  {
    id: 'laura-ced-03',
    name: 'Nordic Pine & Smoked Cedar',
    tagline: 'Rừng thông Bắc Âu & gỗ tuyết tùng trầm mặc',
    category: 'ceramic',
    scentFamily: 'woody',
    scentFamilyLabel: 'Gỗ ấm & Hổ phách',
    topNotes: ['Lá thông kim Siberia', 'Bạch đàn chanh', 'Quả bách xù'],
    middleNotes: ['Nhựa thông râm', 'Rêu sồi già', 'Đinh hương thảo mộc'],
    baseNotes: ['Gỗ tuyết tùng Atlas', 'Nhựa cây linh sam', 'Gỗ khói sương'],
    description: 'Hũ gốm xanh rêu mờ tinh xảo. Hương thơm thanh lành của rừng thông sau cơn mưa phùn, mang lại cảm giác xoa dịu thần kinh và cân bằng tâm trí tuyệt đối.',
    story: 'Khơi gợi chuyến tản bộ cô độc trong cánh rừng thông Na Uy, nơi chỉ có tiếng bước chân trên thảm rêu ẩm và làn sương lạnh trong veo.',
    price: 440000,
    stock: 15,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: 'Sáp đậu nành & sáp dừa Bến Tre tinh khiết',
    wickType: 'Bấc gỗ kép phát ra âm thanh lách tách thư giãn',
    burnHours: '48 - 52 giờ',
    roomSuitability: 'Bàn làm việc, phòng đọc, không gian thiền định',
    images: [
      '/src/assets/images/candle_forest_pine_cedar_1791094593318.jpg',
      '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'
    ],
    featured: true,
    rating: 4.88,
    reviewCount: 29
  },
  {
    id: 'laura-cit-04',
    name: 'Neroli Blossom & Sweet Citrus',
    tagline: 'Hoa cam Neroli & vỏ quýt Sicily rực rỡ',
    category: 'amber_glass',
    scentFamily: 'citrus',
    scentFamilyLabel: 'Trái cây & Cam chanh',
    topNotes: ['Vỏ quýt Clementine', 'Bưởi hồng Florida', 'Lá cam đắng'],
    middleNotes: ['Hoa cam Neroli Tunisia', 'Hoa cam trắng', 'Hoa phong lữ'],
    baseNotes: ['Gỗ hoàng đàn nhẹ', 'Xạ hương sạch', 'Cỏ hương bài Haiti'],
    description: 'Hương thơm tươi sáng tràn ngập năng lượng tích cực của bờ biển Địa Trung Hải rực nắng. Đánh thức sự hứng khởi và xua tan căng thẳng mệt mỏi.',
    story: 'Ánh nắng vàng ươm chiếu qua những vườn cam sai trĩu quả vùng Sicily, làn gió biển mang theo vị vỏ cam mọng nước.',
    price: 370000,
    originalPrice: 420000,
    stock: 30,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: '100% Sáp thực vật lành tính',
    wickType: 'Bấc cotton organic lõi giấy',
    burnHours: '45 giờ',
    roomSuitability: 'Phòng làm việc sáng tạo, phòng khách, bếp',
    images: [
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg',
      '/src/assets/images/candle_jasmine_white_tea_1791094558546.jpg'
    ],
    featured: false,
    rating: 4.85,
    reviewCount: 24
  },
  {
    id: 'laura-gou-05',
    name: 'Bourbon Vanilla & Roasted Tonka',
    tagline: 'Vani rượu Bourbon & hạt Tonka ngọt bùi ấm áp',
    category: 'amber_glass',
    scentFamily: 'gourmand',
    scentFamilyLabel: 'Ngọt ngào & Gourmand',
    topNotes: ['Hạnh nhân rang', 'Vỏ quế Ceylon', 'Rượu Rum ấm'],
    middleNotes: ['Quả Vani Bourbon nguyên trái', 'Đậu Tonka nướng', 'Caramel muối'],
    baseNotes: ['Gỗ bách hương', 'Gỗ đàn hương', 'Bơ cacao nguyên chất'],
    description: 'Cảm giác như được cuộn mình trong chiếc chăn cashmere vào một tối mùa đông lạnh giá, với tách trà thơm và bánh ngọt nướng lò vừa chín.',
    story: 'Khúc giao hưởng của mùa lễ hội ấm áp, nơi mùi hương gợi nhớ những kỷ niệm sum vầy bên lò sưởi bập bùng.',
    price: 410000,
    stock: 20,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: 'Sáp đậu nành & bơ hạt mỡ tự nhiên',
    wickType: 'Bấc gỗ xẻ rãnh kép',
    burnHours: '45 - 50 giờ',
    roomSuitability: 'Phòng ngủ, góc đọc sách thư giãn buổi tối',
    images: [
      '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg',
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg'
    ],
    featured: true,
    rating: 4.92,
    reviewCount: 41
  },
  {
    id: 'laura-sea-06',
    name: 'Pacific Driftwood & Sea Mineral',
    tagline: 'Gỗ trôi dạt Thái Bình Dương & muối khoáng biển',
    category: 'ceramic',
    scentFamily: 'fresh',
    scentFamilyLabel: 'Biển & Thanh khiết',
    topNotes: ['Muối biển Brittany', 'Gió biển ozone', 'Lá xô thơm bờ biển'],
    middleNotes: ['Rong biển mặn nhẹ', 'Hoa sen trắng', 'Nước khoáng ngầm'],
    baseNotes: ['Gỗ trôi ngấm muối', 'Xạ hương sạch', 'Hổ phách xám nhẹ'],
    description: 'Thanh tao, sảng khoái và cực kỳ thoáng đãng. Thích hợp cho những ngày oi ả cần một làn gió biển trong lành làm mát dịu cả căn phòng.',
    story: 'Hơi thở của sóng biển vỗ vào vách đá hoa cương, nơi những thanh gỗ phong hóa nằm sưởi nắng dưới bầu trời bao la.',
    price: 395000,
    stock: 12,
    sizes: [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: '100% Sáp cọ & sáp đậu nành sinh học',
    wickType: 'Bấc cotton bện đôi',
    burnHours: '45 giờ',
    roomSuitability: 'Phòng khách, phòng tắm, ban công thoáng',
    images: [
      '/src/assets/images/candle_jasmine_white_tea_1791094558546.jpg',
      '/src/assets/images/candle_forest_pine_cedar_1791094593318.jpg'
    ],
    featured: false,
    rating: 4.79,
    reviewCount: 19
  },
  {
    id: 'laura-sculp-07',
    name: 'Venus Torso Sculptural Candle',
    tagline: 'Tác phẩm nến hình thể điêu khắc nghệ thuật',
    category: 'sculptural',
    scentFamily: 'floral',
    scentFamilyLabel: 'Hoa & Thảo mộc',
    topNotes: ['Hoa huệ trắng Pháp', 'Lê tây chín mọng'],
    middleNotes: ['Gỗ đàn hương mềm', 'Hoa ngọc lan tây'],
    baseNotes: ['Xạ hương cashmere', 'Hổ phách ngọt dịu'],
    description: 'Được đổ khuôn thủ công từng đường nét tinh mỹ. Vừa là tác phẩm điêu khắc nghệ thuật trang trí bàn trà, vừa tỏa hương thơm hoa huệ và xạ hương quý phái.',
    story: 'Lấy cảm hứng từ những pho tượng phục hưng La Mã cổ đại tôn vinh vẻ đẹp hình thể và ánh sáng dịu dàng.',
    price: 320000,
    originalPrice: 380000,
    stock: 8,
    sizes: [
      { size: '150g', label: 'Kích thước tiêu chuẩn (150g)', burnHours: '~15 giờ', priceMultiplier: 1.0 }
    ],
    waxType: '100% Sáp đậu nành đặc biệt giữ form điêu khắc',
    wickType: 'Bấc cotton tự nhiên',
    burnHours: '15 giờ',
    roomSuitability: 'Bàn trang điểm, kệ sách, trang trí nội thất sang trọng',
    images: [
      '/src/assets/images/candle_jasmine_white_tea_1791094558546.jpg',
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg'
    ],
    featured: false,
    rating: 4.96,
    reviewCount: 33
  },
  {
    id: 'laura-gift-08',
    name: 'The Seasons Journey - Luxury Gift Set',
    tagline: 'Hộp quà 3 nến thơm mini cao cấp tuyển chọn',
    category: 'gift_set',
    scentFamily: 'woody',
    scentFamilyLabel: 'Gỗ ấm & Hổ phách',
    topNotes: ['Đa tầng hương theo 3 mùa: Xuân - Thu - Đông'],
    middleNotes: ['Gồm 3 nến 100g: Sandalwood, Jasmine Tea, Nordic Pine'],
    baseNotes: ['Kèm chuông dập nến & kéo cắt bấc kim loại mạ đồng'],
    description: 'Bộ sưu tập quà tặng hoàn mỹ đóng trong hộp bìa cứng lót nhung ép kim sang trọng, kèm bộ phụ kiện chăm sóc nến chuyên nghiệp và thiệp viết tay.',
    story: 'Món quà trọn vẹn dành tặng những người bạn trân quý, gói ghém sự bình yên và hơi ấm vào từng nốt hương.',
    price: 890000,
    originalPrice: 1050000,
    stock: 14,
    sizes: [
      { size: '3x100g', label: 'Set 3 hũ x 100g + Bộ phụ kiện', burnHours: '~70 giờ tổng', priceMultiplier: 1.0 }
    ],
    waxType: '100% Sáp đậu nành & bơ hữu cơ',
    wickType: 'Bấc gỗ nứt tanh tách',
    burnHours: '~70 giờ tổng cộng',
    roomSuitability: 'Quà tặng tân gia, sinh nhật, đối tác, kỷ niệm',
    images: [
      '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg',
      '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'
    ],
    featured: true,
    rating: 5.0,
    reviewCount: 47
  }
];
