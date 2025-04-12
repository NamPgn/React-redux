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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import reportApi from '../../../sevices/report';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Product {
  _id: string;
  name: string;
  slug: string;
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

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    total: 1,
    pageSize: 10,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: null,
    search: '',
  });

  const columns: ColumnsType<Report> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 100,
    },
    {
      title: 'Phim',
      dataIndex: ['product', 'name'],
      key: 'movieTitle',
      render: (text, record) => (
        <a href={`/movies/${record.product._id}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Phản hồi',
      dataIndex: 'reaction',
      key: 'reaction',
    },
    {
      title: 'Nội dung',
      dataIndex: 'comment',
      key: 'comment',
      width: 300,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: 'gold',
          resolved: 'green',
          rejected: 'red',
        };
        const labels = {
          pending: 'Chờ xử lý',
          resolved: 'Đã xử lý',
          rejected: 'Từ chối',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {labels[status as keyof typeof labels]}
          </Tag>
        );
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button type="primary" onClick={() => handleResolve(record._id)}>
                Xử lý
              </Button>
              <Button danger onClick={() => handleReject(record._id)}>
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await reportApi.getReports();
      setReports(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Không thể tải danh sách báo cáo');
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await reportApi.resolveReport(id);
      toast.success('Đã xử lý báo cáo thành công');
      fetchReports();
    } catch (error) {
      toast.error('Không thể xử lý báo cáo');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await reportApi.rejectReport(id);
      toast.success('Đã từ chối báo cáo');
      fetchReports();
    } catch (error) {
      toast.error('Không thể từ chối báo cáo');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesStatus = filters.status === 'all' || report.status === filters.status;
    const matchesSearch = report.product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         report.comment.toLowerCase().includes(filters.search.toLowerCase());
    
    if (!filters.dateRange) {
      return matchesStatus && matchesSearch;
    }

    const reportDate = new Date(report.createdAt);
    const [startDate, endDate] = filters.dateRange;
    const isInDateRange = reportDate >= startDate && reportDate <= endDate;

    return matchesStatus && matchesSearch && isInDateRange;
  });

  return (
    <Card>
      <Title level={2}>Quản lý báo cáo</Title>
      
      <Space style={{ marginBottom: 16 }} size="middle">
        <Input
          placeholder="Tìm kiếm theo tên phim hoặc nội dung"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
        
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={value => setFilters(prev => ({ ...prev, status: value }))}
          options={[
            { value: 'all', label: 'Tất cả' },
            { value: 'pending', label: 'Chờ xử lý' },
            { value: 'resolved', label: 'Đã xử lý' },
            { value: 'rejected', label: 'Từ chối' },
          ]}
        />

        <RangePicker
          onChange={(dates) => {
            if (dates) {
              setFilters(prev => ({ ...prev, dateRange: dates }));
            } else {
              setFilters(prev => ({ ...prev, dateRange: null }));
            }
          }}
        />

        <Button
          icon={<ReloadOutlined />}
          onClick={fetchReports}
        >
          Làm mới
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredReports}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: pagination.current,
          total: pagination.totalItems,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} báo cáo`,
        }}
      />
    </Card>
  );
};

export default ReportManagement;
