import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Row,
  Col,
  Statistic,
  Tooltip,
  Badge,
  Popconfirm,
  DatePicker,
  Select,
  Input,
  Modal,
  Descriptions,
  Progress,
} from "antd";
import {
  BellOutlined,
  ReloadOutlined,
  DeleteOutlined,
  SendOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import PageTitle from "../../../components/PageTitle";
import {
  useNotifications,
  useNotificationStats,
  useResendNotification,
  useDeleteNotification,
} from "../../../hook/useNotifications";
import type { Notification } from "../../../sevices/notification";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const NotificationHistory: React.FC = () => {
  // State
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [filters, setFilters] = useState<{
    status?: "pending" | "sent" | "failed" | "partial";
    categoryId?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  // React Query hooks
  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useNotifications({
    ...pagination,
    ...filters,
  });
  
  const { data: statsData } = useNotificationStats(filters.startDate, filters.endDate);

  const resendMutation = useResendNotification();
  const deleteMutation = useDeleteNotification();

  // Handlers
  const handleTableChange = (newPagination: any) => {
    setPagination({
      page: newPagination.current,
      limit: newPagination.pageSize,
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination({ ...pagination, page: 1 }); // Reset to page 1
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setFilters((prev) => ({
        ...prev,
        startDate: dates[0]?.toISOString(),
        endDate: dates[1]?.toISOString(),
      }));
    } else {
      setFilters((prev) => {
        const { startDate, endDate, ...rest } = prev;
        return rest;
      });
    }
    setPagination({ ...pagination, page: 1 });
  };

  const handleResend = (id: string) => {
    resendMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleViewDetail = (record: Notification) => {
    setSelectedNotification(record);
    setDetailModalVisible(true);
  };

  const clearFilters = () => {
    setFilters({});
    setPagination({ page: 1, limit: 20 });
  };

  // Stats calculations
  const stats = statsData?.data?.summary || {
    totalNotifications: 0,
    totalRecipients: 0,
    totalSuccess: 0,
    totalFailures: 0,
    successRate: "0.00",
  };

  // Table columns
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "sentAt",
      key: "sentAt",
      width: 160,
      sorter: (a: Notification, b: Notification) =>
        dayjs(a.sentAt).unix() - dayjs(b.sentAt).unix(),
      render: (date: Date) => (
        <Tooltip title={dayjs(date).format("DD/MM/YYYY HH:mm:ss")}>
          <Space direction="vertical" size={0}>
            <Text>{dayjs(date).format("DD/MM/YYYY")}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {dayjs(date).format("HH:mm:ss")}
            </Text>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: "Thông báo",
      key: "content",
      render: (record: Notification) => (
        <Space direction="vertical" size={0} style={{ maxWidth: "300px" }}>
          <Text strong ellipsis>
            {record.title}
          </Text>
          <Text type="secondary" ellipsis style={{ fontSize: "12px" }}>
            {record.body}
          </Text>
        </Space>
      ),
    },
    {
      title: "Category",
      key: "category",
      width: 180,
      render: (record: Notification) => (
        <Space direction="vertical" size={0}>
          <Text>{record.categoryId?.name || "N/A"}</Text>
          {record.episodeNumber && (
            <Tag color="blue" style={{ fontSize: "11px" }}>
              Tập {record.episodeNumber}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Người nhận",
      dataIndex: "totalRecipients",
      key: "totalRecipients",
      width: 100,
      align: "center" as const,
      render: (count: number) => (
        <Badge
          count={count}
          showZero
          style={{ backgroundColor: "#1890ff" }}
          overflowCount={9999}
        />
      ),
    },
    {
      title: "Kết quả",
      key: "result",
      width: 200,
      render: (record: Notification) => {
        const successRate =
          record.totalRecipients > 0
            ? ((record.successCount / record.totalRecipients) * 100).toFixed(1)
            : 0;
        return (
          <Space direction="vertical" size={4} style={{ width: "100%" }}>
            <Progress
              percent={Number(successRate)}
              size="small"
              status={record.status === "sent" ? "success" : record.status === "failed" ? "exception" : "normal"}
            />
            <Space size={4} style={{ fontSize: "11px" }}>
              <Text type="success">✓ {record.successCount}</Text>
              <Text type="secondary">|</Text>
              <Text type="danger">✗ {record.failureCount}</Text>
            </Space>
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      filters: [
        { text: "Đã gửi", value: "sent" },
        { text: "Thất bại", value: "failed" },
        { text: "Một phần", value: "partial" },
        { text: "Đang chờ", value: "pending" },
      ],
      onFilter: (value: any, record: Notification) => record.status === value,
      render: (status: string) => {
        const statusConfig: any = {
          sent: { color: "success", icon: <CheckCircleOutlined />, text: "Đã gửi" },
          failed: { color: "error", icon: <CloseCircleOutlined />, text: "Thất bại" },
          partial: { color: "warning", icon: <ExclamationCircleOutlined />, text: "Một phần" },
          pending: { color: "processing", icon: <ReloadOutlined />, text: "Đang chờ" },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Người gửi",
      key: "sentBy",
      width: 120,
      render: (record: Notification) =>
        record.sentBy ? (
          <Tooltip title={record.sentBy.email}>
            <Text>{record.sentBy.username}</Text>
          </Tooltip>
        ) : (
          <Text type="secondary">System</Text>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 150,
      fixed: "right" as const,
      render: (record: Notification) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
          {record.status === "failed" && (
            <Tooltip title="Gửi lại">
              <Button
                type="text"
                size="small"
                icon={<SendOutlined />}
                loading={resendMutation.isPending}
                onClick={() => handleResend(record._id)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="Xóa notification này?"
            description="Hành động này không thể hoàn tác"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                loading={deleteMutation.isPending}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <PageTitle
          title="Lịch sử thông báo"
          subtitle="Theo dõi và quản lý các push notifications đã gửi"
        />

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: "24px", marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Tổng thông báo"
                value={stats.totalNotifications}
                prefix={<BellOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Người nhận"
                value={stats.totalRecipients}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Thành công"
                value={stats.totalSuccess}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#52c41a" }}
                suffix={`/ ${stats.totalRecipients}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Tỷ lệ thành công"
                value={stats.successRate}
                suffix="%"
                precision={2}
                valueStyle={{ color: Number(stats.successRate) >= 95 ? "#52c41a" : "#faad14" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card style={{ marginBottom: "16px" }}>
          <Space wrap size="middle">
            <RangePicker
              placeholder={["Từ ngày", "Đến ngày"]}
              format="DD/MM/YYYY"
              onChange={handleDateRangeChange}
              allowClear
            />
            <Select
              placeholder="Trạng thái"
              style={{ width: 150 }}
              allowClear
              onChange={(value) => handleFilterChange("status", value)}
              value={filters.status}
            >
              <Select.Option value="sent">Đã gửi</Select.Option>
              <Select.Option value="failed">Thất bại</Select.Option>
              <Select.Option value="partial">Một phần</Select.Option>
              <Select.Option value="pending">Đang chờ</Select.Option>
            </Select>
            <Button icon={<FilterOutlined />} onClick={clearFilters}>
              Xóa bộ lọc
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => refetch()}>
              Làm mới
            </Button>
          </Space>
        </Card>

        {/* Notifications Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={notificationsData?.data || []}
            rowKey="_id"
            loading={isLoading}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              total: notificationsData?.pagination?.total || 0,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} thông báo`,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            onChange={handleTableChange}
            scroll={{ x: 1400 }}
            size="middle"
          />
        </Card>

        {/* Detail Modal */}
        <Modal
          title={
            <Space>
              <BellOutlined style={{ color: "#1890ff" }} />
              <span>Chi tiết thông báo</span>
            </Space>
          }
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              Đóng
            </Button>,
            selectedNotification?.status === "failed" && (
              <Button
                key="resend"
                type="primary"
                icon={<SendOutlined />}
                onClick={() => {
                  if (selectedNotification) {
                    handleResend(selectedNotification._id);
                    setDetailModalVisible(false);
                  }
                }}
                loading={resendMutation.isPending}
              >
                Gửi lại
              </Button>
            ),
          ].filter(Boolean)}
          width={800}
        >
          {selectedNotification && (
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Tiêu đề" span={2}>
                <Text strong>{selectedNotification.title}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung" span={2}>
                {selectedNotification.body}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {selectedNotification.categoryId?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Episode">
                {selectedNotification.episodeNumber ? `Tập ${selectedNotification.episodeNumber}` : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian gửi">
                {dayjs(selectedNotification.sentAt).format("DD/MM/YYYY HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="Người gửi">
                {selectedNotification.sentBy?.username || "System"}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng người nhận">
                <Badge count={selectedNotification.totalRecipients} showZero />
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {(() => {
                  const statusConfig: any = {
                    sent: { color: "success", icon: <CheckCircleOutlined />, text: "Đã gửi" },
                    failed: { color: "error", icon: <CloseCircleOutlined />, text: "Thất bại" },
                    partial: { color: "warning", icon: <ExclamationCircleOutlined />, text: "Một phần" },
                    pending: { color: "processing", icon: <ReloadOutlined />, text: "Đang chờ" },
                  };
                  const config = statusConfig[selectedNotification.status] || statusConfig.pending;
                  return (
                    <Tag color={config.color} icon={config.icon}>
                      {config.text}
                    </Tag>
                  );
                })()}
              </Descriptions.Item>
              <Descriptions.Item label="Thành công">
                <Text type="success">{selectedNotification.successCount}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Thất bại">
                <Text type="danger">{selectedNotification.failureCount}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tỷ lệ thành công" span={2}>
                <Progress
                  percent={
                    selectedNotification.totalRecipients > 0
                      ? Number(
                          ((selectedNotification.successCount / selectedNotification.totalRecipients) * 100).toFixed(
                            1
                          )
                        )
                      : 0
                  }
                  status={
                    selectedNotification.status === "sent"
                      ? "success"
                      : selectedNotification.status === "failed"
                      ? "exception"
                      : "normal"
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Platform">
                {selectedNotification.platform || "expo"}
              </Descriptions.Item>
              <Descriptions.Item label="Category Slug">
                <Text code>{selectedNotification.categorySlug}</Text>
              </Descriptions.Item>
              {selectedNotification.errorMessage && (
                <Descriptions.Item label="Lỗi" span={2}>
                  <Text type="danger">{selectedNotification.errorMessage}</Text>
                </Descriptions.Item>
              )}
              {selectedNotification.data && (
                <Descriptions.Item label="Data (JSON)" span={2}>
                  <pre style={{ fontSize: "11px", maxHeight: "200px", overflow: "auto" }}>
                    {JSON.stringify(selectedNotification.data, null, 2)}
                  </pre>
                </Descriptions.Item>
              )}
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default NotificationHistory;

