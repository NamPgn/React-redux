import React, { useState, useEffect } from 'react';
import {
  Table,
  Space,
  Button,
  Tag,
  Input,
  Select,
  DatePicker,
  Card,
  Typography,
  Modal,
  Form,
  Statistic,
  Row,
  Col,
  Tooltip,
  Badge,
  Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import reportApi from '../../../sevices/report';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface Product {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
}

interface Report {
  _id: string;
  product: Product;
  reaction: string;
  comment: string;
  status: 'pending' | 'resolved' | 'rejected';
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  adminNote?: string;
  resolvedAt?: string;
  resolvedBy?: {
    username: string;
  };
}

interface PaginationData {
  current: number;
  total: number;
  pageSize: number;
  totalItems: number;
}

interface ApiResponse {
  success: boolean;
  data: Report[];
  pagination: PaginationData;
}

interface StatsData {
  totalStats: Array<{ _id: string; count: number }>;
  recentStats: Array<{
    _id: { date: string; status: string };
    count: number;
  }>;
}

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    total: 1,
    pageSize: 10,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null as [moment.Moment, moment.Moment] | null,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc' as 'asc' | 'desc'
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [form] = Form.useForm();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { dateRange, ...restFilters } = filters;
      const params: any = {
        ...restFilters,
        startDate: dateRange?.[0]?.toISOString(),
        endDate: dateRange?.[1]?.toISOString(),
        page: pagination.current,
        limit: pagination.pageSize
      };

      const response: any = await reportApi.getReports(params);
      setReports(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Không thể tải danh sách báo cáo');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await reportApi.deleteReports(id);
      toast.success('Đã xóa báo cáo');
      fetchReports();
    } catch (error) {
      toast.error('Không thể xóa báo cáo');
    }
  };

  const showReportModal = (record: Report) => {
    setSelectedReport(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      adminNote: record.adminNote || ''
    });
  };

  const columns: ColumnsType<Report> = [
    {
      title: 'Phim',
      dataIndex: ['product', 'name'],
      key: 'movieTitle',
      render: (text, record) => (
        <Space>
          <img
            src={record?.product?.thumbnail}
            alt={text}
            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
          />
          <div>
            <a href={`/movies/${record?.product?.slug}`} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(record.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Nội dung',
      key: 'content',
      render: (_, record) => (
        <div>
          <Tag color={record.reaction === 'error' ? 'red' : 'blue'}>
            {record.reaction}
          </Tag>
          <div style={{ marginTop: 4 }}>
            <Text>{record.comment}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record) => (
        <Space direction="vertical" size="small">
          <Tag color={
            status === 'pending' ? 'gold' :
              status === 'resolved' ? 'green' :
                'red'
          }>
            {status === 'pending' ? 'Chờ xử lý' :
              status === 'resolved' ? 'Đã xử lý' :
                'Từ chối'}
          </Tag>
          {record.resolvedBy && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Bởi: {record.resolvedBy.username}
            </Text>
          )}
        </Space>
      ),
      filters: [
        { text: 'Chờ xử lý', value: 'pending' },
        { text: 'Đã xử lý', value: 'resolved' },
        { text: 'Từ chối', value: 'rejected' },
      ],
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => showReportModal(record)}
              >
                Xử lý
              </Button>
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => showReportModal(record)}
              >
                Từ chối
              </Button>
            </>
          )}
          <Tooltip title="Chi tiết">
            <Button
              icon={<InfoCircleOutlined />}
              onClick={() => showReportModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchReports();
    // fetchStats();
  }, [filters, pagination.current, pagination.pageSize]);

  const renderStats = () => {
    if (!statsData) return null;

    const { totalStats } = statsData;
    const pendingCount = totalStats.find(s => s._id === 'pending')?.count || 0;
    const resolvedCount = totalStats.find(s => s._id === 'resolved')?.count || 0;
    const rejectedCount = totalStats.find(s => s._id === 'rejected')?.count || 0;

    return (
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Chờ xử lý"
              value={pendingCount}
              valueStyle={{ color: '#faad14' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đã xử lý"
              value={resolvedCount}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đã từ chối"
              value={rejectedCount}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Card>
      <Title level={2}>Quản lý báo cáo</Title>

      {renderStats()}

      <Space style={{ marginBottom: 16 }} size="middle">
        <Input
          placeholder="Tìm kiếm theo nội dung"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={filters.search}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />

        <Select
          value={filters.status}
          style={{ width: 120 }}
          onChange={value => setFilters(prev => ({ ...prev, status: value }))}
          options={[
            { value: 'all', label: 'Tất cả' },
            { value: 'pending', label: 'Chờ xử lý' },
            { value: 'resolved', label: 'Đã xử lý' },
            { value: 'rejected', label: 'Từ chối' },
          ]}
        />

        {/* <RangePicker
          value={filters.dateRange}
          onChange={(dates) => setFilters(prev => ({ ...prev, dateRange: dates }))}
        /> */}

        <Select
          value={filters.sortBy}
          style={{ width: 150 }}
          onChange={value => setFilters(prev => ({ ...prev, sortBy: value }))}
          options={[
            { value: 'createdAt', label: 'Thời gian tạo' },
            { value: 'resolvedAt', label: 'Thời gian xử lý' },
          ]}
        />

        <Select
          value={filters.sortOrder}
          style={{ width: 120 }}
          onChange={value => setFilters(prev => ({ ...prev, sortOrder: value }))}
          options={[
            { value: 'desc', label: 'Giảm dần' },
            { value: 'asc', label: 'Tăng dần' },
          ]}
        />

        <Button
          icon={<ReloadOutlined />}
          onClick={() => {
            setFilters({
              status: 'all',
              dateRange: null,
              search: '',
              sortBy: 'createdAt',
              sortOrder: 'desc'
            });
            fetchReports();
            // fetchStats();
          }}
        >
          Làm mới
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={reports}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: pagination.current,
          total: pagination.totalItems,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} báo cáo`,
          onChange: (page, pageSize) => {
            setPagination(prev => ({
              ...prev,
              current: page,
              pageSize: pageSize || 10
            }));
          }
        }}
      />

      <Modal
        title={`Chi tiết báo cáo ${selectedReport?.status === 'pending' ? '- Đang chờ xử lý' : ''}`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedReport(null);
          form.resetFields();
        }}
        footer={selectedReport?.status === 'pending' ? [
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Hủy
          </Button>,
          <Button
            key="reject"
            danger
            icon={<CloseCircleOutlined />}
          // onClick={() => handleUpdateStatus(selectedReport._id, 'rejected')}
          >
            Từ chối
          </Button>,
          <Button
            key="resolve"
            type="primary"
            icon={<CheckCircleOutlined />}
          // onClick={() => handleUpdateStatus(selectedReport._id, 'resolved')}
          >
            Chấp nhận
          </Button>,
        ] : [
          <Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>
        ]}
      >
        {selectedReport && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <img
                src={selectedReport.product.thumbnail}
                alt={selectedReport.product.name}
                style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Phim:</Text>
              <div>
                <a href={`/movies/${selectedReport.product.slug}`} target="_blank" rel="noopener noreferrer">
                  {selectedReport.product.name}
                </a>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Loại báo cáo:</Text>
              <div>
                <Tag color={selectedReport.reaction === 'error' ? 'red' : 'blue'}>
                  {selectedReport.reaction}
                </Tag>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Nội dung:</Text>
              <div>{selectedReport.comment}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Thông tin người báo cáo:</Text>
              <div>IP: {selectedReport.ipAddress}</div>
              <div>User Agent: {selectedReport.userAgent}</div>
            </div>

            {selectedReport.status !== 'pending' && (
              <div style={{ marginBottom: 16 }}>
                <Text strong>Ghi chú của admin:</Text>
                <div>{selectedReport.adminNote || 'Không có ghi chú'}</div>
              </div>
            )}

            {selectedReport.status === 'pending' && (
              <Form form={form}>
                <Form.Item
                  name="adminNote"
                  label="Ghi chú"
                  rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                >
                  <TextArea rows={4} placeholder="Nhập ghi chú xử lý..." />
                </Form.Item>
              </Form>
            )}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ReportManagement;
