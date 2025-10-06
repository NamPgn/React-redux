import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Space,
  Row,
  Col,
  Popconfirm,
  Card,
} from 'antd';
import {
  DeleteOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  DownloadOutlined,
  ClearOutlined,
  FileExcelOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';
import CreatingProductsModal from './creatingProducts';

interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onDeleteSelected: () => void;
  onApproveMultiple: () => void;
  onEditMultiple: () => void;
  onClearCache: () => void;
  onClearCacheRedis: () => void;
  categories: any[];
  version?: '2d' | '3d';
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  open,
  onClose,
  onDeleteSelected,
  onApproveMultiple,
  onEditMultiple,
  onClearCache,
  onClearCacheRedis,
  version = '3d',
}) => {
  const [excelModalVisible, setExcelModalVisible] = useState(false);

  return (
    <Drawer
      title="Quản lý sản phẩm"
      extra={<SettingOutlined />}
      onClose={onClose}
      open={open}
      width={420}
      styles={{
        body: { padding: 0 }
      }}
      destroyOnClose
    >
      <div className="h-full flex flex-col">

        {/* Product Actions Section */}
        <Card
          size="small"
          title="Thao tác"
          style={{ margin: '16px 16px 0 16px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
              onConfirm={onDeleteSelected}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                block
              >
                Xóa sản phẩm đã chọn
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Xác nhận duyệt"
              description="Duyệt các sản phẩm đã chọn?"
              onConfirm={onApproveMultiple}
              okText="Duyệt"
              cancelText="Hủy"
            >
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                block
              >
                Duyệt sản phẩm
              </Button>
            </Popconfirm>

            <Popconfirm
              title="Xác nhận chỉnh sửa"
              description="Mã hóa tập phim cho các sản phẩm đã chọn?"
              onConfirm={onEditMultiple}
              okText="Thực hiện"
              cancelText="Hủy"
            >
              <Button
                icon={<EditOutlined />}
                block
              >
                Mã hóa tập phim
              </Button>
            </Popconfirm>
          </Space>
        </Card>

        {/* Import Section */}
        <Card
          size="small"
          title="Thêm dữ liệu"
          style={{ margin: '12px 16px 0 16px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Button
            icon={<FileExcelOutlined />}
            block
            onClick={() => setExcelModalVisible(true)}
          >
            Thêm từ Excel
          </Button>
        </Card>

        {/* Export Section */}
        <Card
          size="small"
          title="Xuất dữ liệu"
          style={{ margin: '12px 16px 0 16px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <MVLink to={"/dashboard/product/export-pdf"}>
                <Button
                  icon={<FileTextOutlined />}
                  block
                >
                  PDF
                </Button>
              </MVLink>
            </Col>
            <Col span={12}>
              <Button
                icon={<DownloadOutlined />}
                block
              >
                Excel
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Cache Management Section */}
        <Card
          size="small"
          title="Quản lý cache"
          style={{ margin: '12px 16px 16px 16px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Button
              onClick={onClearCache}
              icon={<ClearOutlined />}
              block
            >
              Xóa Cache Episodes
            </Button>

            <Button
              onClick={onClearCacheRedis}
              icon={<ClearOutlined />}
              block
              danger
              type="dashed"
            >
              Xóa toàn bộ Redis
            </Button>
          </Space>
        </Card>

      </div>

      {/* Excel Import Modal */}
      <CreatingProductsModal
        open={excelModalVisible}
        onClose={() => setExcelModalVisible(false)}
        onSuccess={() => {
          // Refresh data if needed
          setExcelModalVisible(false);
        }}
      />
    </Drawer>
  );
};

export default ProductDrawer;