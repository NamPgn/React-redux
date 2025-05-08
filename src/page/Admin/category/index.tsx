import React, { useContext, useEffect, useState } from "react";
import { 
  DatePicker, 
  Image, 
  Modal, 
  Typography, 
  Card, 
  Space, 
  Row, 
  Col, 
  TreeSelect, 
  Tabs, 
  Tooltip, 
  Breadcrumb, 
  Divider, 
  Badge 
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
  CalendarOutlined,
  UploadOutlined,
  FileImageOutlined,
  HomeOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import {
  addCateGorySlice,
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

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const CategoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(ApiContext);
  const { handleSubmit, control, reset } = useForm();
  const [valueId, setValue] = useState();

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const fetchCategories = async () => {
    setIsLoading(true);
    await dispatch(getAllcate(page));
    setIsLoading(false);
  };

  const UpcomingReleasesOptions = RELEASES?.map((item) => ({
    label: item.name,
    value: item.val,
  }));

  const valueOptions =
    seri &&
    seri?.map((items, index) => ({
      label: `${index + 1} - ${items.name}`,
      value: items._id,
      children: items.categorymain.map((val, i) => ({
        label: `${i + 1} - ${val.cates.name}`,
        value: val.cates._id,
      })),
    }));

  const weeekOptions =
    weeks &&
    weeks?.map((item, index) => ({
      label: item.name,
      value: item._id,
    }));

  const isMovieOptions = ISMOVIE?.map((item) => ({
    label: item.name,
    value: item.val,
  }));

  // Modal handlers
  const showModal = () => {
    reset(); // Reset form when opening modal
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  // TreeSelect handler
  const onChange = (newValue) => {
    setValue(newValue);
  };

  // Form submission handler
  const onsubmit = async (data) => {
    try {
      setIsLoading(true);
      const formdata = new FormData();
      
      // Append form data
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          formdata.append(key, data[key]);
        }
      });

      const res = await dispatch(addCateGorySlice(formdata));
      
      if (res.payload.success === true) {
        toast.success("Category created successfully");
        handleCancel();
        fetchCategories();
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete handler
  const showDeleteConfirm = (id) => {
    setSelectedCategoryId(id);
    setDeleteConfirmVisible(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(deleteCategorySlice(selectedCategoryId));
      
      if (res.payload) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
      setDeleteConfirmVisible(false);
    }
  };

  // Push category handler
  const handlePushCategoryToType = async (categoryId) => {
    if (!valueId) {
      toast.warning("Please select a type first");
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        categoryId: categoryId,
      };
      
      const res = await pushCateTotype(valueId, body);
      
      if (res.data.success) {
        MVSuccess("Category added to type successfully!");
      } else {
        MVError("Failed to add category to type!");
      }
    } catch (error) {
      console.error("Error pushing category:", error);
      MVError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination handler
  const handlePageChangePage = (page) => {
    setPage(page);
  };

  // Format table data
  const tableData =
    category.data &&
    category.data.map((item, index) => {
      return {
        key: item._id,
        name: <MVLink to={`/q/${item._id}`}>{item.name}</MVLink>,
        slug: item.slug,
        image: (
          <Image
            width={120}
            height={160}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            src={item.linkImg}
            alt={item.name}
            preview={{ mask: <FileImageOutlined /> }}
          />
        ),
        createAt: item.createdAt,
        duration: item.time,
        isActive: (
          <Badge
            status={item.isActive === 0 ? "warning" : "success"}
            text={item.isActive === 0 ? "Pending" : "Active"}
          />
        ),
        year: item.year,
        week: weeks && weeks.map((i) => i._id === item.week && i.name),
        action: (
          <Space size="small">
            <Tooltip title="Edit">
              <MVLink to={`/dashboard/category/edit/${item.slug}`}>
                <MyButton type="primary" icon={<EditOutlined />} size="middle" />
              </MVLink>
            </Tooltip>
            <Tooltip title="Delete">
              <MyButton
                danger
                icon={<DeleteOutlined />}
                size="middle"
                onClick={() => showDeleteConfirm(item._id)}
              />
            </Tooltip>
            <Tooltip title="Push to Type">
              <MyButton
                type="default"
                icon={<PushpinOutlined />}
                size="middle"
                onClick={() => handlePushCategoryToType(item._id)}
                disabled={!valueId}
              />
            </Tooltip>
          </Space>
        ),
      };
    });

  return (
    <div className="category-admin-page">
      {/* Page Header */}
      <Card bordered={false} className="mb-4">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} className="mb-0">
              <DatabaseOutlined className="mr-2" /> Category Management
            </Title>
            <Text type="secondary">
              Manage, create, and organize your content categories
            </Text>
          </Col>
          <Col>
            <MyButton 
              type="primary" 
              onClick={showModal} 
              icon={<PlusOutlined />}
              size="large"
            >
              New Category
            </MyButton>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Row >
        {/* Right Column - Table and Content */}
        <Col span={24}>
          <Card
            bordered={false}
            className="shadow-md"
            loading={isLoading}
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="mb-4"
              type="card"
            >
              <TabPane 
                tab={
                  <span>
                    <AppstoreOutlined /> All Categories
                  </span>
                } 
                key="1"
              >
                <MVTable
                  columns={columnsCategory}
                  dataSource={tableData}
                  scroll={{ x: 1000 }}
                  pagination={{
                    defaultPageSize: 24,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    current: page,
                    onChange: handlePageChangePage,
                    total: category?.totalCount,
                    showTotal: (total) => `Total ${total} categories`,
                  }}
                  loading={isLoading}
                  bordered
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Create Category Modal */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            <span>Create New Category</span>
          </Space>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <form onSubmit={handleSubmit(onsubmit)}>
          <Divider />
          
          <Tabs defaultActiveKey="1" className="mb-4">
            <TabPane tab="Basic Information" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <MVInput
                    name="name"
                    label="Category Name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    placeholder="Enter category name"
                  />
                </Col>
                <Col span={12}>
                  <MVInput
                    name="anotherName"
                    label="Alternative Name"
                    control={control}
                    placeholder="Enter alternative name"
                  />
                </Col>
              </Row>
              
              <MVInput
                name="des"
                label="Description"
                control={control}
                placeholder="Enter description"
              />
              
              <Row gutter={16}>
                <Col span={8}>
                  <MVInput
                    name="sumSeri"
                    label="Total Episodes"
                    control={control}
                    type="number"
                    placeholder="Enter total episodes"
                  />
                </Col>
                <Col span={8}>
                  <MVInput
                    name="year"
                    label="Release Year"
                    control={control}
                    placeholder="Enter release year"
                  />
                </Col>
                <Col span={8}>
                  <MVInput
                    name="time"
                    label="Duration (minutes)"
                    control={control}
                    type="number"
                    placeholder="Enter duration"
                  />
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="Additional Details" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <MVInput
                    name="type"
                    label="Type"
                    control={control}
                    placeholder="Enter type"
                  />
                </Col>
                <Col span={12}>
                  <MVInput
                    name="hour"
                    label="Hour"
                    control={control}
                    placeholder="Enter hour"
                  />
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <MySelectWrapper
                    name="week"
                    label="Week Schedule"
                    control={control}
                    placeholder="Select day of week"
                    options={weeekOptions}
                  />
                </Col>
                <Col span={12}>
                  <MVInput
                    name="up"
                    label="Set"
                    control={control}
                    placeholder="Enter set"
                  />
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <MySelectWrapper
                    name="upcomingReleases"
                    label="Upcoming Releases"
                    control={control}
                    placeholder="Select release status"
                    options={UpcomingReleasesOptions}
                  />
                </Col>
                <Col span={12}>
                  <MySelectWrapper
                    name="isMovie"
                    label="Content Type"
                    control={control}
                    placeholder="Select content type"
                    options={isMovieOptions}
                  />
                </Col>
              </Row>
            </TabPane>
            
            <TabPane tab="Media & Status" key="3">
              <Row gutter={16}>
                <Col span={12}>
                  <MVInput
                    name="isActive"
                    label="Status (0: Pending, 1: Active)"
                    control={control}
                    placeholder="Enter status"
                    type="number"
                    min={0}
                    max={1}
                  />
                </Col>
                <Col span={12}>
                  <MVInput
                    name="episode_many_title"
                    label="Episode Title Format"
                    control={control}
                    placeholder="Enter episode title format"
                  />
                </Col>
              </Row>
              
              <div className="mt-4">
                <Text strong>
                  <CalendarOutlined className="mr-2" />
                  Release Date
                </Text>
                <Controller
                  name="releaseDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                      className="w-full mt-2"
                      onChange={(date, dateString) => {
                        if (date) {
                          field.onChange(dayjs(date).format("YYYY-MM-DD"));
                        } else {
                          field.onChange(null);
                        }
                      }}
                    />
                  )}
                />
              </div>
              
              <div className="mt-4">
                <Text strong>
                  <UploadOutlined className="mr-2" />
                  Cover Image
                </Text>
                <MVUpload 
                  name="file" 
                  label="Upload Cover Image" 
                  control={control} 
                />
              </div>
            </TabPane>
          </Tabs>
          
          <Divider />
          
          <div className="flex justify-end gap-2">
            <MyButton onClick={handleCancel} disabled={isLoading}>
              Cancel
            </MyButton>
            <MyButton 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              icon={<PlusOutlined />}
            >
              Create Category
            </MyButton>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={deleteConfirmVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, loading: isLoading }}
      >
        <p>Are you sure you want to delete this category? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default CategoryAdmin;