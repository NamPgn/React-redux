# 🚀 Quick Start - Product Admin với Tabs

## Cách truy cập tabs

### 1. **Truy cập qua Menu Sidebar**
- Vào **Dashboard** → **Movies** 
- Bạn sẽ thấy 3 options:
  - **All Movies (2D & 3D)** - Có tabs để chuyển đổi
  - **2D Movies** - Chỉ hiển thị phim 2D
  - **3D Movies** - Chỉ hiển thị phim 3D

### 2. **URL trực tiếp**
- **Tabs (2D & 3D)**: `/dashboard/products`
- **Chỉ 2D**: `/dashboard/products-2d` hoặc `/dashboard/products/2d`
- **Chỉ 3D**: `/dashboard/products-3d`

## Giao diện tabs

Khi bạn vào `/dashboard/products`, bạn sẽ thấy:

```
┌─────────────────────────────────────────────────────────┐
│  🎬 Phim 2D    │  📦 Phim 3D    │                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Nội dung bảng phim 2D hoặc 3D tùy theo tab đã chọn]  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Tính năng tabs

- ✅ **Chuyển đổi dễ dàng**: Click vào tab để chuyển giữa 2D và 3D
- ✅ **Màu sắc khác biệt**: 
  - 2D: Màu xanh dương (blue)
  - 3D: Màu xanh lá (emerald)
- ✅ **Dữ liệu riêng biệt**: Mỗi tab có dữ liệu và cấu hình riêng
- ✅ **Tương thích ngược**: Code cũ vẫn hoạt động bình thường

## Troubleshooting

### Không thấy tabs?
1. **Kiểm tra URL**: Đảm bảo bạn đang ở `/dashboard/products`
2. **Refresh trang**: F5 hoặc Ctrl+R
3. **Kiểm tra console**: Mở DevTools xem có lỗi không

### Tabs không hoạt động?
1. **Kiểm tra import**: Đảm bảo `ProductAdminWrapper` được import đúng
2. **Kiểm tra routing**: Đảm bảo route được cấu hình đúng
3. **Kiểm tra component**: Đảm bảo `ProductAdminWrapper` render đúng

## Code để test

```tsx
// Test trực tiếp trong component
import ProductAdminWrapper from './ProductAdminWrapper';

function TestPage() {
  return (
    <div>
      <h1>Test Product Admin Tabs</h1>
      <ProductAdminWrapper />
    </div>
  );
}
```

## Cấu trúc menu mới

```
📁 Movies
├── 🎬 All Movies (2D & 3D) → /dashboard/products (có tabs)
├── 🎬 2D Movies → /dashboard/products-2d (chỉ 2D)
└── 📦 3D Movies → /dashboard/products-3d (chỉ 3D)
```

Bây giờ bạn có thể truy cập `/dashboard/products` để thấy tabs! 🎉
