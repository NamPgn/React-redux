import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  message,
  Popconfirm,
  Tooltip,
  Badge,
} from "antd";
import {
  BellOutlined,
  SendOutlined,
  DeleteOutlined,
  ReloadOutlined,
  AppleOutlined,
  AndroidOutlined,
  GlobalOutlined,
  UserOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import PageTitle from "../../../components/PageTitle";
import { useNotificationDevice } from "../../../hook/api/useNotificationDevice";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface PushToken {
  _id: string;
  token: string;
  userId?: {
    _id: string;
    username: string;
    email: string;
  };
  deviceInfo: {
    platform: "android" | "ios" | "web";
    deviceName: string;
    appVersion: string;
  };
  isActive: boolean;
  lastUsed: Date;
  createdAt: Date;
}

const PushNotificationManagement: React.FC = () => {
  const [sendLoading, setSendLoading] = useState(false);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // Fetch data using React Query hook
  const { data, isLoading, refetch } = useNotificationDevice(pagination.current, pagination.pageSize);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

  // Extract tokens and stats from data
  const tokens = data?.data || [];
  const totalCount = data?.totalCount || 0;
  
  // Calculate stats from tokens
  const stats = {
    totalActive: tokens.length,
    android: tokens.filter((t: PushToken) => t.deviceInfo?.platform === "android").length,
    ios: tokens.filter((t: PushToken) => t.deviceInfo?.platform === "ios").length,
    web: tokens.filter((t: PushToken) => t.deviceInfo?.platform === "web").length,
  };

  // Update pagination total when data changes
  useEffect(() => {
    if (data?.totalCount) {
      setPagination(prev => ({
        ...prev,
        total: data.totalCount,
      }));
    }
  }, [data]);


  // Send test notification
  const handleSendNotification = async (values: any) => {
    setSendLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload: any = {
        title: values.title,
        body: values.body,
        data: values.customData ? JSON.parse(values.customData) : undefined,
      };

      if (values.target === "specific" && values.token) {
        payload.token = values.token;
      }

      const response = await axios.post(
        `${API_BASE_URL}/push-notification/test`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("🔔 Notification đã được gửi thành công!");
        setSendModalVisible(false);
        form.resetFields();
      } else {
        toast.error("Gửi notification thất bại");
      }
    } catch (error: any) {
      console.error("Error sending notification:", error);
      toast.error(error.response?.data?.message || "Không thể gửi notification");
    } finally {
      setSendLoading(false);
    }
  };

  // Cleanup inactive tokens
  const handleCleanup = async (days = 30) => {
    setCleanupLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_BASE_URL}/push-tokens/cleanup`, {
        params: { days },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(`✅ Đã xóa ${response.data.deletedCount} token không hoạt động`);
        refetch(); // Refetch data using React Query
      }
    } catch (error: any) {
      console.error("Error cleanup tokens:", error);
      toast.error("Không thể cleanup tokens");
    } finally {
      setCleanupLoading(false);
    }
  };

  const columns = [
    {
      title: "Thiết bị",
      key: "device",
      width: 250,
      render: (record: PushToken) => (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            {record.deviceInfo?.platform === "android" && (
              <AndroidOutlined style={{ color: "#3DDC84", fontSize: "18px" }} />
            )}
            {record.deviceInfo?.platform === "ios" && (
              <AppleOutlined style={{ color: "#000", fontSize: "18px" }} />
            )}
            {record.deviceInfo?.platform === "web" && (
              <GlobalOutlined style={{ color: "#1890ff", fontSize: "18px" }} />
            )}
            <Text strong>{record.deviceInfo?.deviceName || "Unknown Device"}</Text>
          </Space>
          <Space>
            <Tag color="blue">{record.deviceInfo?.platform?.toUpperCase()}</Tag>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              v{record.deviceInfo?.appVersion || "N/A"}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "User",
      key: "user",
      width: 200,
      render: (record: PushToken) =>
        record.userId ? (
          <Space direction="vertical" size={0}>
            <Space>
              <UserOutlined />
              <Text>{record.userId.username}</Text>
            </Space>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.userId.email}
            </Text>
          </Space>
        ) : (
          <Text type="secondary">Guest</Text>
        ),
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      ellipsis: true,
      render: (token: string) => (
        <Tooltip title={token}>
          <Text code style={{ fontSize: "11px" }}>
            {token.substring(0, 30)}...
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Lần dùng cuối",
      dataIndex: "lastUsed",
      key: "lastUsed",
      width: 150,
      render: (date: Date) => (
        <Tooltip title={dayjs(date).format("DD/MM/YYYY HH:mm")}>
          <Text>{dayjs(date).fromNow()}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Đăng ký lúc",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: Date) => (
        <Tooltip title={dayjs(date).format("DD/MM/YYYY HH:mm")}>
          <Text type="secondary">{dayjs(date).fromNow()}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive: boolean) => (
        <Badge
          status={isActive ? "success" : "default"}
          text={isActive ? "Active" : "Inactive"}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "24px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <PageTitle
          title="Quản lý Push Notification"
          subtitle="Quản lý thiết bị nhận thông báo và gửi test notification"
        />

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: "24px", marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Tổng thiết bị"
                value={stats.totalActive}
                prefix={<MobileOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Android"
                value={stats.android}
                prefix={<AndroidOutlined />}
                valueStyle={{ color: "#3DDC84" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="iOS"
                value={stats.ios}
                prefix={<AppleOutlined />}
                valueStyle={{ color: "#000" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Web"
                value={stats.web}
                prefix={<GlobalOutlined />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Actions */}
        <Card style={{ marginBottom: "16px" }}>
          <Space wrap>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => setSendModalVisible(true)}
            >
              Gửi Test Notification
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => refetch()} loading={isLoading}>
              Làm mới
            </Button>
            <Popconfirm
              title="Xóa tokens không hoạt động?"
              description="Sẽ xóa tất cả tokens không hoạt động trong 30 ngày qua"
              onConfirm={() => handleCleanup(30)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={cleanupLoading}
              >
                Cleanup Tokens (30 days)
              </Button>
            </Popconfirm>
          </Space>
        </Card>

        {/* Tokens Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={tokens}
            rowKey="_id"
            loading={isLoading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: false,
              showTotal: (total) => `Tổng ${total} thiết bị`,
            }}
            onChange={(newPagination) => {
              setPagination({
                current: newPagination.current || 1,
                pageSize: newPagination.pageSize || 20,
                total: pagination.total,
              });
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Send Notification Modal */}
        <Modal
          title={
            <Space>
              <BellOutlined style={{ color: "#1890ff" }} />
              <span>Gửi Test Notification</span>
            </Space>
          }
          open={sendModalVisible}
          onCancel={() => {
            setSendModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleSendNotification}>
            <Form.Item
              name="target"
              label="Gửi đến"
              initialValue="all"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="all">Tất cả thiết bị</Select.Option>
                <Select.Option value="specific">Thiết bị cụ thể (token)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.target !== currentValues.target
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("target") === "specific" ? (
                  <Form.Item
                    name="token"
                    label="Push Token"
                    rules={[{ required: true, message: "Vui lòng nhập token!" }]}
                  >
                    <Input placeholder="ExponentPushToken[xxxxxx...]" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>

            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input placeholder="Test Notification 🔔" />
            </Form.Item>

            <Form.Item
              name="body"
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <TextArea
                rows={3}
                placeholder="Đây là test notification từ admin panel"
              />
            </Form.Item>

            <Form.Item
              name="customData"
              label="Custom Data (JSON)"
              tooltip="Dữ liệu bổ sung cho notification (optional)"
            >
              <TextArea
                rows={3}
                placeholder='{"type": "announcement", "url": "/movies/123"}'
              />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button
                onClick={() => {
                  setSendModalVisible(false);
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={sendLoading}>
                Gửi Notification
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default PushNotificationManagement;

