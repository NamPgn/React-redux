import React, { useContext, useEffect, useState } from "react";
import { DatePicker, Image, Input, Modal, Tabs, Dropdown, Space } from "antd";
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
import { TreeSelect } from "antd";
import { MVError, MVSuccess } from "../../../components/Message";
import MVTags from "../../../components/MV/Tag";
import { ApiContext } from "../../../context/api";
import { ISMOVIE, RELEASES } from "../../../constant/categoyy";
import dayjs from "dayjs";
import RecycleBin from './component/RecycleBin';
import { EditOutlined, DeleteOutlined, PushpinOutlined, MoreOutlined, PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';

const CategoryAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage]: any = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("")
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(ApiContext);
  const { handleSubmit, control } = useForm();
  const [valueId, setValue] = useState();

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
    // console.log()
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

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  // const handleChange = () => {
  //   const daysOfWeek = [
  //     "Chủ Nhật",
  //     "Thứ 2",
  //     "Thứ 3",
  //     "Thứ 4",
  //     "Thứ 5",
  //     "Thứ 6",
  //     "Thứ 7",
  //   ];

  //   const now = new Date();

  //   const dayIndex = now.getDay();

  //   const day = daysOfWeek[dayIndex];
  //   const getDayDb = weeks && weeks.find((i: any) => i.name == day);
  // };
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
    category.data.map((item: any, index: number) => {
      const actionItems = [
        {
          key: 'edit',
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
          key: 'delete',
          label: (
            <Space onClick={() => handleDelete(item._id)}>
              <DeleteOutlined />
              Delete
            </Space>
          ),
          danger: true,
        },
        {
          key: 'push',
          label: (
            <Space onClick={() => hanedlePushCategoryToType(item._id)}>
              <PushpinOutlined />
              Push
            </Space>
          ),
        },
        {
          key: 'combining-episodes',
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
            <MVTags color="warning">Đang chờ</MVTags>
          ) : (
            <MVTags color="success">Hoàn thành</MVTags>
          ),
        year: item.year,
        set: item.up,
        week: weeks && weeks.map((i: any) => i._id == item.week && i.name),
        action: (
          <Dropdown
            menu={{ items: actionItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <MyButton type="text">
              <MoreOutlined style={{ fontSize: '20px' }} />
            </MyButton>
          </Dropdown>
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
            title={
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  📝
                </span>
                Create New Category
              </div>
            }
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
            width={800}
            className="custom-modal"
          >
            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    📋 Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MVInput
                      name={"name"}
                      label={"Category Name"}
                      control={control}
                      rules={undefined}
                    />
                    <MVInput
                      name={"anotherName"}
                      label={"Another Name"}
                      control={control}
                      rules={undefined}
                    />
                    <div className="md:col-span-2">
                      <MVInput
                        name={"des"}
                        label={"Description"}
                        control={control}
                        rules={undefined}
                      />
                    </div>
                    <MVInput
                      name={"type"}
                      label={"Type"}
                      control={control}
                      rules={undefined}
                    />
                    <MVInput
                      name={"episode_many_title"}
                      label={"Episode Many Title"}
                      control={control}
                      rules={undefined}
                    />
                  </div>
                </div>

                {/* Time & Duration */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    ⏰ Time & Duration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MVInput
                      name={"time"}
                      label={"Duration"}
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
                      name={"hour"}
                      label={"Hour"}
                      control={control}
                      rules={undefined}
                    />
                    <MVInput
                      name={"sumSeri"}
                      label={"Sum Series"}
                      control={control}
                      rules={undefined}
                    />
                    <MVInput
                      name={"up"}
                      label={"Set"}
                      control={control}
                      rules={undefined}
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        📅 Release Date
                      </label>
                      <Controller
                        name="releaseDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                            className="w-full h-10"
                            placeholder="Select release date"
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
                  </div>
                </div>

                {/* Settings & Status */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    ⚙️ Settings & Status
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="w-full sm:w-[200px]">
                      <MySelectWrapper
                        name={"status"}
                        label={"Status"}
                        control={control}
                        placeholder={"Select Status"}
                        rules={undefined}
                        options={[
                          {
                            label: "✅ Hoàn thành",
                            value: "completed",
                          },
                          {
                            label: "⏳ Đang chờ",
                            value: "pending",
                          },
                        ]}
                      />
                    </div>

                    <div className="w-full sm:w-[180px]">
                      <MySelectWrapper
                        name={"week"}
                        label={"Week"}
                        control={control}
                        placeholder={"Select Week"}
                        defaultValue={undefined}
                        options={weeekOptions}
                      />
                    </div>

                    <div className="w-full sm:w-[220px]">
                      <MySelectWrapper
                        name={"upcomingReleases"}
                        label={"Upcoming Releases"}
                        control={control}
                        placeholder={"Select Release"}
                        defaultValue={undefined}
                        options={UpcomingReleasesOptions}
                      />
                    </div>

                    <div className="w-full sm:w-[160px]">
                      <MySelectWrapper
                        name={"isMovie"}
                        label={"Is Movie"}
                        control={control}
                        placeholder={"Select Type"}
                        defaultValue={undefined}
                        options={isMovieOptions}
                      />
                    </div>

                    <div className="w-full sm:w-[160px]">
                      <MySelectWrapper
                        name={"newMovie"}
                        label={"New Movie"}
                        control={control}
                        placeholder={"Is New?"}
                        defaultValue={undefined}
                        options={[
                          {
                            label: "✅ Có",
                            value: true,
                          },
                          {
                            label: "❌ Không",
                            value: false,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    📁 File Upload
                  </h3>
                  <MVUpload name={"file"} label={"Upload Image"} control={control} />
                </div>
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <MyButton
                    htmlType="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    🚀 Create Category
                  </MyButton>
                </div>
              </form>
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
