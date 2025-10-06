# Product Admin Management

Cấu trúc quản lý sản phẩm phim hỗ trợ cả bản 2D và 3D.

## Cấu trúc thư mục

```
product/
├── components/
│   └── BaseProductAdmin.tsx    # Component base chung cho cả 2D và 3D
├── types/
│   └── index.ts                # Types và interfaces chung
├── constants/
│   └── index.ts                # Constants cho từng version
├── ui/                         # UI components (giữ nguyên)
├── component/                  # Components (giữ nguyên)
├── ProductAdmin2D.tsx          # Component riêng cho 2D
├── ProductAdmin3D.tsx          # Component riêng cho 3D
├── ProductAdminWrapper.tsx     # Wrapper để chọn giữa 2D/3D
├── index.tsx                   # Default export (3D)
└── README.md                   # Tài liệu này
```

## Cách sử dụng

### 1. Sử dụng riêng lẻ từng version

```tsx
// Chỉ sử dụng 2D
import ProductAdmin2D from './ProductAdmin2D';
<ProductAdmin2D />

// Chỉ sử dụng 3D
import ProductAdmin3D from './ProductAdmin3D';
<ProductAdmin3D />
```

### 2. Sử dụng wrapper với tabs

```tsx
// Sử dụng wrapper để có thể chuyển đổi giữa 2D và 3D
import ProductAdminWrapper from './ProductAdminWrapper';
<ProductAdminWrapper />
```

### 3. Sử dụng default (3D)

```tsx
// Sử dụng default export (tương thích ngược)
import ProductAdmin from './index';
<ProductAdmin />
```

## Cấu hình

### Thêm version mới

1. Cập nhật `ProductVersion` type trong `types/index.ts`
2. Thêm config mới vào `PRODUCT_CONFIGS`
3. Thêm constants cho version mới trong `constants/index.ts`
4. Tạo component mới kế thừa từ `BaseProductAdmin`

### Tùy chỉnh giao diện

- **Colors**: Cập nhật `VERSION_CONFIGS` trong `constants/index.ts`
- **Table config**: Cập nhật `VERSION_TABLE_CONFIGS`
- **Status indicators**: Cập nhật `VERSION_STATUS_INDICATORS`
- **Thumbnail config**: Cập nhật `VERSION_THUMBNAIL_CONFIGS`

## Lợi ích

1. **Tái sử dụng code**: Logic chung được chia sẻ trong `BaseProductAdmin`
2. **Dễ maintain**: Mỗi version có config riêng, dễ thay đổi
3. **Tương thích ngược**: Code cũ vẫn hoạt động bình thường
4. **Mở rộng dễ dàng**: Thêm version mới chỉ cần tạo config và component mới
5. **Type safety**: TypeScript đảm bảo type safety cho tất cả versions

## Migration

Để migrate từ code cũ:

1. Code hiện tại sẽ tự động sử dụng 3D version
2. Để sử dụng 2D, import `ProductAdmin2D` thay vì `ProductAdmin`
3. Để có cả hai, sử dụng `ProductAdminWrapper`

## API Endpoints

Mỗi version có thể có API endpoints riêng:

- 2D: `/products/2d`
- 3D: `/products/3d`

Cấu hình này được định nghĩa trong `PRODUCT_CONFIGS`.

