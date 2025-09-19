import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  message,
  Image,
  Tag
} from "antd";
import { 
  SaveOutlined, 
  UploadOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  EditOutlined,
  EyeOutlined
} from "@ant-design/icons";
import {
  editProduct,
  getProduct,
} from "../../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { UploadAssby } from "../../../../sevices/product";
import MVLink from "../../../../components/Location/Link";
import { ApiContext } from "../../../../context/api";
import { handleImage } from "../../../../lib/handleImage";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import PageTitle from "../../../../components/PageTitle";

const { Title, Text } = Typography;

const EditProduct = () => {
  const { seri }: any = useContext(ApiContext) || {};
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { data }: any = useAppSelector((state) => state.category.category);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [uploadForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});

  useEffect(() => {
    const getFormProduct = async () => {
      try {
        const { payload }: any = await dispatch(getProduct(id));
        form.setFieldsValue({
          ...payload,
          category: payload.category?._id,
        });
        setState(payload);
      } catch (error) {
        toast.error("Không thể tải thông tin sản phẩm");
      }
    };
    getFormProduct();
  }, [id, form, dispatch]);

  useEffect(() => {
    dispatch(getAllcate({ page: 0 }));
  }, [dispatch]);

  const categoryOptions = data ? [...data].sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).map((item: any) => ({
    label: item.name,
    value: item._id,
  })) : [];

  const typeOptions = seri?.map((item: any) => ({
    label: item.name,
    value: item._id,
  })) || [];

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", values.name || "");
      formdata.append("slug", values.slug || "");
      formdata.append("category", values.category || "");
      formdata.append("_id", state._id || "");
      formdata.append("seri", values.seri || "");
      formdata.append("LinkCopyright", values.LinkCopyright || "");
      formdata.append("copyright", values.copyright || "");
      formdata.append("trailer", values.trailer || "");
      formdata.append("image", values.image || "");
      formdata.append("typeId", values.typeId || "");
      formdata.append("categorymain", values.categorymain || "");
      formdata.append("dailyMotionServer", values.dailyMotionServer || "");
      formdata.append("link", values.link || "");
      formdata.append("imageLink", values.imageLink || "");
      formdata.append("view", values.view || "");
      formdata.append("server2", values.server2 || "");

      const res = await dispatch(editProduct(formdata));
      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success(`Cập nhật ${values.name} thành công`);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitServerAssb = async (values: any) => {
    setUploadLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("fileupload", values.fileupload);
      const res = await UploadAssby(id, formdata);
      if (res) {
        toast.success("Upload video thành công");
        uploadForm.resetFields();
      } else {
        toast.error("Upload video thất bại");
      }
    } catch (error) {
      toast.error("Upload video thất bại");
    } finally {
      setUploadLoading(false);
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

  const videoUploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: (file: any) => {
      uploadForm.setFieldsValue({ fileupload: file });
      return false;
    },
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <PageTitle
          title={`Chỉnh sửa tập phim: ${state?.name} tập ${state?.seri}`}
          subtitle="Cập nhật thông tin chi tiết cho tập phim"
        />

        <Card style={{ marginTop: '24px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            border: '1px solid #e8e8e8'
          }}>
            <div>
              <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                <MVLink to={`/d/${state?.slug}`}>
                  <Space>
                    <EyeOutlined />
                    <span>{state?.name} tập {state?.seri}</span>
                  </Space>
                </MVLink>
              </Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                ID: {state?._id}
              </Text>
            </div>
            <div style={{ width: '120px', height: '120px' }}>
              <Image
                src={handleImage(200, state?.category?.linkImg)}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '2px solid #e8e8e8'
                }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
              />
            </div>
          </div>

          {/* Main Edit Form */}
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
                    name="slug"
                    label="Slug"
                    rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
                  >
                    <Input placeholder="Nhập slug" />
                  </Form.Item>
                  
                  <Form.Item
                    name="seri"
                    label="Số tập"
                    rules={[{ required: true, message: 'Vui lòng nhập số tập!' }]}
                  >
                    <Input placeholder="Nhập số tập" />
                  </Form.Item>
                  
                  <Form.Item
                    name="view"
                    label="Lượt xem"
                  >
                    <Input placeholder="Nhập số lượt xem" type="number" />
                  </Form.Item>
                </Card>
              </Col>

              {/* Media Links */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <VideoCameraOutlined style={{ color: '#1890ff' }} />
                      <span>Liên kết media</span>
                    </Space>
                  }
                  size="small"
                  style={{ height: '100%' }}
                >
                  <Form.Item
                    name="link"
                    label="URL Video chính"
                  >
                    <Input placeholder="Nhập URL video chính" />
                  </Form.Item>
                  
                  <Form.Item
                    name="dailyMotionServer"
                    label="DailyMotion Server"
                  >
                    <Input placeholder="Nhập DailyMotion server" />
                  </Form.Item>
                  
                  <Form.Item
                    name="server2"
                    label="Assb Server"
                  >
                    <Input placeholder="Nhập Assb server" />
                  </Form.Item>
                  
                  <Form.Item
                    name="trailer"
                    label="Video trailer"
                  >
                    <Input placeholder="Nhập link video trailer" />
                  </Form.Item>
                </Card>
              </Col>

              {/* Categories & Image */}
              <Col xs={24} lg={12}>
                <Card 
                  title={
                    <Space>
                      <PictureOutlined style={{ color: '#1890ff' }} />
                      <span>Danh mục & Hình ảnh</span>
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
                    label="Thể loại phim lẻ"
                  >
                    <Select
                      placeholder="Chọn thể loại"
                      options={typeOptions}
                      showSearch
                      optionFilterProp="label"
                    />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    label="Upload hình ảnh mới"
                  >
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>
                        Chọn file hình ảnh
                      </Button>
                    </Upload>
                  </Form.Item>
                  
                  <Form.Item
                    name="imageLink"
                    label="Link hình ảnh"
                  >
                    <Input placeholder="Nhập link hình ảnh" />
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
                    name="LinkCopyright"
                    label="Link bản quyền"
                  >
                    <Input placeholder="Nhập link bản quyền" />
                  </Form.Item>
                  
                  <Form.Item
                    name="copyright"
                    label="Thông tin bản quyền"
                  >
                    <Input placeholder="Nhập thông tin bản quyền" />
                  </Form.Item>
                </Card>
              </Col>
            </Row>

            <Divider />

            {/* Submit Actions */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              paddingTop: '16px'
            }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={<SaveOutlined />}
                size="middle"
              >
                Cập nhật tập phim
              </Button>
            </div>
          </Form>

          {/* Video Upload Section */}
          <Divider orientation="center" style={{ margin: '32px 0' }}>
            <Space>
              <VideoCameraOutlined style={{ color: '#52c41a' }} />
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Abyss Server - Upload Video</span>
            </Space>
          </Divider>

          <Card 
            title={
              <Space>
                <UploadOutlined style={{ color: '#52c41a' }} />
                <span>Upload video mới</span>
              </Space>
            }
            style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}
          >
            <Form
              form={uploadForm}
              layout="vertical"
              onFinish={handleSubmitServerAssb}
            >
              <Form.Item
                name="fileupload"
                label="Chọn file video"
                rules={[{ required: true, message: 'Vui lòng chọn file video!' }]}
              >
                <Upload {...videoUploadProps}>
                  <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                    Chọn file video để upload
                  </Button>
                </Upload>
              </Form.Item>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                marginTop: '16px'
              }}>
                <Button 
                  type="primary"
                  htmlType="submit"
                  loading={uploadLoading}
                  icon={<UploadOutlined />}
                  size="middle"
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                >
                  Upload Video
                </Button>
              </div>
            </Form>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
