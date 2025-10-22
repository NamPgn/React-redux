# Feature Banner Admin Guide

## Tổng quan
Feature Banner Admin là công cụ quản lý các category nổi bật hiển thị trên trang chủ. Bạn có thể thêm, sửa, xóa và sắp xếp thứ tự hiển thị của các category featured.

## Vị trí
Dashboard → Category → Tab "Feature Banners"

## Chức năng

### 1. Xem danh sách Feature Banners
- Hiển thị tất cả feature banners đang có
- Thông tin: Order, Poster, Category Name, Title, Year, Status, Active
- Sắp xếp theo thứ tự `order` (có thể drag & drop)

### 2. Thêm Feature Banner mới
**Bước 1:** Click nút "Add Feature Banner"

**Bước 2:** Điền thông tin:
- **Category** (required): Chọn category từ dropdown
  - Chỉ hiển thị categories chưa được thêm vào feature banner
- **Title** (optional): Tiêu đề tùy chỉnh
  - Để trống sẽ tự động dùng tên category
- **Description** (optional): Mô tả tùy chỉnh
  - Để trống sẽ tự động dùng mô tả category
- **Order** (required): Thứ tự hiển thị
  - Số càng nhỏ càng hiển thị trước
  - Mặc định: số lượng hiện tại + 1
- **Active**: Trạng thái kích hoạt
  - Mặc định: BẬT

**Bước 3:** Click "Create"

### 3. Chỉnh sửa Feature Banner
**Cách 1:** Click icon "Edit" (✏️) ở cột Action

**Cách 2:** Click vào dòng cần edit

**Chỉnh sửa được:**
- Category (có thể đổi sang category khác)
- Title
- Description
- Order
- Active status

**Lưu ý:** Không thể chọn category đã tồn tại trong feature banner khác

### 4. Xóa Feature Banner
Click icon "Delete" (🗑️) → Xác nhận xóa

**Lưu ý:** Xóa feature banner không ảnh hưởng đến category gốc

### 5. Sắp xếp thứ tự (Drag & Drop)
**Cách 1: Drag & Drop**
- Di chuyển chuột đến icon ⋮⋮ ở đầu dòng
- Nhấn giữ và kéo lên/xuống
- Thả chuột để thả vào vị trí mới
- Thứ tự sẽ tự động cập nhật

**Cách 2: Edit thủ công**
- Click Edit
- Thay đổi giá trị Order
- Save

### 6. Bật/Tắt trạng thái
Toggle switch ở cột "Active"
- ✅ BẬT: Feature banner hiển thị trên Frontend
- ❌ TẮT: Ẩn khỏi Frontend (không bị xóa)

## Business Rules

### 1. Category Uniqueness
- Mỗi category chỉ có thể tồn tại trong 1 feature banner
- Khi tạo mới, hệ thống chỉ hiển thị categories chưa được thêm
- Nếu tất cả categories đã được thêm → Nút "Add" sẽ bị disable

### 2. Order Management
- Order phải là số nguyên dương >= 1
- Frontend sẽ sắp xếp theo order tăng dần
- Hai feature banner có thể có cùng order (system sẽ dùng createdAt để phân biệt)

### 3. Active Status
- Frontend chỉ fetch feature banners có `isActive = true`
- Admin vẫn thấy tất cả (kể cả inactive) để quản lý

### 4. Auto Populate
- Nếu không điền Title → Dùng `category.name`
- Nếu không điền Description → Dùng `category.des`

## API Endpoints Used

```typescript
// GET - Lấy danh sách
GET /api/feature-banners?isActive=true

// POST - Tạo mới
POST /api/feature-banner
Body: { categoryId, title?, description?, order, isActive }

// PUT - Cập nhật
PUT /api/feature-banner/:id
Body: { categoryId?, title?, description?, order?, isActive? }

// DELETE - Xóa
DELETE /api/feature-banner/:id

// PUT - Cập nhật thứ tự hàng loạt
PUT /api/feature-banners/update-order
Body: { orders: [{ id, order }, ...] }

// PATCH - Toggle active
PATCH /api/feature-banner/:id/toggle-status
```

## Tips & Best Practices

### 1. Số lượng Feature Banners
**Recommended:** 5-8 feature banners
- Quá nhiều → User overwhelmed
- Quá ít → Không đủ nổi bật

### 2. Chiến lược sắp xếp
- **Order 1-3:** Categories HOT nhất, mới nhất
- **Order 4-6:** Categories đang trending
- **Order 7+:** Categories phổ biến

### 3. Sử dụng Active Status
- Tạm thời ẩn feature banner không cần xóa
- A/B testing: bật/tắt để xem engagement

### 4. Title & Description customization
- Dùng title tùy chỉnh cho seasonal events
  - VD: "🎄 Đấu Phá Thương Khung - Giáng Sinh 2024"
- Description: Highlight selling points
  - VD: "Top 1 phim 3D Trung Quốc 2024 - 300M+ views"

### 5. Performance
- Frontend cache feature banners (5-10 phút)
- Sau khi update, đợi vài phút hoặc clear cache để thấy thay đổi

## Troubleshooting

### Q1: Không thấy category trong dropdown "Add"?
**A:** Category đã được thêm vào feature banner rồi. Kiểm tra danh sách hiện tại.

### Q2: Drag & Drop không hoạt động?
**A:** 
- Đảm bảo kéo ở icon ⋮⋮ đầu dòng
- Thử refresh trang
- Nếu vẫn lỗi, dùng Edit để thay đổi Order thủ công

### Q3: Frontend không hiển thị feature banner mới?
**A:**
- Kiểm tra `isActive = true`
- Đợi cache expire (5-10 phút)
- Hoặc gọi API clear cache: `POST /api/categories/clear-cache`

### Q4: Lỗi "Category đã tồn tại trong danh sách nổi bật"?
**A:** Xóa feature banner cũ của category đó trước, sau đó tạo mới.

## Screenshots & Demo

### Main Table View
- Hiển thị danh sách feature banners
- Drag handle ở đầu mỗi dòng
- Switch toggle cho Active status
- Action buttons (Edit, Delete)

### Add Modal
- Form với các trường: Category, Title, Description, Order, Active
- Validate required fields
- Auto-suggest cho dropdown

### Edit Modal
- Tương tự Add Modal
- Pre-fill dữ liệu hiện tại
- Có thể thay đổi category

## Integration với Frontend

Frontend query feature banners:
```typescript
const response = await fetch('/api/feature-banners?isActive=true');
const { data } = await response.json();

// Render featured section
data.forEach(feature => {
  const { category, title, description } = feature;
  // Display category với custom title/description nếu có
});
```

## Changelog

### v1.0.0 (2024-10-22)
- ✅ CRUD operations
- ✅ Drag & Drop sorting
- ✅ Active/Inactive toggle
- ✅ Category uniqueness validation
- ✅ Auto-populate title/description
- ✅ Responsive table
- ✅ Search & filter categories

## Liên hệ Support
Nếu gặp vấn đề, liên hệ:
- Tech Lead: [Your Contact]
- Backend API Docs: `/node/docs/FeatureBannerAPI.md`


