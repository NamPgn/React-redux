import React, { useContext, useEffect, useState } from "react";
import { DatePicker, Image, Input, Modal, Tabs } from "antd";
import { debounce } from "lodash"
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
import RecycleBin from './component/RecycleBin';

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
  const [page, setPage]: any = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("")
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
    formdata.append("week", data.week);
    formdata.append("type", data.type);
    formdata.append("file", data.file);
    formdata.append("up", data.up);
    formdata.append("time", data.time);
    formdata.append("isActive", data.isActive);
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
    // console.log()
    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success == true) {
      toast.success("Thành công");
    } else {
      toast.error("Thất bại");
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
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Category List" key="1">
          <div className="flex gap-1 mb-3">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Tìm kiếm category..."
                value={searchValue}
                onChange={handleSearch}
                allowClear
                onClear={handleClearSearch}
                style={{ flex: 1 }}
              />
              <MyButton type="primary" onClick={showModal}>
                New
              </MyButton>
            </div>
          </div>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form onSubmit={handleSubmit(onsubmit)}>
              <MVInput
                name={"name"}
                label={"Name"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"anotherName"}
                label={"Another Name"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"des"}
                label={"Description"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"sumSeri"}
                label={"Sum seri"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"type"}
                label={"Type"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"week"}
                label={"Week"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"time"}
                label={"Duration"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"isActive"}
                label={"isActive"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"year"}
                label={"Year"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"up"}
                label={"Set"}
                control={control}
                rules={undefined}
              />
              <MVInput
                name={"hour"}
                label={"Hour"}
                control={control}
                rules={undefined}
              />
              <MySelectWrapper
                className="mb-3"
                name={"week"}
                label={"Theo tuần"}
                control={control}
                placeholder={"Week"}
                defaultValue={"Week"}
                options={weeekOptions}
              />
              <MySelectWrapper
                name={"upcomingReleases"}
                label={"UpcomingReleases"}
                control={control}
                placeholder={"UpcomingReleases"}
                defaultValue={undefined}
                options={UpcomingReleasesOptions}
              />
              <MySelectWrapper
                name={"isMovie"}
                label={"Is Movie"}
                control={control}
                placeholder={"Is Movie"}
                defaultValue={undefined}
                options={isMovieOptions}
              />

              <MVInput
                name={"episode_many_title"}
                label={"Episode Many title"}
                control={control}
                rules={undefined}
              />
              <div className="mt-4">
                <div>Select Date</div>
                <Controller
                  name="releaseDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                      className="w-full"
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
              <MVUpload name={"file"} label={"Upload"} control={control} />
              <MyButton htmlType="submit" className="mt-2">
                Create
              </MyButton>
            </form>
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
            }}
          ></MVTable>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Recycle Bin" key="2">
          <RecycleBin />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CategoryAdmin;