import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  Space,
  Divider,
  Row,
  Col,
  Typography,
  Button,
  Spin,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  PlayCircleOutlined,
  FileImageOutlined,
  LinkOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { addProduct } from "../../../../redux/slice/product/thunk/product";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { MySelectWrapper } from "../../../../components/Form/component/select";
import MVUpload from "../../../../components/MV/Upload";
import MVInput from "../../../../components/MV/Input";
import MVLink from "../../../../components/Location/Link";
import { ApiContext } from "../../../../context/api";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import PageTitle from "../../../../components/PageTitle";

const { Title, Text } = Typography;

const ProductAdd = () => {
  const { seri } = useContext(ApiContext);
  const { data, totalCount, totalPages } = useAppSelector(
    (state) => state.category.category
  );
  const [idProduct, setIdProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const pageSize = 24; // Number of items per page
  const dispatch = useAppDispatch();
  const { handleSubmit, control, reset, setValue, watch } = useForm();

  const selectedCategory = watch("category");

  useEffect(() => {
    // Initial load of categories
    loadCategories(page);
  }, [dispatch, page]);

  const loadCategories = (pageNumber) => {
    setFetchingCategories(true);
    dispatch(getAllcate(pageNumber)) // Assuming API uses 0-based indexing
      .finally(() => {
        setFetchingCategories(false);
      });
  };

  // When page changes, fetch new data
  const handlePageChange = (value) => {
    setPage(value);
    loadCategories(value);
  };

  const categoryOptions =
    data?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const typeOptions =
    seri?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  // Handle searching for categories
  const handleCategorySearch = (value) => {
    setCategorySearchValue(value);
    // You might want to implement a debounced search here
    // For now, we'll just reset to page 1 when searching
    if (value) {
      setPage(1);
      // Implement search API call if needed
      // This would typically filter categories by the search value
    }
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();

      // Append all form fields to FormData
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("seri", formData.seri);
      formDataToSend.append("LinkCopyright", formData.LinkCopyright);
      formDataToSend.append("copyright", formData.copyright);
      formDataToSend.append("trailer", formData.trailer);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("typeId", formData.typeId);
      formDataToSend.append("categorymain", formData.categorymain);
      formDataToSend.append("dailyMotionServer", formData.dailyMotionServer);
      formDataToSend.append("imageLink", formData.imageLink);
      formDataToSend.append("video2", formData.video2);
      formDataToSend.append("view", formData.view);
      console.log(formData)
      // const res = await dispatch(addProduct(formDataToSend));

      // if (res.payload.success === true) {
      //   setIdProduct(res.payload.data._id);
      //   toast.success("Episode created successfully");
      //   reset(); // Clear form after success
      // } else {
      //   toast.error("Failed to create episode");
      // }
    } catch (error) {
      toast.error("An error occurred while creating the episode");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="episode-create-page">
      <PageTitle
        title="Create Episode"
        subtitle="Add a new episode to your collection"
      />

      <Card bordered={false} className="shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title level={4} className="mb-6">
            <PlusOutlined className="mr-2" />
            Episode Information
          </Title>

          <Row gutter={[24, 16]}>
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <FileImageOutlined /> Basic Details
                  </Space>
                }
                className="h-full"
                type="inner"
                size="small"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <MVInput
                      name="name"
                      label="Episode Name"
                      control={control}
                      rules={{ required: "Episode name is required" }}
                      placeholder="Enter episode name"
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <MVInput
                      name="view"
                      label="View Count"
                      control={control}
                      type="number"
                      placeholder="Enter view count"
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <MVInput
                      name="seri"
                      label="Series"
                      control={control}
                      placeholder="Enter series name"
                    />
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div className="mt-2">
                      <Text>Category</Text>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select a category"
                            showSearch
                            loading={fetchingCategories}
                            notFoundContent={
                              fetchingCategories ? <Spin size="small" /> : null
                            }
                            filterOption={false}
                            onSearch={(value) => setCategorySearchValue(value)}
                            options={categoryOptions}
                            onChange={(value) => field.onChange(value)}
                            style={{ width: "100%" }}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                                <Divider style={{ margin: "8px 0" }} />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "0 8px 4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "8px 0",
                                    }}
                                  >
                                    <Space>
                                      <Button
                                        type="text"
                                        icon={<DownOutlined />}
                                        onClick={() =>
                                          handlePageChange(page - 1)
                                        }
                                        disabled={
                                          page <= 1 || fetchingCategories
                                        }
                                      >
                                        Previous
                                      </Button>
                                      <span>Page {page}</span>
                                      <Button
                                        type="text"
                                        icon={<DownOutlined rotate={180} />}
                                        onClick={() =>
                                          handlePageChange(page + 1)
                                        }
                                        disabled={totalPages === page}
                                      >
                                        Next
                                      </Button>
                                    </Space>
                                  </div>
                                </div>
                              </>
                            )}
                          />
                        )}
                      />
                    </div>
                  </Col>

                  <Col xs={24} sm={12}>
                    <MySelectWrapper
                      name="typeId"
                      label="Donghua Category"
                      control={control}
                      placeholder="Select a type"
                      options={typeOptions}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <LinkOutlined /> Links & Copyright
                  </Space>
                }
                className="h-full"
                type="inner"
                size="small"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <MVInput
                      name="copyright"
                      label="Copyright"
                      control={control}
                      placeholder="Enter copyright information"
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <MVInput
                      name="LinkCopyright"
                      label="Copyright Link"
                      control={control}
                      placeholder="Enter copyright link"
                    />
                  </Col>

                  <Col xs={24}>
                    <MVInput
                      name="imageLink"
                      label="Image Link"
                      control={control}
                      prefix={<FileImageOutlined />}
                      placeholder="Enter image URL"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 16]} className="mt-6">
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <PlayCircleOutlined /> Video Content
                  </Space>
                }
                type="inner"
                size="small"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <MVInput
                      name="trailer"
                      label="Trailer URL"
                      control={control}
                      prefix={<PlayCircleOutlined />}
                      placeholder="Enter trailer URL"
                    />
                  </Col>

                  <Col xs={24}>
                    <MVInput
                      name="video2"
                      label="Video URL"
                      control={control}
                      prefix={<PlayCircleOutlined />}
                      placeholder="Enter video URL"
                    />
                  </Col>

                  <Col xs={24}>
                    <MVInput
                      name="dailyMotionServer"
                      label="DailyMotion Server"
                      control={control}
                      placeholder="Enter DailyMotion server"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <FileImageOutlined /> Upload Media
                  </Space>
                }
                type="inner"
                size="small"
              >
                <MVUpload
                  name="image"
                  label="Episode Thumbnail"
                  control={control}
                  style={{ height: "100%" }}
                />
              </Card>
            </Col>
          </Row>

          <div className="flex justify-between items-center mt-6">
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                size="large"
                loading={loading}
              >
                Create Episode
              </Button>

              {idProduct && (
                <MVLink to={`/dashboard/product/edit/${idProduct}`}>
                  <Button type="default" icon={<EditOutlined />} size="large">
                    Edit Created Episode
                  </Button>
                </MVLink>
              )}
            </Space>

            <Button onClick={() => reset()} disabled={loading} size="large">
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductAdd;
