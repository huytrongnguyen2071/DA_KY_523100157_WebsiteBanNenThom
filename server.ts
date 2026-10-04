import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts } from './src/data/initialProducts';
import { Product, Order, User, OrderStatus } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory Database
let products: Product[] = JSON.parse(JSON.stringify(initialProducts));

let users: User[] = [
  {
    id: 'user-admin',
    name: 'Quản trị viên L’Aura',
    email: 'admin@laura.vn',
    role: 'admin',
    phone: '0988776655',
    address: 'Atelier L’Aura, 88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-customer-1',
    name: 'Nguyễn Hương Lan',
    email: 'huong.lan@gmail.com',
    role: 'customer',
    phone: '0908123456',
    address: 'Căn hộ 1402, Thảo Điền Pearl, 12 Quốc Hương, TP. Thủ Đức, TP. Hồ Chí Minh',
    createdAt: new Date().toISOString()
  }
];

let orders: Order[] = [
  {
    id: 'ord-101',
    orderCode: 'LAU-8921',
    userId: 'user-customer-1',
    customerInfo: {
      name: 'Nguyễn Hương Lan',
      phone: '0908123456',
      email: 'huong.lan@gmail.com',
      address: 'Căn hộ 1402, Thảo Điền Pearl, 12 Quốc Hương, TP. Thủ Đức, TP. Hồ Chí Minh',
      note: 'Giao giờ hành chính, bọc kỹ hộp quà giúp mình nhé.'
    },
    items: [
      {
        productId: 'laura-san-01',
        name: 'Sandalwood & Golden Amber',
        selectedSize: 'Tiêu chuẩn (200g)',
        price: 390000,
        quantity: 1,
        image: '/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'
      },
      {
        productId: 'laura-jas-02',
        name: 'White Jasmine & Imperial Tea',
        selectedSize: 'Tiêu chuẩn (200g)',
        price: 420000,
        quantity: 1,
        image: '/src/assets/images/candle_jasmine_white_tea_1791094558546.jpg'
      }
    ],
    paymentMethod: 'banking',
    status: 'shipping',
    subtotal: 810000,
    shippingFee: 0,
    discount: 50000,
    total: 760000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    timeline: [
      {
        status: 'pending',
        label: 'Đặt hàng thành công',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        description: 'Đơn hàng #LAU-8921 đã được ghi nhận trên hệ thống.'
      },
      {
        status: 'confirmed',
        label: 'Đã xác nhận thanh toán',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        description: 'Chuyển khoản VietQR đã được kế toán đối soát thành công.'
      },
      {
        status: 'processing',
        label: 'Đóng gói thủ công tại xưởng',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        description: 'Nến đã kiểm tra bề mặt sáp, gắn thiệp sáp hoa khô và niêm phong hộp quà.'
      },
      {
        status: 'shipping',
        label: 'Đang vận chuyển hỏa tốc',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        description: 'Kiện hàng đã bàn giao cho đối tác vận chuyển chuyên biệt.'
      }
    ]
  },
  {
    id: 'ord-102',
    orderCode: 'LAU-7654',
    userId: 'user-customer-1',
    customerInfo: {
      name: 'Nguyễn Hương Lan',
      phone: '0908123456',
      email: 'huong.lan@gmail.com',
      address: 'Căn hộ 1402, Thảo Điền Pearl, 12 Quốc Hương, TP. Thủ Đức, TP. Hồ Chí Minh'
    },
    items: [
      {
        productId: 'laura-gift-08',
        name: 'The Seasons Journey - Luxury Gift Set',
        selectedSize: 'Set 3 hũ x 100g + Bộ phụ kiện',
        price: 890000,
        quantity: 1,
        image: '/src/assets/images/hero_scented_candle_atelier_1791094530598.jpg'
      }
    ],
    paymentMethod: 'cod',
    status: 'completed',
    subtotal: 890000,
    shippingFee: 0,
    discount: 0,
    total: 890000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    timeline: [
      {
        status: 'pending',
        label: 'Đặt hàng thành công',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        description: 'Đơn hàng được khởi tạo với phương thức COD.'
      },
      {
        status: 'completed',
        label: 'Giao hàng thành công',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        description: 'Khách hàng đã nhận kiện hàng nguyên vẹn và thanh toán.'
      }
    ]
  }
];

