import React, { useEffect, useState } from "react";
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
declare var Promise: any;
const EditCategory = () => {
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});
  const { reset, handleSubmit, control } = useForm();
  const { id } = useParams();
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("_id", data._id);
    formdata.append("name", data.name);
    formdata.append("des", data.des);
    formdata.append("sumSeri", data.sumSeri);
    formdata.append("week", data.week);
    formdata.append("type", data.type);
    formdata.append("file", data.file);
    formdata.append("up", data.up);
    formdata.append("time", data.time);
    formdata.append("isActive", data.isActive);
    formdata.append("year", data.year);
    const res = await dispatch(updateCatgorySlice(formdata));
    if (res.payload) {
      toast.success("Edit successfully");
    } else {
      toast.error("Edit failure");
    }
  };
  useEffect(() => {
    dispatch(getCateSlice(id));
    const data = async (): Promise<any> => {
      const { data }: any = await getCategory(id);
      reset(data);
      setState(data);
    };
    data();
  }, []);
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <MVInput
        name={"name"}
        label={"Category name"}
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
      <MVInput name={"up"} label={"Set"} control={control} rules={undefined} />
      <MVImage
        className="h-[200px] md:h-[300px] lg:h-[400px] transition-opacity duration-300 group-hover:opacity-40"
        src={state && state.linkImg}
        alt={state.name}
      />
      <MVInput
        name={"linkImg"}
        label={"Link Image"}
        control={control}
        rules={undefined}
      />
      <MVUpload name={"file"} label={"Image"} control={control} />
      <MyButton htmlType="submit" className="btn btn-primary">
        Click
      </MyButton>
    </form>
  );
};

export default EditCategory;
