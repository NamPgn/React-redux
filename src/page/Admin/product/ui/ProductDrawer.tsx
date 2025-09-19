import React from 'react';
import { 
  Drawer, 
  Button, 
  Space, 
  Row, 
  Col, 
  Divider,
  Popconfirm,
  Typography
} from 'antd';
import {
  DeleteOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  DownloadOutlined,
  ClearOutlined,
  PlusOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';

const { Title, Text } = Typography;

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onDeleteSelected: () => void;
  onApproveMultiple: () => void;
  onEditMultiple: () => void;
  onClearCache: () => void;
  onClearCacheRedis: () => void;
  categories: any[];
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  open,
  onClose,
  onDeleteSelected,
  onApproveMultiple,
  onEditMultiple,
  onClearCache,
  onClearCacheRedis,
  categories,
}) => {
  return (
    <Drawer
      title="Product Management"
      onClose={onClose}
      open={open}
      width={400}
      styles={{
        body: { padding: '16px' }
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Product Management Section */}
        <div>
          <Title level={5} style={{ marginBottom: '12px' }}>
            Product Management
          </Title>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Popconfirm
              title="Xóa sản phẩm đã chọn"
              description="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
              onConfirm={onDeleteSelected}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                block
              >
                Xóa sản phẩm đã chọn
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Duyệt nhiều sản phẩm"
              description="Bạn có chắc chắn muốn duyệt các sản phẩm đã chọn?"
              onConfirm={onApproveMultiple}
              okText="Duyệt"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                block
              >
                Duyệt nhiều sản phẩm
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Chỉnh sửa nhiều sản phẩm"
              description="Bạn có chắc chắn muốn chỉnh sửa các sản phẩm đã chọn?"
              onConfirm={onEditMultiple}
              okText="Chỉnh sửa"
              cancelText="Hủy"
            >
              <Button
                type="default"
                icon={<EditOutlined />}
                block
              >
                Mã hóa tập phim Dailymotion
              </Button>
            </Popconfirm>

            <MVLink to={"/dashboard/product/creacting"}>
              <Button
                type="default"
                icon={<FileExcelOutlined />}
                block
              >
                Thêm tập phim từ Excel
              </Button>
            </MVLink>

            <MVLink to={"/dashboard/product/add-multiple-episode"}>
              <Button
                type="default"
                icon={<PlusOutlined />}
                block
              >
                Thêm nhiều tập phim
              </Button>
            </MVLink>
          </Space>
        </div>

        <Divider />

        {/* Export Section */}
        <div>
          <Title level={5} style={{ marginBottom: '12px' }}>
            Xuất dữ liệu
          </Title>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <MVLink to={"/dashboard/product/export-pdf"}>
                <Button
                  type="default"
                  icon={<FileTextOutlined />}
                  block
                >
                  Xuất PDF
                </Button>
              </MVLink>
            </Col>
            <Col span={12}>
              <Button
                type="default"
                icon={<DownloadOutlined />}
                block
              >
                Xuất Excel
              </Button>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Cache Management Section */}
        <div>
          <Title level={5} style={{ marginBottom: '12px' }}>
            Quản lý Cache
          </Title>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Button
              onClick={onClearCache}
              type="default"
              icon={<ClearOutlined />}
              block
            >
              Xóa Cache Sản phẩm
            </Button>

            <Button
              onClick={onClearCacheRedis}
              type="default"
              icon={<ClearOutlined />}
              block
            >
              Xóa toàn bộ Redis
            </Button>
          </Space>
        </div>

      </Space>
    </Drawer>
  );
};

export default ProductDrawer;