// ----------------- Auth API -----------------
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu.' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'Email này đã được đăng ký tài khoản.' });
  }

  const newUser: User = {
    id: 'user-' + Date.now(),
    name,
    email,
    role: 'customer',
    phone: phone || '',
    address: address || '',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.json({ success: true, user: newUser });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Vui lòng nhập email.' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Không tìm thấy tài khoản với email này.' });
  }

  // Simple mock verification for demo (supports any password or password123)
  res.json({ success: true, user });
});

app.get('/api/auth/users', (req: Request, res: Response) => {
  res.json(users);
});

// ----------------- Products API -----------------
app.get('/api/products', (req: Request, res: Response) => {
  const { category, scentFamily, size, minPrice, maxPrice, search, sort, featured } = req.query;

  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (scentFamily && scentFamily !== 'all') {
    filtered = filtered.filter(p => p.scentFamily === scentFamily);
  }

  if (size && size !== 'all') {
    filtered = filtered.filter(p => p.sizes.some(s => s.size === size));
  }

  if (minPrice) {
    const min = parseFloat(minPrice as string);
    if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice as string);
    if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);
  }

  if (search) {
    const query = (search as string).toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.scentFamilyLabel.toLowerCase().includes(query) ||
      p.topNotes.some(n => n.toLowerCase().includes(query)) ||
      p.middleNotes.some(n => n.toLowerCase().includes(query)) ||
      p.baseNotes.some(n => n.toLowerCase().includes(query))
    );
  }

  if (featured === 'true') {
    filtered = filtered.filter(p => p.featured);
  }

  // Sorting
  if (sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json(filtered);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
  }
  res.json(product);
});

// Admin product endpoints
app.post('/api/products', (req: Request, res: Response) => {
  const data = req.body;
  if (!data.name || !data.price) {
    return res.status(400).json({ error: 'Tên sản phẩm và giá là bắt buộc.' });
  }

  const newProduct: Product = {
    id: 'laura-item-' + Date.now(),
    name: data.name,
    tagline: data.tagline || 'Nến thơm nghệ thuật chế tác thủ công',
    category: data.category || 'ceramic',
    scentFamily: data.scentFamily || 'woody',
    scentFamilyLabel: data.scentFamilyLabel || 'Gỗ ấm & Hổ phách',
    topNotes: Array.isArray(data.topNotes) ? data.topNotes : ['Cam Bergamot'],
    middleNotes: Array.isArray(data.middleNotes) ? data.middleNotes : ['Hổ phách'],
    baseNotes: Array.isArray(data.baseNotes) ? data.baseNotes : ['Gỗ đàn hương'],
    description: data.description || 'Nến thơm cao cấp từ sáp tự nhiên và tinh dầu thực vật nguyên chất.',
    story: data.story || 'Chắt lọc tinh hoa từ nguyên liệu thảo mộc bản địa.',
    price: Number(data.price) || 350000,
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
    stock: Number(data.stock) ?? 20,
    sizes: data.sizes || [
      { size: '100g', label: 'Du lịch (100g)', burnHours: '~22 giờ', priceMultiplier: 0.65 },
      { size: '200g', label: 'Tiêu chuẩn (200g)', burnHours: '~45 giờ', priceMultiplier: 1.0 },
      { size: '350g', label: 'Grand Vessel (350g)', burnHours: '~75 giờ', priceMultiplier: 1.6 }
    ],
    waxType: data.waxType || '100% Sáp đậu nành & sáp dừa tự nhiên',
    wickType: data.wickType || 'Bấc gỗ tự nhiên nứt tanh tách',
    burnHours: data.burnHours || '45 - 50 giờ',
    roomSuitability: data.roomSuitability || 'Phòng 20 - 30m²',
    images: data.images && data.images.length > 0 ? data.images : ['/src/assets/images/candle_sandalwood_amber_1791094545714.jpg'],
    featured: Boolean(data.featured),
    rating: 5.0,
    reviewCount: 1
  };

  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    price: req.body.price ? Number(req.body.price) : products[index].price,
    stock: req.body.stock !== undefined ? Number(req.body.stock) : products[index].stock
  };

  res.json(products[index]);
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const initialLength = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === initialLength) {
    return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
  }
  res.json({ success: true, message: 'Đã xóa sản phẩm thành công.' });
});

