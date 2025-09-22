import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Space,
  Row,
  Col,
  Divider,
  Popconfirm,
  Typography,
  Card,
  Tooltip,
} from 'antd';
import {
  DeleteOutlined,
  CheckCircleOutlined,
  EditOutlined,
  FileTextOutlined,
  DownloadOutlined,
  ClearOutlined,
  FileExcelOutlined,
  PlusOutlined,
  SettingOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import MVLink from '../../../../components/Location/Link';
import CreatingProductsModal from './creatingProducts';

const { Text } = Typography;

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
}) => {
  const [excelModalVisible, setExcelModalVisible] = useState(false);

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <SettingOutlined className="text-base" />
          <span>Quản lý</span>
        </div>
      }
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
          title={
            <Text strong style={{ fontSize: '14px', color: '#666' }}>
              Thao tác
            </Text>
          }
          style={{ margin: '16px 16px 0 16px', borderRadius: '6px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Popconfirm
                title="Xác nhận xóa"
                description="Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?"
                onConfirm={onDeleteSelected}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true, size: 'small' }}
                cancelButtonProps={{ size: 'small' }}
              >
                <Button
                  danger
                  icon={<DeleteOutlined className="text-base" />}
                  size="middle"
                  block
                  className="h-9 flex items-center justify-center gap-2"
                >
                  <span className="text-sm font-medium">Xóa sản phẩm đã chọn</span>
                </Button>
              </Popconfirm>
            </Col>

            <Col span={12}>
              <Popconfirm
                title="Xác nhận duyệt"
                description="Duyệt các sản phẩm đã chọn?"
                onConfirm={onApproveMultiple}
                okText="Duyệt"
                cancelText="Hủy"
                okButtonProps={{ size: 'small' }}
                cancelButtonProps={{ size: 'small' }}
              >
                <Tooltip title="Duyệt nhiều sản phẩm">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined className="text-base" />}
                    size="middle"
                    block
                    className="h-9 flex items-center justify-center gap-2"
                  >
                    <span className="text-sm font-medium">Duyệt</span>
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Col>

            <Col span={12}>
              <Popconfirm
                title="Xác nhận chỉnh sửa"
                description="Mã hóa tập phim cho các sản phẩm đã chọn?"
                onConfirm={onEditMultiple}
                okText="Thực hiện"
                cancelText="Hủy"
                okButtonProps={{ size: 'small' }}
                cancelButtonProps={{ size: 'small' }}
              >
                <Tooltip title="Mã hóa tập phim Dailymotion">
                  <Button
                    icon={<EditOutlined className="text-base" />}
                    size="middle"
                    block
                    className="h-9 flex items-center justify-center gap-2"
                  >
                    <span className="text-sm font-medium">Mã hóa</span>
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Col>
          </Row>
        </Card>

        {/* Import Section */}
        <Card
          size="small"
          title={
            <Text strong style={{ fontSize: '14px', color: '#666' }}>
              Thêm dữ liệu
            </Text>
          }
          style={{ margin: '12px 16px 0 16px', borderRadius: '6px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Button
            icon={<FileExcelOutlined className="text-base" />}
            size="middle"
            block
            className="h-9 flex items-center justify-center gap-2"
            onClick={() => setExcelModalVisible(true)}
          >
            <PlusOutlined className="text-xs mr-1" />
            <span className="text-sm font-medium">Thêm từ Excel</span>
          </Button>
        </Card>

        {/* Export Section */}
        <Card
          size="small"
          title={
            <Text strong style={{ fontSize: '14px', color: '#666' }}>
              Xuất dữ liệu
            </Text>
          }
          style={{ margin: '12px 16px 0 16px', borderRadius: '6px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <MVLink to={"/dashboard/product/export-pdf"}>
                <Tooltip title="Xuất danh sách sản phẩm ra file PDF">
                  <Button
                    icon={<FileTextOutlined className="text-base" />}
                    size="middle"
                    block
                    className="h-9 flex items-center justify-center gap-2"
                  >
                    <span className="text-sm font-medium">PDF</span>
                  </Button>
                </Tooltip>
              </MVLink>
            </Col>
            <Col span={12}>
              <Tooltip title="Xuất danh sách sản phẩm ra file Excel">
                <Button
                  icon={<DownloadOutlined className="text-base" />}
                  size="middle"
                  block
                  className="h-9 flex items-center justify-center gap-2"
                >
                  <span className="text-sm font-medium">Excel</span>
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Card>

        {/* Cache Management Section */}
        <Card
          size="small"
          title={
            <div className="flex items-center gap-1.5">
              <DatabaseOutlined className="text-sm text-gray-500" />
              <Text strong className="text-sm text-gray-500">
                Quản lý bộ nhớ đệm
              </Text>
            </div>
          }
          style={{ margin: '12px 16px 16px 16px', borderRadius: '6px' }}
          bodyStyle={{ padding: '12px' }}
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Tooltip title="Xóa cache của tất cả sản phẩm">
              <Button
                onClick={onClearCache}
                icon={<ClearOutlined className="text-base" />}
                size="middle"
                block
                className="h-9 flex items-center justify-center gap-2"
              >
                <span className="text-sm font-medium">Xóa Cache Episodes</span>
              </Button>
            </Tooltip>

            <Tooltip title="Xóa toàn bộ dữ liệu Redis cache">
              <Button
                onClick={onClearCacheRedis}
                icon={<ClearOutlined className="text-base" />}
                size="middle"
                block
                className="h-9 flex items-center justify-center gap-2"
                danger
                type="dashed"
              >
                <span className="text-sm font-medium">Xóa toàn bộ Redis</span>
              </Button>
            </Tooltip>
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