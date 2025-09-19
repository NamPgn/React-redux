import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Upload, 
  Button, 
  Space, 
  Row, 
  Col, 
  Typography,
  Divider,
  message
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
import MVLink from "../../../../components/Location/Link";
import { ApiContext } from "../../../../context/api";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import PageTitle from "../../../../components/PageTitle";

const { Title, Text } = Typography;
const { TextArea } = Input;

const ProductAdd = () => {
  const { seri }: any = useContext(ApiContext);
  const { data }: any = useAppSelector((state) => state.category.category);
  const [idProduct, setIdProduct] = useState("");
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
      setIdProduct(res?.payload?.data?._id);
      if (res.payload.success === true) {
        toast.success("Thêm sản phẩm thành công");
      } else {
        toast.error("Thêm sản phẩm thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
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
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <PageTitle 
          title="Tạo tập phim mới" 
          subtitle="Nhập thông tin chi tiết cho tập phim" 
        />
        
        <Card style={{ marginTop: '24px' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          >
            <Row gutter={[24, 24]}>
              {/* Basic Information */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                      <span>Thông tin cơ bản</span>
                    </Space>
                  }
                  size="small"
                  style={{ height: '100%' }}
                >
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
                </Card>
              </Col>

              {/* Copyright Information */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <LinkOutlined style={{ color: '#1890ff' }} />
                      <span>Thông tin bản quyền</span>
                    </Space>
                  }
                  size="small"
                  style={{ height: '100%' }}
                >
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
                </Card>
              </Col>

              {/* Media Links */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <LinkOutlined style={{ color: '#1890ff' }} />
                      <span>Liên kết media</span>
                    </Space>
                  }
                  size="small"
                  style={{ height: '100%' }}
                >
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
                </Card>
              </Col>

              {/* Categories & Upload */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <PictureOutlined style={{ color: '#1890ff' }} />
                      <span>Danh mục & Upload</span>
                    </Space>
                  }
                  size="small"
                  style={{ height: '100%' }}
                >
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
                </Card>
              </Col>
            </Row>

            <Divider />

            {/* Submit Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '16px'
            }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                size="middle"
              >
                Tạo tập phim
              </Button>
              
              {idProduct && (
                <MVLink to={`/dashboard/product/edit/${idProduct}`}>
                  <Button 
                    type="text" 
                    danger 
                    icon={<EditOutlined />}
                    size="middle"
                  >
                    Chỉnh sửa
                  </Button>
                </MVLink>
              )}
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProductAdd;
