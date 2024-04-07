import React from "react";
import { useForm } from "react-hook-form";
import { importDataFile } from "../../../../redux/slice/product/thunk/product";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hook";
import MVUpload from "../../../../components/MV/Upload";
import { MyButton } from "../../../../components/MV/Button";
import { MVError, MVSuccess } from "../../../../components/Message";
import MVInput from "../../../../components/MV/Input";
const CreatingProducts = () => {
  const { handleSubmit, control } = useForm();
  const dispatch = useAppDispatch();
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("selectedSheets", data.selectedSheets);
    formdata.append("excelProduct", data.excelProduct);
    const res = await dispatch(importDataFile(formdata));
    if (res.payload.success == true) {
      MVSuccess(`Add product success`);
    } else {
      MVError("Add product failure");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onsubmit)}>
        <MVInput
          name={"selectedSheets"}
          label={"Index Sheet"}
          control={control}
          rules={undefined}
        />
        <MVUpload
          name={"excelProduct"}
          label={"Add Multiple file"}
          control={control}
        />
        <MyButton htmlType="submit" type="primary">
          Create
        </MyButton>
      </form>
    </div>
  );
};

export default CreatingProducts;
