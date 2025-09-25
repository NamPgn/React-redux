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
  Image,
  DatePicker,
  TreeSelect,
  message
} from "antd";
import {
  getCateSlice,
  updateCatgorySlice,
} from "../../../../redux/slice/category/thunk/category";
import { toast } from "react-toastify";
import { getCategory } from "../../../../sevices/category";
import { useAppDispatch } from "../../../../hook";
import { ApiContext } from "../../../../context/api";
import { handleImage } from "../../../../lib/handleImage";
import { ISMOVIE, RELEASES } from "../../../../constant/categoyy";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { useTags } from "../../../../hook/useTags";
import {
  SaveOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  PictureOutlined,
  TagsOutlined,
  CalendarOutlined,
  EditOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { SHOW_PARENT } = TreeSelect;
const EditCategory = () => {
  const dispatch = useAppDispatch();
  const [selectCategory, setSelectCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { weeks } = useContext(ApiContext);
  const [state, setState]: any = useState({});
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>('');
  const { id } = useParams();
  const {
    data: tags = [],
  }: any = useTags();

  const tagsOptions = tags?.data?.map((tag: any) => ({
    label: tag.name,
    value: tag._id,
  })) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getCateSlice(id));
        const { data }: any = await getCategory(id);
        form.setFieldsValue({
          ...data,
          week: data.week?.map((week: any) => week._id) || [],
          tags: data.tags?.map((tag: any) => tag._id) || []
        });
        setState(data);
      } catch (error) {
        toast.error("Unable to load category information");
      }
    };
    fetchData();
  }, [id, form, dispatch]);

  const { data: categorySelect } = useSWRWithAxios(
    urlSwr + "/bigcategory/content"
  );

  const weeekOptions = weeks?.map((item: any) => ({
    label: item.name,
    value: item._id,
  })) || [];

  const UpcomingReleasesOptions = RELEASES?.map((item: any) => ({
    label: item.name,
    value: item.val,
  })) || [];

  const treeDataCateogys = categorySelect && categorySelect?.map((item: any) => ({
    title: item.name,
    value: item._id,
    key: item._id,
  })) || [];

  const isMovieOptions = ISMOVIE?.map((item: any) => ({
    label: item.name,
    value: item.val,
  })) || [];

  const onChangeTreeCategory = (newValue: string[]) => {
    setSelectCategory(newValue);
  };

  const tProps = {
    treeData: treeDataCateogys,
    selectCategory,
    onChangeTreeCategory,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Select category",
    style: {
      width: "100%",
    },
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("_id", state._id);
      formdata.append("name", values.name || "");
      formdata.append("slug", values.slug);
      formdata.append("des", values.des || "");
      formdata.append("type", values.type || "");
      formdata.append("file", values.file || "");
      formdata.append("up", values.up);
      formdata.append("time", values.time || "");
      formdata.append("status", values.status);
      formdata.append("year", values.year);
      formdata.append("anotherName", values.anotherName);
      formdata.append("sumSeri", values.sumSeri);
      formdata.append("hour", values.hour || "");
      formdata.append("lang", values.lang || "Vietsub");
      formdata.append("season", values.season);
      formdata.append("quality", values.quality || "HD");
      formdata.append("episode_many_title", values.episode_many_title);
      formdata.append("upcomingReleases", values.upcomingReleases);
      formdata.append("isMovie", values.isMovie);
      formdata.append("thuyetMinh", values.thuyetMinh );
      formdata.append("newMovie", values.newMovie || false);

      if (values.tags && Array.isArray(values.tags)) {
        values.tags.forEach((tag: any) => {
          formdata.append("tags[]", tag);
        });
      }
      if (values.week && Array.isArray(values.week)) {
        values.week.forEach((week: any) => {
          formdata.append("week[]", week);
        });
      }

      const res = await dispatch(updateCatgorySlice(formdata));
      if (res.payload) {
        toast.success("Category updated successfully");
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: (file: any) => {
      form.setFieldsValue({ file: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      return false;
    },
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          >
            <Row gutter={[24, 24]}>
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
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[{ required: true, message: 'Please enter category name!' }]}
                      >
                        <Input placeholder="Enter category name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="anotherName"
                        label="Alternative Name"
                      >
                        <Input placeholder="Enter alternative name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[{ required: true, message: 'Please enter slug!' }]}
                      >
                        <Input placeholder="Enter slug" />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="des"
                        label="Category Description"
                      >
                        <Input.TextArea placeholder="Enter category description" rows={3} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Media & Technical Details */}
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <SettingOutlined style={{ color: '#1890ff' }} />
                      <span>Media & Technical Details</span>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="time"
                        label="Duration"
                      >
                        <Input placeholder="Enter duration" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="year"
                        label="Year"
                      >
                        <Input placeholder="Enter year" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="type"
                        label="Type"
                      >
                        <Input placeholder="Enter type" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="up"
                        label="Setup"
                      >
                        <Input placeholder="Enter setup" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="sumSeri"
                        label="Total Episodes"
                      >
                        <Input placeholder="Enter total episodes" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="hour"
                        label="Hour"
                      >
                        <Input placeholder="Enter hour" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="season"
                        label="Season"
                      >
                        <Input placeholder="Enter season" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="episode_many_title"
                        label="Episode Many Title"
                      >
                        <Input placeholder="Enter episode many title" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Image Section */}
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <PictureOutlined style={{ color: '#1890ff' }} />
                      <span>Image & Media</span>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} lg={4}>
                      <div style={{
                        border: '2px dashed #d9d9d9',
                        borderRadius: '8px',
                        padding: '16px',
                        textAlign: 'center',
                        backgroundColor: '#fafafa'
                      }}>
                        <Image
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                          src={previewImage || handleImage(200, state?.linkImg)}
                          alt={state?.name}
                          preview={true}
                          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
                        />
                        {previewImage && (
                          <div style={{ marginTop: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              New Image Preview
                            </Text>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} lg={20}>
                      <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Form.Item
                          name="linkImg"
                          label="Image Link"
                        >
                          <Input placeholder="Enter image link" />
                        </Form.Item>
                        <Form.Item
                          name="file"
                          label="Upload New Image"
                        >
                          <Upload {...uploadProps} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>
                              {previewImage ? 'Change Image' : 'Select Image File'}
                            </Button>
                          </Upload>
                          {previewImage && (
                            <div style={{ marginTop: '8px' }}>
                              <Button
                                type="link"
                                danger
                                size="small"
                                onClick={() => {
                                  setPreviewImage('');
                                  form.setFieldsValue({ file: undefined });
                                }}
                              >
                                Remove Preview
                              </Button>
                            </div>
                          )}
                        </Form.Item>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Quality & Language Settings */}
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <TagsOutlined style={{ color: '#1890ff' }} />
                      <span>Quality & Language</span>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="lang"
                        label="Language"
                      >
                        <Select placeholder="Select language">
                          <Select.Option value="Vietsub">Vietsub</Select.Option>
                          <Select.Option value="ThuyetMinh">Thuyết Minh</Select.Option>
                          <Select.Option value="ThuyetMinh-Vietsub">Thuyết Minh + Vietsub</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="quality"
                        label="Quality"
                      >
                        <Select placeholder="Select quality">
                          <Select.Option value="HD">HD</Select.Option>
                          <Select.Option value="FHD">FHD</Select.Option>
                          <Select.Option value="4K">4K</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="thuyetMinh"
                        label="Dubbing"
                      >
                        <Select placeholder="Has dubbing?">
                          <Select.Option value={true}>Yes</Select.Option>
                          <Select.Option value={false}>No</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="isMovie"
                        label="Movie Type"
                      >
                        <Select
                          placeholder="Select type"
                          options={isMovieOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Status & Release Settings */}
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <CalendarOutlined style={{ color: '#1890ff' }} />
                      <span>Status & Release</span>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="status"
                        label="Status"
                      >
                        <Select placeholder="Select status">
                          <Select.Option value="completed">Completed</Select.Option>
                          <Select.Option value="pending">Pending</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="week"
                        label="Week"
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select week"
                          options={weeekOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="upcomingReleases"
                        label="Upcoming Releases"
                      >
                        <Select
                          placeholder="Select release"
                          options={UpcomingReleasesOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="newMovie"
                        label="New Movie"
                      >
                        <Select placeholder="Is new movie?">
                          <Select.Option value={true}>Yes</Select.Option>
                          <Select.Option value={false}>No</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        name="tags"
                        label="Tags"
                      >
                        <Select
                          mode="multiple"
                          placeholder="Select tags"
                          options={tagsOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Date & Category Selection */}
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <EditOutlined style={{ color: '#1890ff' }} />
                      <span>Date & Category</span>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="releaseDate"
                        label="Select Date"
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          placeholder="Select release date"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="categoryType"
                        label="Category Type"
                      >
                        <TreeSelect {...tProps} />
                      </Form.Item>
                    </Col>
                  </Row>
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
                loading={loading}
                icon={<SaveOutlined />}
                size="middle"
              >
                Save Category Information
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EditCategory;
