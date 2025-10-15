import React, { useContext, useEffect, useState } from "react";
import { 
  Modal,
  Form, 
  Input, 
  Select, 
  Button, 
  Row, 
  Col, 
  Divider,
  Spin,
  Switch,
  Alert,
  Space,
  Typography
} from "antd";
import { 
  SaveOutlined,
  EditOutlined,
  BellOutlined
} from "@ant-design/icons";

const { Text, Title } = Typography;
import {
  editProduct,
  getProduct,
} from "../../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { ApiContext } from "../../../../context/api";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  version?: string;
  onSuccess?: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ 
  open, 
  onClose, 
  productId, 
  onSuccess 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { data }: any = useAppSelector((state) => state.category.category);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sendNotification, setSendNotification] = useState(false);

  useEffect(() => {
    if (open && productId) {
      const getFormProduct = async () => {
        setInitialLoading(true);
        try {
          const { payload }: any = await dispatch(getProduct(productId));
          
          if (payload) {
            const formData = {
              name: payload.name || '',
              slug: payload.slug || '',
              seri: payload.seri || '',
              view: payload.view || 0,
              link: payload.link || '',
              dailyMotionServer: payload.dailyMotionServer || '',
              server2: payload.server2 || '',
              trailer: payload.trailer || '',
              category: payload.category?._id || '',
              typeId: payload.typeId || '',
              imageLink: payload.imageLink || '',
              LinkCopyright: payload.LinkCopyright || '',
              copyright: payload.copyright || '',
              categorymain: payload.categorymain || ''
            };
            
            form.setFieldsValue(formData);
            setState(payload);
          }
        } catch (error) {
          console.error("Error loading product:", error);
          toast.error("Không thể tải thông tin sản phẩm");
        } finally {
          setInitialLoading(false);
        }
      };
      getFormProduct();
    }
  }, [open, productId, form, dispatch]);

  // Đảm bảo form được populate khi state thay đổi
  useEffect(() => {
    if (state && Object.keys(state).length > 0) {
      const formData = {
        name: state.name || '',
        slug: state.slug || '',
        seri: state.seri || '',
        view: state.view || 0,
        link: state.link || '',
        dailyMotionServer: state.dailyMotionServer || '',
        server2: state.server2 || '',
        trailer: state.trailer || '',
        category: state.category?._id || '',
        typeId: state.typeId || '',
        imageLink: state.imageLink || '',
        LinkCopyright: state.LinkCopyright || '',
        copyright: state.copyright || '',
        categorymain: state.categorymain || ''
      };
      
      form.setFieldsValue(formData);
    }
  }, [state, form]);

  const categoryOptions = data ? [...data].sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).map((item: any) => ({
    label: item.name,
    value: item._id,
  })) : [];


  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("slug", values.slug);
      formdata.append("category", values.category);
      formdata.append("_id", state._id);
      formdata.append("seri", values.seri);
      formdata.append("LinkCopyright", values.LinkCopyright);
      formdata.append("copyright", values.copyright);
      formdata.append("trailer", values.trailer);
      formdata.append("image", values.image);
      formdata.append("typeId", values.typeId);
      formdata.append("categorymain", values.categorymain);
      formdata.append("dailyMotionServer", values.dailyMotionServer);
      formdata.append("link", values.link);
      formdata.append("imageLink", values.imageLink);
      formdata.append("view", values.view || 0);
      formdata.append("server2", values.server2);
      
      // Thêm flag gửi push notification
      formdata.append("sendPushNotification", sendNotification ? "true" : "false");

      const res = await dispatch(editProduct(formdata));
      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success(`Cập nhật ${values.name} thành công`);
        if (sendNotification) {
          toast.info("🔔 Push notification đã được gửi đến users!");
        }
        // Reset notification toggle
        setSendNotification(false);
        onSuccess?.();
        onClose();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };


  const handleClose = () => {
    form.resetFields();
    setState({});
    setSendNotification(false);
    setInitialLoading(true);
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOutlined style={{ color: '#1890ff' }} />
          <span>Chỉnh sửa tập phim</span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={1000}
      footer={null}
      destroyOnClose
      centered
      className="admin-modal"
      bodyStyle={{ 
        maxHeight: '80vh', 
        overflowY: 'auto',
        padding: '24px'
      }}
    >
      {initialLoading ? (
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px'
        }}>
          <Spin size="default" />
        </div>
      ) : (
        <>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="admin-form"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Tên tập phim"
                  rules={[{ required: true, message: 'Vui lòng nhập tên tập phim!' }]}
                >
                  <Input placeholder="Nhập tên tập phim" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="slug"
                  label="Slug"
                  rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
                >
                  <Input placeholder="Nhập slug" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="seri"
                  label="Số tập"
                  rules={[{ required: true, message: 'Vui lòng nhập số tập!' }]}
                >
                  <Input placeholder="Nhập số tập" className="admin-input" />
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
                    className="admin-select"
                  />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="view"
                  label="Lượt xem"
                >
                  <Input placeholder="Nhập số lượt xem" type="number" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="link"
                  label="URL Video chính"
                >
                  <Input placeholder="Nhập URL video chính" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="dailyMotionServer"
                  label="DailyMotion Server"
                >
                  <Input placeholder="Nhập DailyMotion server" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="server2"
                  label="Assb Server"
                >
                  <Input placeholder="Nhập Assb server" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="trailer"
                  label="Video trailer"
                >
                  <Input placeholder="Nhập link video trailer" className="admin-input" />
                </Form.Item>
              </Col>
              
              <Col span={24}>
                <Form.Item
                  name="imageLink"
                  label="Link hình ảnh"
                >
                  <Input placeholder="Nhập link hình ảnh" className="admin-input" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            {/* Push Notification Section */}
            <div
              style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: sendNotification ? '#e6f7ff' : '#fafafa',
                border: sendNotification ? '2px solid #1890ff' : '1px solid #e8e8e8',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <BellOutlined style={{ fontSize: '18px', color: sendNotification ? '#1890ff' : '#8c8c8c' }} />
                    <div>
                      <Text strong style={{ fontSize: '14px' }}>
                        Gửi Push Notification
                      </Text>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Thông báo đến mobile app khi cập nhật
                        </Text>
                      </div>
                    </div>
                  </Space>
                  <Switch
                    checked={sendNotification}
                    onChange={(checked) => setSendNotification(checked)}
                    checkedChildren="BẬT"
                    unCheckedChildren="TẮT"
                  />
                </div>
                
                {sendNotification && (
                  <Alert
                    message="Notification sẽ được gửi"
                    description={
                      <div style={{ fontSize: '12px' }}>
                        <div><strong>Title:</strong> Tập {form.getFieldValue('seri')} mới đã ra! 🎬</div>
                        <div><strong>Body:</strong> {state?.category?.name} - Tập {form.getFieldValue('seri')} vừa được cập nhật</div>
                        <div><strong>Gửi đến:</strong> Tất cả thiết bị active</div>
                      </div>
                    }
                    type="info"
                    showIcon
                    icon={<BellOutlined />}
                    style={{ fontSize: '12px' }}
                  />
                )}
              </Space>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              paddingTop: '16px'
            }}>
              <Button onClick={handleClose} className="admin-btn admin-btn-secondary">
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                icon={sendNotification ? <BellOutlined /> : <SaveOutlined />}
                className="admin-btn admin-btn-primary"
                style={{
                  background: sendNotification 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : undefined,
                  borderColor: sendNotification ? '#667eea' : undefined,
                }}
              >
                {sendNotification ? '🔔 Cập nhật & Gửi Thông Báo' : 'Cập nhật'}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default EditProductModal;
