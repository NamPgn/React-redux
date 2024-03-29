import React from "react";
import { useNavigate } from "react-router-dom";
import { resgisterLogin } from "../../redux/slice/userSlice";
import { useAppDispatch } from "../../hook";
import AuthForm from "../../components/Form";
import { message } from "antd";
import { MVError, MVSuccess } from "../../components/Message";

const array = [
  {
    type: "text",
    field: "username",
    disable: false,
  },
  {
    type: "password",
    field: "password",
    disable: false,
  },
  {
    type: "repassword",
    field: "repassword",
    disable: true,
  },
];
const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onsubmit = async (data: any) => {
    const response = await dispatch(resgisterLogin(data));
    if (response.payload.success) {
      MVSuccess(response.payload.message);
      navigate("/signin");
    } else {
      MVError(response.payload.message);
    }
  };
  const handleMessage = () => {
    message.success("Đang cập nhật!");
  };
  return (
    <AuthForm
      onSubmit={onsubmit}
      formTitle={"Signup"}
      formDescription={"Just some details to get you in.!"}
      submitButtonText={"Signup"}
      formIntro={"Skip the lag ?"}
      formHeader={"Roll the Carpet.!"}
      checkedAccount={"Already Registered? Login"}
      handleMessage={handleMessage}
      redirect={"/signin"}
      array={array}
    />
  );
};

export default Signup;
