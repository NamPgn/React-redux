import React, { useState } from 'react';
import { 
  Button, 
  Space, 
  Modal, 
  Tooltip,
  Typography,
  Divider
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';

const { Title, Text } = Typography;

interface ProductActionsProps {
  record: any;
  user: any;
  onDelete: (id: string) => void;
  onEdit?: (record: any) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  record,
  user,
  onDelete,
  onEdit,
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(record.key);
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <Space size="small" wrap>
        {(user?.role === 1 || user?.role === 2) && onEdit && (
          <Tooltip title="Chỉnh sửa">
              <Button 
                type="text" 
                size="small"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
                className="admin-btn admin-btn-text"
              />
          </Tooltip>
        )}

        {/* Admin Actions - Role 2 only */}
        {user?.role === 2 && (
          <Tooltip title="Xóa sản phẩm">
            <Button 
              type="text" 
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalVisible(true)}
              className="admin-btn admin-btn-text"
            />
          </Tooltip>
        )}
      </Space>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
            <span>Xác nhận xóa tập phim</span>
          </div>
        }
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ 
          danger: true,
          size: 'middle',
          className: 'admin-btn admin-btn-primary'
        }}
        cancelButtonProps={{
          size: 'middle',
          className: 'admin-btn admin-btn-secondary'
        }}
        width={500}
        centered
        className="admin-modal"
      >
        <div style={{ marginTop: '16px' }}>
          <Text style={{ fontSize: '16px', color: '#666' }}>
            Bạn có chắc chắn muốn xóa tập phim này? Hành động này không thể hoàn tác.
          </Text>
          
          <Divider style={{ margin: '16px 0' }} />
          
          <div style={{ 
            background: '#fafafa', 
            padding: '16px', 
            borderRadius: '8px',
            border: '1px solid #e8e8e8'
          }}>
            <Title level={5} style={{ margin: '0 0 12px 0', color: '#1890ff' }}>
              Thông tin tập phim
            </Title>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Tên tập phim:</Text>
                <Text>{record.name}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Slug:</Text>
                <Text code>{record.slug}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Danh mục:</Text>
                <Text>{record.category}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Tập số:</Text>
                <Text>{record.seri}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Trạng thái:</Text>
                <Text style={{ 
                  color: record.isApproved ? '#52c41a' : '#faad14',
                  fontWeight: 'bold'
                }}>
                  {record.isApproved ? 'Đã duyệt' : 'Chưa duyệt'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductActions; 