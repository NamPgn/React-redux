import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getCateSlice,
  updateCatgorySlice,
} from "../../../../redux/slice/category/thunkCategory/category";
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
    const res = await dispatch(updateCatgorySlice(data));
    if (res.payload.success) {
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
      <MVInput name={"up"} label={"Set"} control={control} rules={undefined} />
      <MVImage width={200} src={state && state.linkImg} alt="" />
      <MVInput
        name={"linkImg"}
        label={"Image"}
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