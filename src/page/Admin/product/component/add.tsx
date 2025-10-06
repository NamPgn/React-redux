import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Divider
} from "antd";
import {
  SaveOutlined,
  UploadOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { addProduct } from "../../../../redux/slice/product/thunk/product";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { ApiContext } from "../../../../context/api";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";

const { Title } = Typography;

interface ProductAddModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  version?: string;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({
  open,
  onClose,
  onSuccess,
  version
}) => {
  const { seri }: any = useContext(ApiContext);
  const { data }: any = useAppSelector((state) => state.category.category);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const categoryOptions = data ? [...data].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).map((item) => ({
    label: item.name,
    value: item._id,
  })) : [];

  const typeOptions = seri?.map((item) => ({
    label: item.name,
    value: item._id,
  })) || [];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", values.name || "");
      formdata.append("category", values.category || "");
      formdata.append("seri", values.seri || "");
      formdata.append("LinkCopyright", values.LinkCopyright || "");
      formdata.append("copyright", values.copyright || "");
      formdata.append("trailer", values.trailer || "");
      formdata.append("image", values.image || "");
      formdata.append("typeId", values.typeId || "");
      formdata.append("categorymain", values.categorymain || "");
      formdata.append("dailyMotionServer", values.dailyMotionServer || "");
      formdata.append("imageLink", values.imageLink || "");
      formdata.append("video2", values.video2 || "");

      const res = await dispatch(addProduct(formdata));
      if (res.payload.success === true) {
        toast.success("Thêm tập phim thành công");
        form.resetFields();
        onClose();
        onSuccess?.();
      } else {
        toast.error("Thêm tập phim thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: (file: any) => {
      form.setFieldsValue({ image: file });
      return false;
    },
  };

  return (
    <Modal
      title={
        <Space>
          <PlusOutlined style={{ color: '#1890ff' }} />
          <span>Tạo tập phim mới</span>
        </Space>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      className="admin-modal"
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
        padding: '24px'
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="admin-form"
        style={{ maxWidth: '100%' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên tập phim"
              rules={[{ required: true, message: 'Vui lòng nhập tên tập phim!' }]}
            >
              <Input placeholder="Nhập tên tập phim" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="seri"
              label="Số tập"
              rules={[{ required: true, message: 'Vui lòng nhập số tập!' }]}
            >
              <Input placeholder="Nhập số tập" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="view"
              label="Lượt xem"
            >
              <Input placeholder="Nhập số lượt xem" type="number" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select
                placeholder="Chọn danh mục"
                options={categoryOptions}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="typeId"
              label="Danh mục Donghua"
            >
              <Select
                placeholder="Chọn loại Donghua"
                options={typeOptions}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              name="video2"
              label="Link video chính"
            >
              <Input placeholder="Nhập link video chính" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="dailyMotionServer"
              label="DailyMotion Server"
            >
              <Input placeholder="Nhập DailyMotion server" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="trailer"
              label="Video trailer"
            >
              <Input placeholder="Nhập link video trailer" />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              name="imageLink"
              label="Link hình ảnh"
            >
              <Input placeholder="Nhập link hình ảnh" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="copyright"
              label="Bản quyền"
            >
              <Input placeholder="Nhập thông tin bản quyền" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name="LinkCopyright"
              label="Link bản quyền"
            >
              <Input placeholder="Nhập link bản quyền" />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              name="image"
              label="Upload hình ảnh"
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>
                  Chọn file hình ảnh
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {/* Submit Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '16px'
        }}>
          <Button onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
          >
            Tạo tập phim
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductAddModal;
