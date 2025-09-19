# Demo chức năng Bulk Upload Poster

## Tổng quan
Đã thêm thành công chức năng bulk upload poster vào cả backend và frontend.

## Các tính năng đã thêm

### Backend (Node.js)
- ✅ **API Endpoint**: `POST /api/posters/bulk`
- ✅ **Validation**: Tối đa 10 files, kiểm tra category
- ✅ **Transaction**: Đảm bảo tính nhất quán dữ liệu
- ✅ **Error Handling**: Xử lý lỗi từng file riêng biệt
- ✅ **Response**: Trả về chi tiết thành công/thất bại

### Frontend (React)
- ✅ **UI Component**: Modal bulk upload với drag & drop
- ✅ **Hook Integration**: `usePosters` với `bulkCreatePosters`
- ✅ **Service Layer**: `posterService.bulkCreate`
- ✅ **User Experience**: Loading states, error messages, progress feedback

## Cách sử dụng

### 1. Truy cập Admin Panel
```
http://localhost:3000/admin/posters
```

### 2. Click nút "Bulk Upload"
- Nút màu xanh với icon upload
- Mở modal bulk upload

### 3. Cấu hình upload
- **Category**: Chọn category cho tất cả poster
- **Aspect Ratio**: Chọn tỷ lệ khung hình (16:9, 1:1, etc.)
- **Cover Poster**: Có muốn ảnh đầu tiên làm cover không

### 4. Upload files
- **Drag & Drop**: Kéo thả nhiều ảnh vào vùng upload
- **Click to Upload**: Click để chọn files
- **Multiple Selection**: Chọn nhiều files cùng lúc
- **Max 10 files**: Giới hạn tối đa 10 ảnh

### 5. Xem kết quả
- **Success Message**: "Successfully uploaded X posters"
- **Warning Message**: Nếu có lỗi: "X posters uploaded, Y files failed"
- **Auto Refresh**: Danh sách poster tự động cập nhật

## API Response Example

### Thành công hoàn toàn
```json
{
  "data": [
    {
      "_id": "poster_id_1",
      "title": "Poster 1",
      "alt": "Poster 1",
      "imageUrl": "cloudinary_url_1",
      "category": "category_id",
      "aspect": "16:9",
      "coverPoster": "cover",
      "isActive": true
    },
    {
      "_id": "poster_id_2", 
      "title": "Poster 2",
      "alt": "Poster 2",
      "imageUrl": "cloudinary_url_2",
      "category": "category_id",
      "aspect": "16:9",
      "coverPoster": "poster",
      "isActive": true
    }
  ],
  "message": "Tạo thành công 2 poster",
  "successCount": 2,
  "errorCount": 0
}
```

### Có lỗi một số files
```json
{
  "data": [
    {
      "_id": "poster_id_1",
      "title": "Poster 1",
      "imageUrl": "cloudinary_url_1",
      "category": "category_id"
    }
  ],
  "errors": [
    {
      "fileIndex": 2,
      "fileName": "invalid_image.jpg",
      "error": "Invalid file format"
    }
  ],
  "message": "Tạo thành công 1 poster, 1 lỗi",
  "successCount": 1,
  "errorCount": 1
}
```

## Validation Rules

### Frontend Validation
- ✅ Tối đa 10 files
- ✅ Chỉ chấp nhận file ảnh
- ✅ Bắt buộc chọn category
- ✅ Hiển thị preview files

### Backend Validation
- ✅ Kiểm tra ObjectId category
- ✅ Kiểm tra category tồn tại
- ✅ Validate aspect ratio
- ✅ Xử lý transaction rollback

## Error Handling

### Frontend
- ✅ Loading state khi upload
- ✅ Success/Error messages
- ✅ Form validation
- ✅ File type validation

### Backend
- ✅ Transaction safety
- ✅ Individual file error handling
- ✅ Cloudinary cleanup on error
- ✅ Detailed error responses

## Performance Features

### Backend
- ✅ Parallel file processing
- ✅ Optimized Cloudinary uploads
- ✅ Database transactions
- ✅ Memory efficient processing

### Frontend
- ✅ Drag & drop interface
- ✅ File preview
- ✅ Progress indicators
- ✅ Responsive design

## Testing Checklist

- [ ] Upload 1 file thành công
- [ ] Upload 5 files thành công
- [ ] Upload 10 files thành công
- [ ] Upload 11 files (should fail)
- [ ] Upload file không phải ảnh (should fail)
- [ ] Không chọn category (should fail)
- [ ] Upload với cover poster option
- [ ] Upload với aspect ratio khác nhau
- [ ] Kiểm tra error handling
- [ ] Kiểm tra UI/UX

## Files Modified

### Backend
- `node/src/controller/poster.ts` - Thêm `bulkCreatePosters`
- `node/src/routes/poster.ts` - Thêm route `/bulk`
- `node/BULK_UPLOAD_GUIDE.md` - Documentation

### Frontend
- `React-redux/src/services/poster.service.ts` - Thêm `bulkCreate`
- `React-redux/src/hook/usePoster.ts` - Thêm `bulkCreatePosters`
- `React-redux/src/page/Admin/posters/index.tsx` - Thêm UI bulk upload
- `React-redux/BULK_UPLOAD_DEMO.md` - Demo guide

## Next Steps

1. **Test thoroughly** với các loại file khác nhau
2. **Monitor performance** với số lượng file lớn
3. **Add progress bar** cho upload progress
4. **Add batch operations** cho bulk update/delete
5. **Add file compression** trước khi upload

