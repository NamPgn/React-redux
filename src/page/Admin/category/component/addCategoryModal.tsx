import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Upload,
  Select,
  DatePicker,
  Space,
  Card,
  Image,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { addCateGorySlice } from "../../../../redux/slice/category/thunk/category";
import { useAppDispatch } from "../../../../hook";
import { toast } from "react-toastify";
import { useTags } from "../../../../hook/useTags";
import {
  CATEGORY_STATUS,
  LANGUAGE_OPTIONS,
  QUALITY_OPTIONS,
  UPCOMING_RELEASES,
  RELEASES,
  ISMOVIE,
  CATEGORY_VALIDATION_RULES,
  CATEGORY_ERROR_MESSAGES,
  CATEGORY_SUCCESS_MESSAGES,
} from "../../../../constants/category";

const { Text } = Typography;

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  weeks?: any[];
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  onSuccess,
  weeks = []
}) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>('');
  const dispatch = useAppDispatch();
  
  const { data: tags = [] }: any = useTags();
  const tagsOptions = tags?.data?.map((tag: any) => ({
    label: tag.name,
    value: tag._id,
  }));

  const weekOptions = weeks?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));

  const upcomingReleasesOptions = RELEASES?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));

  const isMovieOptions = ISMOVIE?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));

  const onFinish = async (values: any) => {
    const formdata = new FormData();
    formdata.append("name", values.name || "");
    formdata.append("slug", values.slug || "");
    formdata.append("des", values.des || "");
    formdata.append("type", values.type);
    formdata.append("file", values.file);
    formdata.append("up", values.up || "");
    formdata.append("time", values.time || "");
    formdata.append("status", values.status || CATEGORY_STATUS.PENDING);
    formdata.append("year", values.year);
    formdata.append("anotherName", values.anotherName);
    formdata.append("sumSeri", values.sumSeri || "");
    formdata.append("hour", values.hour);
    formdata.append("lang", values.lang || LANGUAGE_OPTIONS.VIETSUB);
    formdata.append("season", values.season || "");
    formdata.append("quality", values.quality || QUALITY_OPTIONS.HD);
    formdata.append("episode_many_title", values.episode_many_title);
    formdata.append("upcomingReleases", values.upcomingReleases || "");
    formdata.append("isMovie", values.isMovie || "");
    formdata.append("newMovie", values.newMovie || false);

    if (values.tags) {
      values.tags.forEach((tag: any) => {
        formdata.append("tags[]", tag);
      });
    }
    if (values.week) {
      values.week.forEach((week: any) => {
        formdata.append("week[]", week);
      });
    }

    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success === true) {
      toast.success(CATEGORY_SUCCESS_MESSAGES.CREATED);
      handleClose();
      onSuccess?.();
    } else {
      toast.error(CATEGORY_ERROR_MESSAGES.CREATE_FAILED);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setPreviewImage('');
    onClose();
  };

  return (
    <Modal
      title={
        <Space>
          <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Create New Category</span>
        </Space>
      }
      open={open}
      footer={null}
      onCancel={handleClose}
      width={900}
      centered
      className="admin-modal"
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
        padding: '12px'
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
          {/* Basic Information */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <InfoCircleOutlined style={{ color: '#1890ff' }} />
                  <span>Basic Information</span>
                </Space>
              }
              size="small"
              className="admin-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[
                      { required: true, message: CATEGORY_VALIDATION_RULES.NAME.required },
                      CATEGORY_VALIDATION_RULES.NAME.minLength,
                      CATEGORY_VALIDATION_RULES.NAME.maxLength,
                    ]}
                  >
                    <Input placeholder="Enter category name" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="anotherName"
                    label="Alternative Name"
                  >
                    <Input placeholder="Enter alternative name" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="des"
                    label="Category Description"
                  >
                    <Input.TextArea 
                      placeholder="Enter category description" 
                      rows={3} 
                      maxLength={CATEGORY_VALIDATION_RULES.DESCRIPTION.maxLength.value}
                      showCount
                      className="admin-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="episode_many_title"
                    label="Episode Many Title"
                  >
                    <Input placeholder="Enter episode many title" className="admin-input" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Time & Duration */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <SettingOutlined style={{ color: '#1890ff' }} />
                  <span>Time & Duration</span>
                </Space>
              }
              size="small"
              className="admin-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="time"
                    label="Duration"
                  >
                    <Input placeholder="Enter duration" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="year"
                    label="Year"
                  >
                    <Input placeholder="Enter year" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="hour"
                    label="Hour"
                  >
                    <Input placeholder="Enter hour" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="sumSeri"
                    label="Total Episodes"
                  >
                    <Input placeholder="Enter total episodes" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="up"
                    label="Setup"
                  >
                    <Input placeholder="Enter setup" className="admin-input" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="releaseDate"
                    label="Release Date"
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="Select release date"
                      className="admin-input"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Settings & Status */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <TagsOutlined style={{ color: '#1890ff' }} />
                  <span>Settings & Status</span>
                </Space>
              }
              size="small"
              className="admin-card"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="status"
                    label="Status"
                  >
                    <Select placeholder="Select status" className="admin-select">
                      <Select.Option value={CATEGORY_STATUS.COMPLETED}>✅ Hoàn thành</Select.Option>
                      <Select.Option value={CATEGORY_STATUS.PENDING}>⏳ Đang chờ</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="week"
                    label="Week"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select week"
                      options={weekOptions}
                      className="admin-select"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="upcomingReleases"
                    label="Upcoming Releases"
                  >
                    <Select
                      placeholder="Select release"
                      options={upcomingReleasesOptions}
                      className="admin-select"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="isMovie"
                    label="Movie Type"
                  >
                    <Select
                      placeholder="Select movie type"
                      options={isMovieOptions}
                      className="admin-select"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="newMovie"
                    label="New Movie"
                  >
                    <Select placeholder="Is new movie?" className="admin-select">
                      <Select.Option value={true}>✅ Có</Select.Option>
                      <Select.Option value={false}>❌ Không</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name="tags"
                    label="Tags"
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select tags"
                      options={tagsOptions}
                      className="admin-select"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* File Upload */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <UploadOutlined style={{ color: '#1890ff' }} />
                  <span>Upload Image</span>
                </Space>
              }
              size="small"
              className="admin-card"
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={6}>
                  <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Form.Item
                      name="file"
                      label="Select Image"
                    >
                      <Upload
                        name="file"
                        multiple={false}
                        showUploadList={false}
                        beforeUpload={(file) => {
                          // Create preview URL
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setPreviewImage(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                          return false;
                        }}
                      >
                        <Button icon={<UploadOutlined />} className="admin-btn admin-btn-secondary">
                          {previewImage ? 'Change Image' : 'Select Image File'}
                        </Button>
                      </Upload>
                      {previewImage && (
                        <div style={{ marginTop: '8px' }}>
                          <Button
                            type="link"
                            danger
                            size="small"
                            onClick={() => setPreviewImage('')}
                            className="admin-btn admin-btn-text"
                          >
                            Remove Preview
                          </Button>
                        </div>
                      )}
                    </Form.Item>
                  </Space>
                </Col>
                <Col xs={24} lg={6}>
                  {previewImage && (
                    <div style={{
                      border: '2px dashed #d9d9d9',
                      borderRadius: '8px',
                      padding: '16px',
                      textAlign: 'center',
                      backgroundColor: '#fafafa'
                    }}>
                      <Image
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                        src={previewImage || ''}
                        alt="Category Preview"
                        preview={false}
                      />
                      {previewImage && (
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Image Preview
                          </Text>
                        </div>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Submit Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '16px'
        }}>
          <Button onClick={handleClose} className="admin-btn admin-btn-secondary">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            size="middle"
            className="admin-btn admin-btn-primary"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          >
            Create Category
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