// ----------------- Orders API -----------------
app.get('/api/orders', (req: Request, res: Response) => {
  const { userId } = req.query;
  if (userId) {
    const userOrders = orders.filter(o => o.userId === userId);
    return res.json(userOrders);
  }
  res.json(orders);
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.find(o => o.id === req.params.id || o.orderCode === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  }
  res.json(order);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { userId, customerInfo, items, paymentMethod, subtotal, shippingFee, discount, total } = req.body;

  if (!items || !items.length || !customerInfo || !customerInfo.name || !customerInfo.phone || !customerInfo.address) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin giao hàng và sản phẩm.' });
  }

  // Deduct inventory
  for (const item of items) {
    const p = products.find(prod => prod.id === item.productId);
    if (p) {
      p.stock = Math.max(0, p.stock - item.quantity);
    }
  }

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  const nowIso = new Date().toISOString();

  const newOrder: Order = {
    id: 'ord-' + Date.now(),
    orderCode: `LAU-${orderNum}`,
    userId: userId || 'guest',
    customerInfo,
    items,
    paymentMethod: paymentMethod || 'cod',
    status: 'pending',
    subtotal: subtotal || total,
    shippingFee: shippingFee || 0,
    discount: discount || 0,
    total,
    createdAt: nowIso,
    updatedAt: nowIso,
    timeline: [
      {
        status: 'pending',
        label: 'Đặt hàng thành công',
        timestamp: nowIso,
        description: 'Đơn hàng đã được tiếp nhận và chờ xưởng L’Aura đóng gói.'
      }
    ]
  };

  orders.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status, note } = req.body;
  const order = orders.find(o => o.id === req.params.id || o.orderCode === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
  }

  const targetStatus = status as OrderStatus;
  const validStatuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipping', 'completed', 'cancelled'];
  if (!validStatuses.includes(targetStatus)) {
    return res.status(400).json({ error: 'Trạng thái đơn hàng không hợp lệ.' });
  }

  order.status = targetStatus;
  order.updatedAt = new Date().toISOString();

  const statusDescriptions: Record<OrderStatus, { label: string; desc: string }> = {
    pending: { label: 'Chờ xác nhận', desc: 'Đơn hàng đang chờ nhân viên kiểm duyệt.' },
    confirmed: { label: 'Đã xác nhận đơn', desc: 'Đã liên hệ hoặc kiểm tra thông tin thanh toán hoàn tất.' },
    processing: { label: 'Đang gia công & đóng gói', desc: 'Nghệ nhân đang kiểm định bề mặt sáp nến và đóng gói an toàn.' },
    shipping: { label: 'Đang giao hàng', desc: 'Đơn hàng đang trên đường giao tới địa chỉ của bạn.' },
    completed: { label: 'Đã hoàn thành', desc: 'Khách hàng đã nhận kiện hàng thành công.' },
    cancelled: { label: 'Đã hủy đơn', desc: note || 'Đơn hàng đã bị hủy theo yêu cầu.' }
  };

  order.timeline.push({
    status: targetStatus,
    label: statusDescriptions[targetStatus].label,
    timestamp: new Date().toISOString(),
    description: note || statusDescriptions[targetStatus].desc
  });

  res.json({ success: true, order });
});

// Admin Stats
app.get('/api/stats', (req: Request, res: Response) => {
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const lowStockProducts = products.filter(p => p.stock <= 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const statusCount = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  res.json({
    totalRevenue,
    totalOrders,
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    lowStockProducts: lowStockProducts.map(p => ({ id: p.id, name: p.name, stock: p.stock })),
    statusCount,
    totalProducts: products.length
  });
});

// Reset demo seed
app.post('/api/seed/reset', (req: Request, res: Response) => {
  products = JSON.parse(JSON.stringify(initialProducts));
  res.json({ success: true, message: 'Đã khôi phục dữ liệu ban đầu.' });
});

// ----------------- Vite / Static Hosting -----------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`L'AURA Candle Atelier running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
