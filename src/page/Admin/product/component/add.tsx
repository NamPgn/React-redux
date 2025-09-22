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
  EditOutlined, 
  UploadOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  PictureOutlined
} from "@ant-design/icons";
import { addProduct } from "../../../../redux/slice/product/thunk/product";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { ApiContext } from "../../../../context/api";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ProductAddModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const { seri }: any = useContext(ApiContext);
  const { data }: any = useAppSelector((state) => state.category.category);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllcate({ page: 0 }));
  }, []);

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
      formdata.append("name", values.name);
      formdata.append("category", values.category);
      formdata.append("seri", values.seri);
      formdata.append("LinkCopyright", values.LinkCopyright);
      formdata.append("copyright", values.copyright);
      formdata.append("trailer", values.trailer);
      formdata.append("image", values.image);
      formdata.append("typeId", values.typeId);
      formdata.append("categorymain", values.categorymain);
      formdata.append("dailyMotionServer", values.dailyMotionServer);
      formdata.append("imageLink", values.imageLink);
      formdata.append("video2", values.video2);

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
          <SaveOutlined style={{ color: '#1890ff' }} />
          <span>Tạo tập phim mới</span>
        </Space>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width="60%"
      centered
      styles={{
        body: { 
          maxHeight: '70vh', 
          overflowY: 'auto',
          padding: '16px'
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '100%' }}
      >
        <Row gutter={[12, 12]}>
          {/* Basic Information */}
          <Col xs={24} lg={12}>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fafafa', 
              borderRadius: '6px',
              border: '1px solid #e8e8e8',
              marginBottom: '8px'
            }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#1890ff' }}>
                <Space>
                  <InfoCircleOutlined />
                  <span>Thông tin cơ bản</span>
                </Space>
              </Title>
              
              <Form.Item
                name="name"
                label="Tên tập phim"
                rules={[{ required: true, message: 'Vui lòng nhập tên tập phim!' }]}
              >
                <Input placeholder="Nhập tên tập phim" />
              </Form.Item>
              
              <Form.Item
                name="view"
                label="Lượt xem"
              >
                <Input placeholder="Nhập số lượt xem" type="number" />
              </Form.Item>
              
              <Form.Item
                name="seri"
                label="Số tập"
                rules={[{ required: true, message: 'Vui lòng nhập số tập!' }]}
              >
                <Input placeholder="Nhập số tập" />
              </Form.Item>
            </div>
          </Col>

          {/* Copyright Information */}
          <Col xs={24} lg={12}>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fafafa', 
              borderRadius: '6px',
              border: '1px solid #e8e8e8',
              marginBottom: '8px'
            }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#1890ff' }}>
                <Space style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LinkOutlined />
                  <span>Thông tin bản quyền</span>
                </Space>
              </Title>
              
              <Form.Item
                name="copyright"
                label="Bản quyền"
              >
                <Input placeholder="Nhập thông tin bản quyền" />
              </Form.Item>
              
              <Form.Item
                name="LinkCopyright"
                label="Link bản quyền"
              >
                <Input placeholder="Nhập link bản quyền" />
              </Form.Item>
            </div>
          </Col>

          {/* Media Links */}
          <Col xs={24} lg={12}>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fafafa', 
              borderRadius: '6px',
              border: '1px solid #e8e8e8',
              marginBottom: '8px'
            }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#1890ff' }}>
                <Space>
                  <LinkOutlined />
                  <span>Liên kết media</span>
                </Space>
              </Title>
              
              <Form.Item
                name="dailyMotionServer"
                label="DailyMotion Server"
              >
                <Input placeholder="Nhập DailyMotion server" />
              </Form.Item>
              
              <Form.Item
                name="trailer"
                label="Video trailer"
              >
                <Input placeholder="Nhập link video trailer" />
              </Form.Item>
              
              <Form.Item
                name="video2"
                label="Link video"
              >
                <Input placeholder="Nhập link video chính" />
              </Form.Item>
              
              <Form.Item
                name="imageLink"
                label="Link hình ảnh"
              >
                <Input placeholder="Nhập link hình ảnh" />
              </Form.Item>
            </div>
          </Col>

          {/* Categories & Upload */}
          <Col xs={24} lg={12}>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#fafafa', 
              borderRadius: '6px',
              border: '1px solid #e8e8e8',
              marginBottom: '8px'
            }}>
              <Title level={5} style={{ marginBottom: '12px', color: '#1890ff' }}>
                <Space>
                  <PictureOutlined />
                  <span>Danh mục & Upload</span>
                </Space>
              </Title>
              
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
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Submit Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '12px',
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
