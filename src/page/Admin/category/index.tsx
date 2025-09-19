import React, { useContext, useEffect, useState } from "react";
import {
  DatePicker,
  Image,
  Input,
  Modal,
  Tabs,
  Dropdown,
  Space,
  Switch,
  Card,
  Form,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Upload,
  Select,
  Tag,
  TreeSelect,
  message
} from "antd";
import { debounce } from "lodash";
import {
  addCateGorySlice,
  changeIsActiveCategorySlice,
  deleteCategorySlice,
  getAllcate,
} from "../../../redux/slice/category/thunk/category";
import { category$ } from "../../../redux/selectors";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { pushCateTotype } from "../../../sevices/type";
import { Controller, useForm } from "react-hook-form";
import { MySelectWrapper } from "../../../components/Form/component/select";
import { MyButton } from "../../../components/MV/Button";
import { columnsCategory } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import MVUpload from "../../../components/MV/Upload";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
import { MVError, MVSuccess } from "../../../components/Message";
import MVTags from "../../../components/MV/Tag";
import { ApiContext } from "../../../context/api";
import { ISMOVIE, RELEASES } from "../../../constant/categoyy";
import dayjs from "dayjs";
import RecycleBin from "./component/RecycleBin";
import {
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  SearchOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  TagsOutlined
} from "@ant-design/icons";
import { useTags } from "../../../hook/useTags";

const { Title, Text } = Typography;
const { Search } = Input;

const CategoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage]: any = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPreviewImage(''); // Clear preview when closing modal
  };
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(ApiContext);
  const { handleSubmit, control } = useForm();
  const [valueId, setValue] = useState();
  const [previewImage, setPreviewImage] = useState<string>('');
  const {
    data: tags = [],
  }: any = useTags();
  const tagsOptions = tags?.data?.map((tag: any) => ({
    label: tag.name,
    value: tag._id,
  }));
  useEffect(() => {
    dispatch(getAllcate({ page, search: searchTerm }));
  }, [page, searchTerm]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setSearchTerm(searchValue);
      setPage(1);
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue]);

  const UpcomingReleasesOptions = RELEASES?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchTerm("");
    setPage(1);
  };

  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("slug", data.slug);
    formdata.append("des", data.des);
    formdata.append("type", data.type);
    formdata.append("file", data.file);
    formdata.append("up", data.up);
    formdata.append("time", data.time);
    formdata.append("status", data.status);
    formdata.append("year", data.year);
    formdata.append("anotherName", data.anotherName);
    formdata.append("sumSeri", data.sumSeri);
    formdata.append("hour", data.hour);
    formdata.append("lang", data.lang);
    formdata.append("season", data.season);
    formdata.append("quality", data.quality);
    formdata.append("episode_many_title", data.episode_many_title);
    formdata.append("upcomingReleases", data.upcomingReleases);
    formdata.append("isMovie", data.isMovie);
    formdata.append("newMovie", data.newMovie);
    if (data.tags) {
      data.tags.forEach((tag: any) => {
        formdata.append("tags[]", tag);
      });
    }
    if (data.week) {
      data.week.forEach((week: any) => {
        formdata.append("week[]", week);
      });
    }
    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success == true) {
      toast.success("Thành công");
    } else {
      toast.error("Thất bại");
    }
  };

  const handleDelete = async (id: string | number) => {
    const res = await dispatch(deleteCategorySlice(id));
    if (res.payload) {
      toast.success("Delete Success");
    } else {
      toast.error("Delete Failure");
    }
  };

  const handleChangeIsActive = async (slug: string, isActive: boolean) => {
    const res = await dispatch(changeIsActiveCategorySlice({ slug, isActive }));
    if (res.payload.success) {
      toast.success("Change isActive success");
      dispatch(getAllcate({ page, search: searchTerm }));
    } else {
      toast.error("Change isActive failure");
    }
  };

  const hanedlePushCategoryToType = async (categoryId) => {
    const body = {
      categoryId: categoryId,
    };
    const res = await pushCateTotype(valueId, body);
    if (res.data.success) {
      MVSuccess("Add category success!");
    } else {
      MVError("Failure!");
    }
  };

  const handlePageChangePage = (page: number) => {
    setPage(page);
  };

  const weeekOptions =
    weeks &&
    weeks?.map((item: any, index: number) => ({
      label: item.name,
      value: item._id,
    }));
  const isMovieOptions = ISMOVIE?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));
  const data =
    category.data &&
    category.data.map((item: any) => {
      const actionItems = [
        {
          key: "edit",
          label: (
            <MVLink to={`/dashboard/category/edit/${item.slug}`}>
              <Space>
                <EditOutlined />
                Edit
              </Space>
            </MVLink>
          ),
        },
        {
          key: "delete",
          label: (
            <Space onClick={() => handleDelete(item._id)}>
              <DeleteOutlined />
              Delete
            </Space>
          ),
          danger: true,
        },
        {
          key: "push",
          label: (
            <Space onClick={() => hanedlePushCategoryToType(item._id)}>
              <PushpinOutlined />
              Push
            </Space>
          ),
        },
        {
          key: "combining-episodes",
          label: (
            <MVLink to={`/dashboard/category/combining-episodes/${item._id}`}>
              <Space>
                <PlusOutlined />
                Combining Episodes
              </Space>
            </MVLink>
          ),
        },
      ];
      return {
        key: item._id,
        name: <MVLink to={"/q/" + item._id}>{item.name}</MVLink>,
        slug: item.slug,
        image: (
          <Image
            width={150}
            height={200}
            style={{ objectFit: "cover" }}
            src={item.linkImg}
          />
        ),
        createAt: item.createdAt,
        duration: item.time,

        status:
          item.status === "pending" ? (
            <MVTags color="warning">Pending</MVTags>
          ) : (
            <MVTags color="success">Completed</MVTags>
          ),
        year: item.year,
        set: item.up,
        isActive: (
          <Switch
            className="ant-switch"
            checked={item.isActive}
            onChange={(checked) => handleChangeIsActive(item.slug, checked)}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        ),
        week: item.week?.length > 0 ? item.week.map(w => w.name).join(" | ") : <Space><CheckOutlined style={{ color: '#52c41a' }} /> <Text style={{ color: '#52c41a' }}>Hoàn Thành</Text></Space>,
        action: (
          <div className="flex items-center gap-2">
            <Dropdown
              menu={{ items: actionItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <MyButton type="text">
                <MoreOutlined size={16} />
              </MyButton>
            </Dropdown>
            <MVLink to={`/dashboard/category/edit/${item.slug}`}>
              <Space className="cursor-pointer">
                <EditOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
              </Space>
            </MVLink>
          </div>
        ),
      };
    });
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Category List" key="1">
          <Card style={{ marginBottom: '16px' }}>
            <Row gutter={[8, 8]} align="middle">
              <Col xs={24} sm={18} md={4}>
                <Search
                  placeholder="Tìm kiếm danh mục..."
                  value={searchValue}
                  onChange={handleSearch}
                  allowClear
                  onClear={handleClearSearch}
                  style={{ width: '100%' }}
                  size="middle"
                />
              </Col>
              <Col xs={24} sm={6} md={2}>
                <Button
                  type="primary"
                  onClick={showModal}
                  icon={<PlusOutlined />}
                  size="middle"
                  block
                >
                  Create New
                </Button>
              </Col>
            </Row>
          </Card>
          <Modal
            title={
              <Space>
                <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Create New Category</span>
              </Space>
            }
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={900}
            centered
          >
            <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '8px' }}>
              <Form
                layout="vertical"
                onFinish={onsubmit}
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
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="name"
                            label="Category Name"
                            rules={[{ required: true, message: 'Please enter category name!' }]}
                          >
                            <Input placeholder="Enter category name" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="anotherName"
                            label="Alternative Name"
                          >
                            <Input placeholder="Enter alternative name" />
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
                        <Col xs={24} md={12}>
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
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                          <Form.Item
                            name="time"
                            label="Duration"
                          >
                            <Input placeholder="Enter duration" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            name="year"
                            label="Year"
                          >
                            <Input placeholder="Enter year" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            name="hour"
                            label="Hour"
                          >
                            <Input placeholder="Enter hour" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            name="sumSeri"
                            label="Total Episodes"
                          >
                            <Input placeholder="Enter total episodes" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            name="up"
                            label="Setup"
                          >
                            <Input placeholder="Enter setup" />
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
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={8}>
                          <Form.Item
                            name="status"
                            label="Status"
                          >
                            <Select placeholder="Select status">
                              <Select.Option value="completed">✅ Hoàn thành</Select.Option>
                              <Select.Option value="pending">⏳ Đang chờ</Select.Option>
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
                              options={weeekOptions}
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
                              options={UpcomingReleasesOptions}
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
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                          <Form.Item
                            name="newMovie"
                            label="New Movie"
                          >
                            <Select placeholder="Is new movie?">
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
                                    }}
                                  >
                                    Remove Preview
                                  </Button>
                                </div>
                              )}
                            </Form.Item>
                          </Space>
                        </Col>
                        <Col xs={24} lg={6}>
                          {
                            previewImage && <div style={{
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
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
                              />
                              {previewImage && (
                                <div style={{ marginTop: '8px' }}>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>
                                    Image Preview
                                  </Text>
                                </div>
                              )}
                            </div>
                          }
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
                    icon={<PlusOutlined />}
                    size="middle"
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                  >
                    Create Category
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
            <MVTable
              columns={columnsCategory}
              dataSource={data}
              scroll={{ x: 1000, y: 1000 }}
              pagination={{
                defaultPageSize: 24,
                showSizeChanger: true,
                pageSizeOptions: ["24", "44", "64"],
                current: page,
                onChange: handlePageChangePage,
                total: category?.totalCount,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} categories`,
              }}
            />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Recycle Bin" key="2">
          <RecycleBin />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CategoryAdmin;
