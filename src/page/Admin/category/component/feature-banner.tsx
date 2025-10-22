import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Select,
  InputNumber,
  Switch,
  Image,
  Typography,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Input,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DragOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { featureBannerApi } from "../../../../sevices/feature-banner";
import { getAllcategory } from "../../../../sevices/category";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { getAllCategoryAdminSlice } from "../../../../redux/slice/category/thunk/category";

const { Text, Title } = Typography;
const { TextArea } = Input;

interface FeatureBanner {
  _id: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    linkImg: string;
    des?: string;
    rating?: number[];
    ratingCount?: number;
    year?: string;
    status?: string;
  };
  title?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Row component có thể drag
const DraggableRow = ({ children, ...props }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "move",
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
};

const FeatureBanner: React.FC = () => {
  const [featureBanners, setFeatureBanners] = useState<FeatureBanner[]>([]);
  const categories: any = useAppSelector((state) => state.category.category);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<FeatureBanner | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  // Fetch feature banners
  const fetchFeatureBanners = async () => {
    setLoading(true);
    try {
      const response = await featureBannerApi.getFeatureBanners();
      setFeatureBanners(response.data || []);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatureBanners();
    dispatch(getAllCategoryAdminSlice({ page: 0 }));
  }, []);

  // Tạo feature banner mới
  const handleCreate = async (values: any) => {
    try {
      await featureBannerApi.createFeatureBanner(values);
      message.success("Thêm feature banner thành công!");
      setIsModalOpen(false);
      form.resetFields();
      fetchFeatureBanners();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi thêm feature banner"
      );
    }
  };

  // Cập nhật feature banner
  const handleUpdate = async (values: any) => {
    if (!editingBanner) return;

    try {
      await featureBannerApi.updateFeatureBanner(editingBanner._id, values);
      message.success("Cập nhật feature banner thành công!");
      setIsEditModalOpen(false);
      setEditingBanner(null);
      editForm.resetFields();
      fetchFeatureBanners();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi cập nhật feature banner"
      );
    }
  };

  // Xóa feature banner
  const handleDelete = async (id: string) => {
    try {
      await featureBannerApi.deleteFeatureBanner(id);
      message.success("Xóa feature banner thành công!");
      fetchFeatureBanners();
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Lỗi khi xóa feature banner"
      );
    }
  };

  // Toggle status
  const handleToggleStatus = async (id: string) => {
    try {
      await featureBannerApi.toggleFeatureBannerStatus(id);
      message.success("Cập nhật trạng thái thành công!");
      fetchFeatureBanners();
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Lỗi khi cập nhật trạng thái");
    }
  };

  // Mở modal edit
  const showEditModal = (banner: FeatureBanner) => {
    setEditingBanner(banner);
    editForm.setFieldsValue({
      categoryId: banner.category._id,
      title: banner.title,
      description: banner.description,
      order: banner.order,
      isActive: banner.isActive,
    });
    setIsEditModalOpen(true);
  };

  // Drag & Drop - Sắp xếp
  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFeatureBanners((prev) => {
        const activeIndex = prev.findIndex((i) => i._id === active.id);
        const overIndex = prev.findIndex((i) => i._id === over?.id);
        const newData = arrayMove(prev, activeIndex, overIndex);

        // Update orders
        const orders = newData.map((item, index) => ({
          id: item._id,
          order: index + 1,
        }));

        // Gọi API update order
        featureBannerApi
          .updateFeatureBannerOrder(orders)
          .then(() => {
            message.success("Cập nhật thứ tự thành công!");
          })
          .catch((error) => {
            message.error("Lỗi khi cập nhật thứ tự");
            fetchFeatureBanners(); // Reload lại nếu lỗi
          });

        return newData;
      });
    }
  };

  // Lọc categories chưa được thêm vào feature banner
  const availableCategories = categories?.data?.filter(
    (cat) => !featureBanners.some((fb) => fb.category._id === cat._id)
  );

  const columns = [
    {
      title: <DragOutlined />,
      dataIndex: "sort",
      width: 50,
      className: "drag-visible",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      width: 80,
      render: (order: number) => <Tag color="blue">{order}</Tag>,
    },
    {
      title: "Poster",
      dataIndex: "linkImg",
      key: "linkImg",
      width: 120,
      render: (_: any, record: FeatureBanner) => (
        <Image
          src={record.category.linkImg}
          width={80}
          height={120}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_: any, record: FeatureBanner) => (
        <div>
          <Text strong>{record.category.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.category.slug}
          </Text>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => title || <Text type="secondary">N/A</Text>,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
      render: (_: any, record: FeatureBanner) => record.category.year,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_: any, record: FeatureBanner) =>
        record.category.status === "completed" ? (
          <Tag color="success">Completed</Tag>
        ) : (
          <Tag color="warning">Pending</Tag>
        ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: 100,
      render: (isActive: boolean, record: FeatureBanner) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleStatus(record._id)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right" as const,
      render: (_: any, record: FeatureBanner) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Xóa feature banner?"
            description="Bạn có chắc muốn xóa feature banner này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={4} style={{ margin: 0 }}>
              Feature Banners Management
            </Title>
            <Text type="secondary">
              Quản lý các category nổi bật hiển thị trên trang chủ
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              disabled={availableCategories?.data?.length === 0}
            >
              Add Feature Banner
            </Button>
          </Col>
        </Row>

        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <SortableContext
            items={featureBanners.map((i) => i._id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{
                body: {
                  row: DraggableRow,
                },
              }}
              rowKey="_id"
              columns={columns}
              dataSource={featureBanners}
              loading={loading}
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </SortableContext>
        </DndContext>

        {featureBanners.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Text type="secondary">
              Chưa có feature banner nào. Hãy thêm category nổi bật!
            </Text>
          </div>
        )}
      </Card>

      {/* Modal thêm mới */}
      <Modal
        title="Add New Feature Banner"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
          initialValues={{ order: featureBanners.length + 1, isActive: true }}
        >
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn category!" }]}
          >
            <Select
              placeholder="Chọn category"
              showSearch
              filterOption={(input: string, option: any) =>
                (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase())
              }
              options={availableCategories?.map((cat: any) => ({
                label: cat.name,
                value: cat._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Title (Optional)"
            name="title"
            tooltip="Để trống sẽ dùng tên category"
          >
            <Input placeholder="Tiêu đề tùy chỉnh" />
          </Form.Item>

          <Form.Item
            label="Description (Optional)"
            name="description"
            tooltip="Để trống sẽ dùng mô tả category"
          >
            <TextArea rows={3} placeholder="Mô tả tùy chỉnh" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Order"
                name="order"
                rules={[{ required: true, message: "Vui lòng nhập thứ tự!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Active" name="isActive" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal edit */}
      <Modal
        title="Edit Feature Banner"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingBanner(null);
          editForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn category!" }]}
          >
            <Select
              placeholder="Chọn category"
              showSearch
              filterOption={(input: string, option: any) =>
                (option?.label as string ?? "").toLowerCase().includes(input.toLowerCase() as string)
              }
              options={categories?.data?.map((cat: any) => ({
                label: cat.name,
                value: cat._id,
              }))}
            />
          </Form.Item>

          <Form.Item label="Title (Optional)" name="title">
            <Input placeholder="Tiêu đề tùy chỉnh" />
          </Form.Item>

          <Form.Item label="Description (Optional)" name="description">
            <TextArea rows={3} placeholder="Mô tả tùy chỉnh" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Order"
                name="order"
                rules={[{ required: true, message: "Vui lòng nhập thứ tự!" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Active" name="isActive" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingBanner(null);
                  editForm.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeatureBanner;
