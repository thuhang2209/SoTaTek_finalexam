# SoTaTek_finalexam

Mini ecommerce frontend (HTML/CSS/JS thuần) với trang chủ + checkout ngay trên `index.html`, có giỏ hàng và lưu lịch sử đơn hàng bằng `localStorage`.

## 1) Cấu trúc file và vai trò

### File chính đang dùng

- `index.html`
  - Trang chính của ứng dụng.
  - Chứa layout ecommerce: header, hero, danh mục, danh sách sản phẩm, khu vực checkout, footer.
  - Liên kết `styles/style.css` và `scripts/index.js`.

- `styles/style.css`
  - Toàn bộ style cho `index.html`.
  - Bao gồm style tổng quát (header, product card, button, footer), responsive và style cho checkout section.

- `scripts/index.js`
  - Logic chính của trang:
    - Thêm sản phẩm vào giỏ hàng.
    - Render danh sách giỏ hàng và tổng tiền.
    - Xóa sản phẩm trong giỏ.
    - Validate form checkout.
    - Lưu `cart` và `orderHistory` vào `localStorage`.

### File phụ

- `scripts/product.js`
  - Hàm `addToCart(...)` đơn giản (bản cũ) để push trực tiếp vào localStorage.
  - Hiện tại logic đã được nâng cấp và dùng trong `scripts/index.js`.

## 2) Chức năng chính của hệ thống

- Hiển thị danh sách sản phẩm cơ bản.
- Cho phép thêm sản phẩm vào giỏ hàng từ nhiều vị trí.
- Tự động cập nhật:
  - Số lượng item trên nút giỏ hàng.
  - Danh sách item ở checkout.
  - Tổng tiền tạm tính.
- Cho phép xóa từng item trong giỏ hàng.
- Checkout với form thông tin người nhận.
- Lưu lịch sử đơn hàng thành công (`orderHistory`) kèm thời gian.

## 3) Thuật toán / kỹ thuật cơ bản đang dùng

### 3.1. Lưu trạng thái bằng localStorage (Persistence)

- Dữ liệu được lưu dưới dạng JSON string:
  - `cart`: mảng sản phẩm trong giỏ.
  - `orderHistory`: mảng lịch sử đơn hàng.
- Đọc dữ liệu:
  - `JSON.parse(localStorage.getItem("cart")) || []`
- Ghi dữ liệu:
  - `localStorage.setItem("cart", JSON.stringify(cart))`

### 3.2. Cộng dồn tổng tiền / tổng số lượng bằng `reduce`

- Tổng số lượng:
  - Duyệt toàn bộ cart, cộng `item.quantity`.
- Tổng tiền:
  - Duyệt toàn bộ cart, cộng `item.price * item.quantity`.
- Độ phức tạp: `O(n)` với `n` là số item trong giỏ.

### 3.3. Kiểm tra sản phẩm đã tồn tại bằng `find`

- Khi bấm "Thêm giỏ":
  - Dùng `find` theo `id`.
  - Nếu đã có -> tăng `quantity`.
  - Nếu chưa có -> thêm object mới vào mảng.
- Độ phức tạp: `O(n)` mỗi lần thêm.

### 3.4. Render danh sách checkout bằng `map` + `join`

- Chuyển mảng cart thành chuỗi HTML bằng `map`.
- Ghép thành 1 chuỗi qua `join("")` và gán vào `innerHTML`.
- Sau khi render lại, gắn event `click` cho các nút xóa.

### 3.5. Validate input checkout

- Trước khi tạo đơn:
  - Kiểm tra giỏ hàng không rỗng.
  - Kiểm tra `fullName`, `phone`, `address` không rỗng sau `trim()`.
- Nếu không hợp lệ -> hiển thị message lỗi, không tiếp tục.

## 4) Luồng hoạt động checkout

1. User bấm thêm sản phẩm -> cập nhật mảng `cart`.
2. Gọi `saveCart()` -> lưu localStorage.
3. Gọi `renderCart()` -> cập nhật UI số lượng + tổng tiền + danh sách.
4. User nhập form và submit.
5. Nếu hợp lệ:
   - Tính `totalValue` và `totalQuantity`.
   - Gọi `saveOrderHistory(...)`.
   - Clear cart và reset form.
   - Render lại trạng thái rỗng.

## 5) Cách chạy dự án

- Cách nhanh nhất: mở trực tiếp `index.html` trên trình duyệt.
- Hoặc dùng Live Server để tự reload khi sửa code.

## 6) Dữ liệu localStorage đang dùng

- `cart`: dữ liệu giỏ hàng hiện tại.
- `orderHistory`: lịch sử giá trị đơn hàng đã đặt thành công.

Gợi ý kiểm tra nhanh trên DevTools Console:

```js
JSON.parse(localStorage.getItem("cart") || "[]");
JSON.parse(localStorage.getItem("orderHistory") || "[]");
```