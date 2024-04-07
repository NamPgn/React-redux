import React from "react";
import { useForm } from "react-hook-form";
import { importXlsx } from "../../../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch } from "../../../../hook";
const DivstyledAuth = styled.div`
  display: flex;
  justifycontent: center;
  textalign: center;
  height: 100vh;
`;

const InputStyled = styled.input``;
const CreatingUser = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const onsubmit = (data: any) => {
    const formData = new FormData();
    formData.append("xlsx", data.xlsx[0]);
    dispath(importXlsx(formData));
    navigate("/dashboard/users");
    toast.success(`Thêm user thành công`, {
      position: "bottom-right",
    });
  };
  return (
    <DivstyledAuth>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label className="form-label">Default file input example</label>
        <InputStyled
          type="file"
          {...register("xlsx")}
          className="form-control"
          id="customFile"
        />
        <button className="btn btn-success mt-3">
          Submit
        </button>
      </form>
    </DivstyledAuth>
  );
};

export default CreatingUser;
