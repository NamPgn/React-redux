import React, { useEffect, useState } from "react";
import MVTitle from "../../../../components/MV/Title";
import MVInput from "../../../../components/MV/Input";
import { useForm } from "react-hook-form";
import { MyButton } from "../../../../components/MV/Button";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { useParams } from "react-router-dom";
import { TreeSelect } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import { insertManyCategoryFromWeek } from "../../../../sevices/week";
import { toast } from "react-toastify";
const { SHOW_PARENT } = TreeSelect;

const EditWeek = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.category.category);
  const [value, setValue] = useState([]);
  const { id } = useParams();
  const { data: week, isLoading } = useSWRWithAxios(urlSwr + "/week?w=" + id);
  const { handleSubmit, reset, control } = useForm();

  useEffect(() => {
    if (week) {
      reset(week); // Đặt lại giá trị form với dữ liệu mới
      setValue(week?.content?.map((item) => item._id));
    }
    dispatch(getAllcate(0));
  }, [week]);
  const onChange = (newValue: string[]) => {
    console.log(newValue)
    setValue(newValue);
  };
  const onsubmit = async (data: any) => {
    const res = await insertManyCategoryFromWeek(id, value);
    if (res?.data) {
      toast.success(`Edit ${data.name} Success`);
    }
  };
  const treeData = data?.map((item: any) => ({
    title: item.name,
    value: item._id,
    key: item._id,
  }));
  const tProps = {
    treeData: treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <MVTitle level={4} className="mb-4 text-lg font-semibold">
        {/* <MVLink
        to={`/d/${state?.slug}`}
        className="text-blue-500 hover:underline"
      >
        {state?.name + " tập " + state?.seri}
      </MVLink> */}
      </MVTitle>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
        <MVInput
          name={"name"}
          label={"Week name"}
          control={control}
          className="w-full"
        />
        <TreeSelect {...tProps} />
        <MyButton htmlType="submit">Submit</MyButton>
      </form>
    </div>
  );
};

export default EditWeek;
