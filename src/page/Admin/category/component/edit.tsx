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
const { SHOW_PARENT } = TreeSelect;
declare var Promise: any;
const EditCategory = () => {

  const dispatch = useAppDispatch();
  const [selectCategory, setSelectCategory] = useState([]);
  const { weeks } = useContext(ApiContext);
  const [state, setState]: any = useState({});
  const { reset, handleSubmit, control } = useForm();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async (): Promise<any> => {
      const { data }: any = await getCategory(id);
      reset({
        ...data,
        week: data.week._id,
      });
      setState(data);
    };
    data();
  }, []);
  const { data:categorySelect  } = useSWRWithAxios(
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
  const treeDataCateogys =categorySelect && categorySelect?.map((item: any) => ({
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
    formdata.append("quality", data.episode_many_title);
    formdata.append("quality", data.upcomingReleases);
    formdata.append("quality", data.isMovie);
    const res = await dispatch(updateCatgorySlice(formdata));
    if (res.payload) {
      toast.success("Edit successfully");
    } else {
      toast.error("Edit failure");
    }
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
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
      <MVInput
        name={"des"}
        label={"Category des"}
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
        name={"type"}
        label={"Type"}
        control={control}
        rules={undefined}
      />
      <MVInput name={"up"} label={"Set"} control={control} rules={undefined} />
      <MVImage
        style={{ width: "250px" }}
        className="h-[200px] md:h-[300px] lg:h-[400px] transition-opacity duration-300 group-hover:opacity-40"
        src={handleImage(200, state && state.linkImg)}
        alt={state.name}
      />
      <MVInput
        name={"linkImg"}
        label={"Link Image"}
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
        name={"hour"}
        label={"Hour"}
        control={control}
        rules={undefined}
      />
      <MVInput
        name={"lang"}
        label={"Lang"}
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
        name={"quality"}
        label={"Quality"}
        control={control}
        rules={undefined}
      />

      <MVInput
        name={"episode_many_title"}
        label={"Episode Many title"}
        control={control}
        rules={undefined}
      />

      <MySelectWrapper
        className="mb-2"
        name={"week"}
        label={"Week"}
        control={control}
        placeholder={"Week"}
        defaultValue={undefined}
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
      <div className="mt-4">
        <div>Select Date</div>
        <DatePicker className="w-full " onChange={onChangeDate} />
      </div>
      <div className="mt-5">
        <div>Select Type</div>
        <TreeSelect {...tProps} />
      </div>
      <MVUpload name={"file"} label={"Image"} control={control} />
      <MyButton htmlType="submit" className="btn btn-primary">
        Click
      </MyButton>
    </form>
  );
};

export default EditCategory;
