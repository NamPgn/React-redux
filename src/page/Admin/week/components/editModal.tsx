import React, { useEffect, useState } from "react";
import { Modal, Form, Input, TreeSelect, Button, Card, Space, Tag, Popconfirm, Row, Col, Divider } from "antd";
import { SaveOutlined, DeleteOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { getAllCategoryAdminSlice } from "../../../../redux/slice/category/thunk/category";
import { insertManyCategoryFromWeek, getCategoryByWeek, deleteCategoryByWeek } from "../../../../sevices/week";
import { toast } from "react-toastify";

const { SHOW_PARENT } = TreeSelect;

interface EditWeekModalProps {
  open: boolean;
  weekName: string | null;
  weekId: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditWeekModal: React.FC<EditWeekModalProps> = ({ open, weekName, weekId, onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { data: categories }: any = useAppSelector((state) => state.category.category);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [weekData, setWeekData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [form] = Form.useForm();
  
  // Fetch week data khi modal mở
  useEffect(() => {
    if (open && weekName) {
      fetchWeekData();
      dispatch(getAllCategoryAdminSlice({ page: 0 }));
    }
  }, [open, weekName]);

  const fetchWeekData = async () => {
    setFetching(true);
    try {
      const res = await getCategoryByWeek(weekName);
      if (res?.data) {
        setWeekData(res.data);
        form.setFieldsValue({ name: res.data.name });
        setSelectedCategories(res.data.content?.map((item: any) => item._id) || []);
      }
    } catch (error) {
      toast.error("Không thể tải dữ liệu week");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!weekId) return;

    setLoading(true);
    try {
      const res = await insertManyCategoryFromWeek(weekId, selectedCategories);
      if (res?.data) {
        toast.success(`Cập nhật ${values.name} thành công!`);
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      toast.error("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!weekId) return;

    try {
      const res = await deleteCategoryByWeek(weekId, { categoryId });
      if (res?.data) {
        toast.success("Xóa category thành công");
        // Cập nhật lại UI
        setSelectedCategories(prev => prev.filter(id => id !== categoryId));
        setWeekData((prev: any) => ({
          ...prev,
          content: prev.content.filter((item: any) => item._id !== categoryId)
        }));
      }
    } catch (error) {
      toast.error("Xóa category thất bại");
    }
  };

  const treeData = categories?.map((item: any) => ({
    title: item.name,
    value: item._id,
    key: item._id,
  }));

  const handleCancel = () => {
    form.resetFields();
    setSelectedCategories([]);
    setWeekData(null);
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <EditOutlined className="text-blue-500" />
          <span>Chỉnh sửa Week</span>
        </Space>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Tên Week"
          rules={[{ required: true, message: 'Vui lòng nhập tên week!' }]}
        >
          <Input placeholder="Nhập tên week" disabled />
        </Form.Item>

        <Form.Item label="Chọn Categories">
          <TreeSelect
            treeData={treeData}
            value={selectedCategories}
            onChange={setSelectedCategories}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            placeholder="Chọn categories"
            className="w-full"
            loading={fetching}
            showSearch
            filterTreeNode={(input, treeNode) =>
              (treeNode.title as string)?.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        {/* Danh sách categories hiện tại */}
        {weekData?.content && weekData.content.length > 0 && (
          <>
            <Divider orientation="left">
              Categories hiện tại ({weekData.content.length})
            </Divider>
            <div className="max-h-[300px] overflow-y-auto p-2 bg-gray-100 rounded-lg">
              <Row gutter={[8, 8]}>
                {weekData.content.map((category: any) => (
                  <Col span={24} key={category._id}>
                    <Card
                      size="small"
                      className="flex items-center "
                      bodyStyle={{
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Space className="w-10/12">
                        {category.linkImg && (
                          <img
                            src={category.linkImg}
                            alt={category.name}
                            className="w-10 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <Space size="small">
                            <Tag color="blue">{category.year}</Tag>
                            <Tag color="green">Tập {category.products?.[0]?.seri || 0}</Tag>
                            {category.tags?.map((tag: any) => (
                              <Tag key={tag._id} color="purple">{tag.name}</Tag>
                            ))}
                          </Space>
                        </div>
                      </Space>
                      <Popconfirm
                        title="Xóa category"
                        description="Bạn có chắc muốn xóa category này khỏi week?"
                        onConfirm={() => handleDeleteCategory(category._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                      >
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                        >
                          Xóa
                        </Button>
                      </Popconfirm>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}

        <Divider />

        <div className="flex justify-between pt-4">
          <Button onClick={handleCancel} icon={<CloseOutlined />}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditWeekModal;