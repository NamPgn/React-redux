import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { sendTestNotification } from "../../sevices/push-notification";

const { TextArea } = Input;

interface QuickSendButtonProps {
  categoryName?: string;
  categorySlug?: string;
  episode?: string | number;
  type?: "button" | "link" | "text";
  size?: "small" | "middle" | "large";
}

/**
 * Component nhanh để gửi push notification từ bất kỳ đâu
 */
const QuickSendButton: React.FC<QuickSendButtonProps> = ({
  categoryName,
  categorySlug,
  episode,
  type = "button",
  size = "middle",
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSend = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập");
        return;
      }

      await sendTestNotification(
        {
          title: values.title,
          body: values.body,
          data: {
            type: episode ? "new_episode" : "new_category",
            categorySlug,
            episode,
          },
        },
        token
      );

      toast.success("🔔 Notification đã được gửi!");
      setVisible(false);
      form.resetFields();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gửi thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill form khi mở modal
  const handleOpen = () => {
    if (categoryName && episode) {
      form.setFieldsValue({
        title: `Tập ${episode} mới đã ra! 🎬`,
        body: `${categoryName} - Tập ${episode} vừa được cập nhật`,
      });
    } else if (categoryName) {
      form.setFieldsValue({
        title: "Phim mới đã ra mắt! 🎉",
        body: `${categoryName} đã được thêm vào thư viện`,
      });
    }
    setVisible(true);
  };

  return (
    <>
      <Button
        type={type === "button" ? "primary" : "link"}
        icon={<BellOutlined />}
        onClick={handleOpen}
        size={size}
      >
        Gửi Notification
      </Button>

      <Modal
        title="Gửi Push Notification"
        open={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleSend}>
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
              placeholder="Đây là test notification"
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Button
              onClick={() => {
                setVisible(false);
                form.resetFields();
              }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Gửi
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default QuickSendButton;

