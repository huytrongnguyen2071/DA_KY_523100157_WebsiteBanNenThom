# ĐỒ ÁN KỲ - XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN NẾN THƠM NGHỆ THUẬT & QUẢN LÝ ĐƠN HÀNG (L'AURA ATELIER)

## 1. Thông tin sinh viên
- Họ tên: 
- MSSV: 
- Lớp: 
- GVHD: 

## 2. Mục tiêu đề tài
- Xây dựng nền tảng thương mại điện tử chuyên biệt cho sản phẩm nến thơm nghệ thuật thủ công cao cấp với giao diện tinh tế, sang trọng.
- Cung cấp trải nghiệm mua sắm thông minh: lọc nến theo nhóm mùi hương (Scent Family), kích thước, giá thành và tích hợp công cụ trắc nghiệm gợi ý mùi hương cá nhân hóa (Scent Matchmaker).
- Xây dựng quy trình xử lý đơn hàng hoàn chỉnh từ đặt hàng, thanh toán linh hoạt (COD, chuyển khoản VietQR, ví điện tử) đến tra cứu tiến độ chế tác và vận chuyển theo thời gian thực.
- Thiết kế hệ thống quản trị (Admin Dashboard) trực quan giúp xưởng nến dễ dàng theo dõi doanh thu, cập nhật tồn kho tức thì và quản lý vòng đời đơn hàng.

## 3. Chức năng cốt lõi
- **Xác thực & Người dùng**: Đăng ký, đăng nhập tài khoản thành viên và phân quyền hệ thống (Khách hàng / Quản trị viên), hỗ trợ nút đăng nhập nhanh thử nghiệm 1-click.
- **Duyệt & Phân loại sản phẩm**: Xem danh mục nến theo nhóm mùi (Gỗ ấm, Hoa cỏ, Cam chanh, Vani ngọt béo, Biển thanh khiết) và chủng loại hũ (Thủy tinh hổ phách, Gốm men ngọc, Điêu khắc, Hộp quà tặng).
- **Tìm kiếm & Lọc nâng cao**: Tìm kiếm thời gian thực theo tên hoặc thành phần nốt hương, kết hợp lọc đa chiều theo mức giá, kích thước (100g, 200g, 350g) và sắp xếp.
- **Trang chi tiết sản phẩm chuẩn Boutique**: Khám phá Tháp hương 3 tầng (Olfactory Pyramid: Hương đầu, Hương giữa, Hương cuối), chọn kích thước cập nhật giá động, kiểm tra lượng tồn kho và hướng dẫn chăm sóc nến.
- **Scent Finder (Trắc nghiệm mùi hương)**: Trắc nghiệm 3 bước nhanh (không gian thắp, tâm trạng, nhóm hương ưa thích) gợi ý chính xác hũ nến hòa hợp với người dùng.
- **Giỏ hàng tiện lợi (Cart Drawer)**: Cập nhật số lượng (+ / -), xóa món, áp dụng mã ưu đãi giảm giá (LAURA10) và thanh tiến độ nhận Miễn phí vận chuyển.
- **Đặt hàng & Thanh toán**: Thu thập thông tin giao hàng, ghi chú cho xưởng; hỗ trợ thanh toán khi nhận hàng (COD), chuyển khoản VietQR tự động và ví MoMo.
- **Theo dõi đơn hàng (Order Tracking Timeline)**: Tra cứu tiến độ đơn theo mã đơn (ví dụ: LAU-8921) qua 5 giai đoạn: Tiếp nhận ➔ Xác nhận ➔ Đang chế tác & đóng gói ➔ Đang giao ➔ Hoàn tất. Hỗ trợ khách tự hủy đơn ở trạng thái chờ duyệt.
- **Bảng quản trị xưởng nến (Admin Dashboard)**:
  - Quản lý sản phẩm: Bảng danh mục, chỉnh sửa tồn kho tức thì, thêm nến mới, cập nhật thông tin và xóa sản phẩm.
  - Quản lý đơn hàng: Xem danh sách đơn, lọc theo trạng thái, chuyển trạng thái đơn hàng trực tiếp và ghi chú tiến độ.
  - Thống kê & Báo cáo: Tổng doanh thu thực tế, số lượng đơn hàng, danh sách cảnh báo các dòng nến sắp hết hàng (<10 hũ).

## 4. Công nghệ sử dụng
- **Front-end**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Back-end**: Node.js, Express RESTful APIs
- **Database / Data Store**: In-memory Data Engine đồng bộ trạng thái thực tế kèm cơ chế nạp sẵn (seed data) và khôi phục dữ liệu mẫu; LocalStorage lưu trữ giỏ hàng & phiên làm việc
- **Công cụ**: Vite Dev Server, TSX runtime, ESLint, Git, Google Fonts (Be Vietnam Pro & Playfair Display)

## 5. Hướng dẫn cài đặt/chạy
1. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
   *(Nếu npm báo lỗi xung đột phiên bản phụ thuộc peer, chạy lệnh: `npm install --legacy-peer-deps`)*
2. Khởi chạy ứng dụng ở môi trường phát triển (Full-stack dev server):
   ```bash
   npm run dev
   ```
3. Mở trình duyệt web và truy cập địa chỉ:
   ```
   http://localhost:3000
   ```
4. (Tùy chọn) Kiểm tra cú pháp và chất lượng mã nguồn:
   ```bash
   npm run lint
   ```
5. (Tùy chọn) Đóng gói và chạy ứng dụng cho môi trường sản xuất:
   ```bash
   npm run build
   npm start
   ```

## 6. Tài khoản demo
- **Admin**:
  - Email: `admin@laura.vn`
  - Mật khẩu: `admin123`
  - Quyền hạn: Toàn quyền truy cập Bảng quản trị xưởng, kiểm soát sản phẩm, tồn kho và chuyển trạng thái đơn hàng.
- **User**:
  - Email: `huong.lan@gmail.com`
  - Mật khẩu: `user123`
  - Quyền hạn: Mua sắm, áp mã giảm giá, đặt hàng và theo dõi lịch sử đơn hàng cá nhân.
*(Lưu ý: chỉ dùng tài khoản demo, không đưa mật khẩu thật)*

## 7. Tiến độ
- **Checkpoint 01**: Khảo sát nghiệp vụ bán lẻ nến thơm, phân tích yêu cầu hệ thống và thiết kế mô hình dữ liệu (Scent Profile, Tháp hương, Biến thể kích cỡ, Cấu trúc đơn hàng).
- **Checkpoint 02**: Thiết kế giao diện người dùng (UI/UX) theo phong cách luxury boutique; tích hợp hệ thống typography chuẩn tiếng Việt (Be Vietnam Pro, Playfair Display) và tối ưu hóa letter-spacing.
- **Checkpoint 03**: Xây dựng máy chủ Node.js Express và các API RESTful (xác thực người dùng, danh mục sản phẩm, bộ lọc tìm kiếm, tạo và cập nhật đơn hàng).
- **Checkpoint 04**: Xây dựng mô-đun Giỏ hàng (Cart Drawer), xử lý phiếu giảm giá, tính toán phí vận chuyển và mô-đun Thanh toán (Checkout).
- **Checkpoint 05**: Hiện thực tính năng trắc nghiệm gợi ý mùi hương (Scent Finder Quiz) và hệ thống tra cứu tiến trình đơn hàng (Order Tracking Timeline) theo thời gian thực.
- **Checkpoint 06**: Xây dựng toàn diện Bảng điều khiển Quản trị viên (Admin Dashboard), kiểm thử luồng trừ kho tự động, kiểm tra lint/build và hoàn thiện tài liệu dự án.
