import React from 'react';
import { Modal, Typography, Divider } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface DeleteConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  selectedRecord: any;
  loading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
  selectedRecord,
  loading = false
}) => {
  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
          <span>Xác nhận xóa tập phim</span>
        </div>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ 
        danger: true,
        size: 'middle',
        loading
      }}
      cancelButtonProps={{
        size: 'middle'
      }}
      width={500}
      centered
    >
      {selectedRecord && (
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
                <Text>{selectedRecord.name}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Slug:</Text>
                <Text code>{selectedRecord.slug}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Danh mục:</Text>
                <Text>{selectedRecord.category}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Tập số:</Text>
                <Text>{selectedRecord.seri}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Trạng thái:</Text>
                <Text style={{ 
                  color: selectedRecord.isApproved ? '#52c41a' : '#faad14',
                  fontWeight: 'bold'
                }}>
                  {selectedRecord.isApproved ? 'Đã duyệt' : 'Chưa duyệt'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteConfirmModal;
