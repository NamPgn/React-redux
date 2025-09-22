# Hướng dẫn Import sản phẩm từ Excel

## Tổng quan
Chức năng Excel Import cho phép bạn thêm hàng loạt sản phẩm (episodes) vào hệ thống từ file Excel. Điều này giúp tiết kiệm thời gian khi cần thêm nhiều tập phim cùng lúc.

## Cách sử dụng

### 1. Chuẩn bị file Excel

#### Cấu trúc file Excel yêu cầu:
- **Dòng đầu tiên (Header):** Chứa tên các cột
- **Từ dòng thứ 2:** Chứa dữ liệu sản phẩm

#### Các cột bắt buộc:
| Cột | Mô tả | Ví dụ |
|-----|-------|-------|
| `name` | Tên tập phim | "Phim ABC Tập 1" |
| `seri` | Số tập | "1" hoặc "001" |
| `category` | ID danh mục | "507f1f77bcf86cd799439011" |

#### Các cột tùy chọn:
| Cột | Mô tả | Ví dụ |
|-----|-------|-------|
| `description` | Mô tả tập phim | "Tập phim hay nhất" |
| `image` | URL hình ảnh | "https://example.com/image.jpg" |
| `videoUrl` | URL video | "https://example.com/video.mp4" |
| `dailymotionServer` | Server Dailymotion | "server1" |
| `isApproved` | Trạng thái duyệt | "true" hoặc "false" |

### 2. Ví dụ file Excel

```
| name              | seri | category                    | description     | image                    | videoUrl                 |
|-------------------|------|-----------------------------|-----------------|--------------------------|--------------------------|
| Phim ABC Tập 1    | 1    | 507f1f77bcf86cd799439011   | Tập đầu tiên    | https://img1.jpg        | https://video1.mp4      |
| Phim ABC Tập 2    | 2    | 507f1f77bcf86cd799439011   | Tập thứ hai     | https://img2.jpg        | https://video2.mp4      |
| Phim XYZ Tập 1    | 1    | 507f1f77bcf86cd799439012   | Phim mới        | https://img3.jpg        | https://video3.mp4      |
```

### 3. Các bước thực hiện

1. **Mở modal Import Excel**
   - Vào trang quản lý sản phẩm
   - Click nút "Quản lý" ở góc phải
   - Click "Thêm từ Excel"

2. **Chọn Sheet**
   - Nhập số thứ tự sheet (bắt đầu từ 0)
   - Sheet 0 = Sheet đầu tiên
   - Sheet 1 = Sheet thứ hai
   - ...

3. **Upload file**
   - Click hoặc kéo thả file Excel vào vùng upload
   - File phải có định dạng .xlsx hoặc .xls
   - Kích thước tối đa 10MB

4. **Import**
   - Click "Import Excel" để bắt đầu
   - Hệ thống sẽ kiểm tra và xử lý dữ liệu
   - Xem kết quả trong thông báo

## Xử lý lỗi

### Các lỗi thường gặp:

#### 1. Lỗi cấu trúc file
- **Thiếu header:** "Thiếu các trường bắt buộc: name, seri, category"
- **Không có dữ liệu:** "Không có dữ liệu trong sheet được chọn"

#### 2. Lỗi dữ liệu
- **Thiếu thông tin bắt buộc:** "Dòng X: Thiếu thông tin bắt buộc (name, seri, category)"
- **Category ID không hợp lệ:** "Dòng X: Category ID không hợp lệ"
- **Category không tồn tại:** "Dòng X: Category không tồn tại"
- **Trùng lặp:** "Dòng X: Sản phẩm với slug 'xxx' đã tồn tại"

#### 3. Lỗi file
- **Định dạng không đúng:** "Chỉ được upload file Excel (.xlsx, .xls)"
- **File quá lớn:** "File phải nhỏ hơn 10MB"
- **Sheet không tồn tại:** "Index sheet X không tồn tại"

### Cách khắc phục:

1. **Kiểm tra cấu trúc file**
   - Đảm bảo dòng đầu tiên là header
   - Có đủ các cột bắt buộc: name, seri, category

2. **Kiểm tra dữ liệu**
   - Không để trống các trường bắt buộc
   - Category ID phải là ObjectId hợp lệ
   - Đảm bảo category đã tồn tại trong hệ thống

3. **Kiểm tra file**
   - File phải là .xlsx hoặc .xls
   - Kích thước < 10MB
   - Sheet index phải đúng

## Kết quả import

### Thông báo thành công:
```
Thêm thành công 50 sản phẩm từ Excel (bỏ qua 3 dòng lỗi)
```

### Thông tin chi tiết:
- **inserted:** Số sản phẩm được thêm thành công
- **totalRows:** Tổng số dòng dữ liệu
- **skipped:** Số dòng bị bỏ qua do lỗi

## Lưu ý quan trọng

1. **Backup dữ liệu:** Luôn backup dữ liệu trước khi import
2. **Kiểm tra kỹ:** Xem lại file Excel trước khi upload
3. **Test nhỏ:** Thử import với vài dòng trước khi import hàng loạt
4. **Category ID:** Phải có sẵn category trong hệ thống
5. **Slug tự động:** Hệ thống tự tạo slug theo format: `name-episode-seri`
6. **File tạm:** File upload sẽ được xóa tự động sau khi xử lý

## Template Excel mẫu

Để tải template Excel mẫu, vui lòng liên hệ admin để được cung cấp file mẫu với cấu trúc chuẩn.

## Hỗ trợ

Nếu gặp vấn đề trong quá trình sử dụng, vui lòng:
1. Kiểm tra lại hướng dẫn này
2. Xem thông báo lỗi chi tiết
3. Liên hệ team phát triển
