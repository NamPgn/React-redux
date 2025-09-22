import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, Card, Typography, Space, Alert, Collapse } from "antd";
import { FileExcelOutlined, UploadOutlined, InboxOutlined, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { importDataFile } from "../../../../redux/slice/product/thunk/product";
import { useAppDispatch } from "../../../../hook";
import { toast } from "react-toastify";
interface CreatingProductsModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreatingProductsModal: React.FC<CreatingProductsModalProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add selected sheets (default to "0" if empty)
      formData.append("selectedSheets", values.selectedSheets || "0");
      
      // Add Excel file
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("excelProduct", fileList[0].originFileObj);
      } else {
        toast.error("Vui lòng chọn file Excel để upload");
        setLoading(false);
        return;
      }

      const response = await dispatch(importDataFile(formData));
      
      if (response?.payload?.success === true) {
        const data = response.payload.data;
        const message = data 
          ? `Thêm thành công ${data.inserted} sản phẩm từ Excel${data.skipped > 0 ? ` (bỏ qua ${data.skipped} dòng lỗi)` : ''}`
          : "Thêm sản phẩm từ Excel thành công";
        
        toast.success(message);
        form.resetFields();
        setFileList([]);
        onClose();
        onSuccess?.();
      } else {
        // Handle validation errors
        if (response?.payload?.errors && Array.isArray(response.payload.errors)) {
          const errorMessages = response.payload.errors.slice(0, 5); // Show first 5 errors
          toast.error(
            <div>
              <div>{response.payload.message}</div>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                {errorMessages.map((error, index) => (
                  <li key={index} style={{ fontSize: '12px' }}>{error}</li>
                ))}
              </ul>
              {response.payload.errors.length > 5 && (
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                  ... và {response.payload.errors.length - 5} lỗi khác
                </div>
              )}
            </div>,
            { autoClose: 10000 }
          );
    } else {
          toast.error(response?.payload?.message || "Thêm sản phẩm thất bại");
        }
      }
    } catch (error) {
      console.error('Excel import error:', error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onClose();
  };

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  const beforeUpload = (file: any) => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                   file.type === 'application/vnd.ms-excel';
    
    if (!isExcel) {
      toast.error('Chỉ được upload file Excel (.xlsx, .xls)');
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      toast.error('File phải nhỏ hơn 10MB');
      return false;
    }

    return false; // Prevent auto upload
  };
  return (
    <Modal
      title={
        <Space>
          <FileExcelOutlined style={{ color: '#1890ff' }} />
          <span>Thêm sản phẩm từ Excel</span>
        </Space>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={700}
      centered
      styles={{
        body: { padding: '24px' }
      }}
    >
      {/* Documentation Section */}
      <Collapse
        size="small"
        style={{ marginBottom: '16px' }}
        items={[
          {
            key: '1',
            label: (
              <Space>
                <InfoCircleOutlined style={{ color: '#1890ff' }} />
                <span>Hướng dẫn sử dụng Excel Import</span>
              </Space>
            ),
            children: (
              <div style={{ padding: '12px 0' }}>
                <Alert
                  message="Cấu trúc file Excel"
                  description={
                    <div>
                      <p><strong>Yêu cầu:</strong> File Excel phải có cấu trúc như sau:</p>
                      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li><strong>name:</strong> Tên tập phim (bắt buộc)</li>
                        <li><strong>seri:</strong> Số tập (bắt buộc)</li>
                        <li><strong>category:</strong> ID danh mục (bắt buộc)</li>
                        <li><strong>description:</strong> Mô tả (tùy chọn)</li>
                        <li><strong>image:</strong> URL hình ảnh (tùy chọn)</li>
                        <li><strong>videoUrl:</strong> URL video (tùy chọn)</li>
                        <li><strong>dailymotionServer:</strong> Server Dailymotion (tùy chọn)</li>
                        <li><strong>isApproved:</strong> Trạng thái duyệt true/false (tùy chọn)</li>
                      </ul>
                      <p style={{ marginTop: '12px' }}>
                        <strong>Lưu ý:</strong> Dòng đầu tiên là header, dữ liệu bắt đầu từ dòng thứ 2
                      </p>
                    </div>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: '12px' }}
                />
                <Alert
                  message="Ví dụ file Excel"
                  description={
                    <div>
                      <p>Dòng 1 (Header): <code>name | seri | category | description | image | videoUrl</code></p>
                      <p>Dòng 2 (Data): <code>Phim ABC | 1 | 507f1f77bcf86cd799439011 | Tập 1 hay | http://image.jpg | http://video.mp4</code></p>
                    </div>
                  }
                  type="success"
                  showIcon
                />
              </div>
            )
          }
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          selectedSheets: "0"
        }}
      >
        <Card 
          style={{ 
            marginBottom: '16px',
            border: '1px solid #e8e8e8'
          }}
        >
          <Typography.Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
            <Space>
              <InboxOutlined />
              <span>Thông tin Import</span>
            </Space>
          </Typography.Title>

          <Form.Item
            name="selectedSheets"
            label="Index Sheet"
            tooltip="Nhập số thứ tự sheet trong file Excel (bắt đầu từ 0). Sheet 0 là sheet đầu tiên."
            rules={[
              { required: true, message: 'Vui lòng nhập index sheet!' },
              { pattern: /^\d+$/, message: 'Index sheet phải là số!' }
            ]}
          >
            <Input 
              placeholder="Nhập index sheet (ví dụ: 0, 1, 2...)" 
              onPressEnter={() => form.submit()}
              addonBefore="Sheet"
            />
          </Form.Item>
        </Card>

        <Card 
          style={{ 
            marginBottom: '16px',
            border: '1px solid #e8e8e8'
          }}
        >
          <Typography.Title level={5} style={{ marginBottom: '16px', color: '#1890ff' }}>
            <Space>
              <UploadOutlined />
              <span>Upload File Excel</span>
            </Space>
          </Typography.Title>

          <Form.Item
            label="File Excel"
            required
            tooltip="Chọn file Excel (.xlsx, .xls) chứa dữ liệu sản phẩm theo cấu trúc đã hướng dẫn"
            extra="File phải có header ở dòng đầu tiên và dữ liệu từ dòng thứ 2"
          >
            <Upload.Dragger
              name="excelProduct"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
              accept=".xlsx,.xls"
              style={{ 
                background: '#fafafa',
                border: '2px dashed #d9d9d9',
                borderRadius: '6px'
              }}
            >
              <p className="ant-upload-drag-icon">
                <FileExcelOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                Click hoặc kéo thả file Excel vào đây
              </p>
              <p className="ant-upload-hint" style={{ color: '#666' }}>
                Hỗ trợ file .xlsx, .xls. Kích thước tối đa 10MB
              </p>
              <p className="ant-upload-hint" style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
                Đảm bảo file có cấu trúc đúng với header: name, seri, category
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Card>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '16px'
        }}>
          <Button 
            type="link"
            icon={<QuestionCircleOutlined />}
            onClick={() => {
              // Open documentation in new tab
              window.open('/docs/excel-import', '_blank');
            }}
            style={{ padding: '4px 8px' }}
          >
            Xem hướng dẫn chi tiết
          </Button>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={handleCancel}>
              Hủy
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              icon={<FileExcelOutlined />}
            >
              Import Excel
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatingProductsModal;
