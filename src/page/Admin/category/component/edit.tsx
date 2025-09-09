import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getCateSlice,
  updateCatgorySlice,
} from "../../../../redux/slice/category/thunk/category";
import { toast } from "react-toastify";
import { getCategory } from "../../../../sevices/category";
import { useAppDispatch } from "../../../../hook";
import { MyButton } from "../../../../components/MV/Button";
import MVImage from "../../../../components/MV/Image";
import MVUpload from "../../../../components/MV/Upload";
import MVInput from "../../../../components/MV/Input";
import { MySelectWrapper } from "../../../../components/Form/component/select";
import { ApiContext } from "../../../../context/api";
import { handleImage } from "../../../../lib/handleImage";
import { ISMOVIE, RELEASES } from "../../../../constant/categoyy";
import { DatePicker, TreeSelect } from "antd";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { useTags } from "../../../../hook/useTags";
const { SHOW_PARENT } = TreeSelect;
declare var Promise: any;
const EditCategory = () => {
  const dispatch = useAppDispatch();
  const [selectCategory, setSelectCategory] = useState([]);
  const { weeks } = useContext(ApiContext);
  const [state, setState]: any = useState({});
  const { reset, handleSubmit, control } = useForm();
  const { id } = useParams();
  const {
    data: tags = [],
  }: any = useTags();
  const tagsOptions = tags?.data?.map((tag: any) => ({
    label: tag.name,
    value: tag._id,
  }));
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async (): Promise<any> => {
      const { data }: any = await getCategory(id);
      reset({
        ...data,
        week: data.week?.map((week: any) => week._id),
        tags: data.tags?.map((tag: any) => tag._id)
      });
      setState(data);
    };
    data();
  }, []);
  const { data: categorySelect } = useSWRWithAxios(
    urlSwr + "/bigcategory/content"
  );
  const weeekOptions =
    weeks &&
    weeks?.map((item: any, index: number) => ({
      label: item.name,
      value: item._id,
    }));

  const UpcomingReleasesOptions = RELEASES?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));
  const treeDataCateogys =
    categorySelect &&
    categorySelect?.map((item: any) => ({
      title: item.name,
      value: item._id,
      key: item._id,
    }));
  const isMovieOptions = ISMOVIE?.map((item: any) => ({
    label: item.name,
    value: item.val,
  }));
  const onChangeTreeCategory = (newValue: string[]) => {
    console.log(newValue);
    setSelectCategory(newValue);
  };
  const tProps = {
    treeData: treeDataCateogys,
    selectCategory,
    onChangeTreeCategory,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("_id", data._id);
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
    formdata.append("thuyetMinh", data.thuyetMinh);
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
    const res = await dispatch(updateCatgorySlice(formdata));
    if (res.payload) {
      toast.success("Edit successfully");
    } else {
      toast.error("Edit failure");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      {/* Basic Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b border-gray-200  pb-2">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MVInput
            name={"name"}
            label={"Category name"}
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
            name={"slug"}
            label={"Slug"}
            control={control}
            rules={undefined}
          />
          <div className="lg:col-span-3">
            <MVInput
              name={"des"}
              label={"Category Description"}
              control={control}
              rules={undefined}
            />
          </div>
        </div>
      </div>

      {/* Media & Technical Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b border-gray-200  pb-2">
          Media & Technical Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            name={"type"}
            label={"Type"}
            control={control}
            rules={undefined}
          />
          <MVInput
            name={"up"}
            label={"Set"}
            control={control}
            rules={undefined}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <MVInput
            name={"sumSeri"}
            label={"Sum Series"}
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
            name={"season"}
            label={"Season"}
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

      {/* Image Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200  pb-2">
          Image & Media
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-50  rounded-lg p-4 border-2 border-dashed  ">
              <MVImage
                style={{ width: "100%" }}
                className="h-[250px] md:h-[300px] rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-40"
                src={handleImage(200, state && state.linkImg)}
                alt={state.name}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <MVInput
              name={"linkImg"}
              label={"Link Image"}
              control={control}
              rules={undefined}
            />
            <MVUpload name={"file"} label={"Upload Image"} control={control} />
          </div>
        </div>
      </div>

      {/* Quality & Language Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b border-gray-200  pb-2">
          Quality & Language
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MySelectWrapper
            name={"lang"}
            label={"Language"}
            control={control}
            rules={undefined}
            placeholder={"Select Language"}
            defaultValue={undefined}
            options={[
              { label: "Vietsub", value: "Vietsub" },
              { label: "Thuyết Minh", value: "ThuyetMinh" },
              { label: "Thuyết Minh + Vietsub", value: "ThuyetMinh-Vietsub" },
            ]}
          />

          <MySelectWrapper
            name={"quality"}
            label={"Quality"}
            control={control}
            rules={undefined}
            placeholder={"Select Quality"}
            defaultValue={undefined}
            options={[
              { label: "HD", value: "HD" },
              { label: "FHD", value: "FHD" },
              { label: "4K", value: "4K" },
            ]}
          />

          <MySelectWrapper
            name={"thuyetMinh"}
            label={"Thuyết Minh"}
            control={control}
            placeholder={"Select Option"}
            defaultValue={undefined}
            options={[
              { label: "Có", value: true },
              { label: "Không", value: false },
            ]}
          />

          <MySelectWrapper
            name={"isMovie"}
            label={"Is Movie"}
            control={control}
            placeholder={"Select Type"}
            defaultValue={undefined}
            options={isMovieOptions}
          />
        </div>
      </div>

      {/* Status & Release Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b border-gray-200  pb-2">
          Status & Release
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MySelectWrapper
            name={"status"}
            label={"Status"}
            control={control}
            rules={undefined}
            placeholder={"Select Status"}
            options={[
              {
                label: "Hoàn thành",
                value: "completed",
              },
              {
                label: "Đang chờ",
                value: "pending",
              },
            ]}
          />

          <MySelectWrapper
            name={"week"}
            label={"Week"}
            control={control}
            placeholder={"Select Week"}
            defaultValue={undefined}
            options={weeekOptions}
            mode="multiple"
          />

          <MySelectWrapper
            name={"upcomingReleases"}
            label={"Upcoming Releases"}
            control={control}
            placeholder={"Select Release"}
            defaultValue={undefined}
            options={UpcomingReleasesOptions}
          />

          <MySelectWrapper
            name={"newMovie"}
            label={"New Movie"}
            control={control}
            placeholder={"Is New Movie?"}
            defaultValue={undefined}
            options={[
              { label: "Có", value: true },
              { label: "Không", value: false },
            ]}
          />

          <MySelectWrapper
            name={"tags"}
            label={"Tags"}
            placeholder={"Select Tags"}
            control={control}
            rules={undefined}
            options={tagsOptions}
            mode="multiple"
          />
        </div>
      </div>

      {/* Date & Category Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800  mb-4 border-b border-gray-200  pb-2">
          Date & Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Date</label>
            <div className="p-3 border border-gray-300  rounded-md bg-white ">
              <DatePicker />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Select Category Type
            </label>
            <div className="p-3 border border-gray-300  rounded-md bg-white ">
              <TreeSelect {...tProps} />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200 ">
        <MyButton
          htmlType="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Save Movie Information
        </MyButton>
      </div>
    </form>
  );
};

export default EditCategory;
