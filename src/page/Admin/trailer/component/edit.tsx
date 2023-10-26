import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editTrailerSlice } from "../../../../redux/slice/trailerSlice";
import { useAppDispatch } from "../../../../hook";
import { MyButton } from "../../../../components/MV/Button";
import { useParams } from "react-router-dom";

const editTrailerUrl = () => {
  const { handleSubmit, register } = useForm();
  const dispath = useAppDispatch();
  const { id } = useParams();
  const onsubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("url", data.url[0]);
    formData.append("_id", id);
    const res = await dispath(editTrailerSlice(formData));
    if (res.payload.success) {
      toast.success("edit successfully");
    } else {
      toast.error("edit failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          {...register("url")}
          type="file"
          className="text-[#000] underline text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
        />
        <MyButton htmlType="submit" className="btn btn-primary mt-2">
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default editTrailerUrl;
