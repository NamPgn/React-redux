import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/Form";
import { message } from "antd";
import { MVError, MVSuccess } from "../../components/Message";
import * as yup from "yup";
import { forgotPassword } from "../../sevices/user";
const array = [
  {
    type: "email",
    field: "email",
    disable: false,
  },
];
const ForgotPassword = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().required().email(),
  });
  const onsubmit = async (data: any) => {
    const response = await forgotPassword(data);
    if (response.data.success) {
      MVSuccess(response.data.message);
      navigate("/signin");
    } else {
      MVError(response.data.message);
    }
  };
  const handleMessage = () => {
    message.success("Đang cập nhật!");
  };
  return (
    <AuthForm
      onSubmit={onsubmit}
      formTitle={"Forgot Password"}
      formDescription={"Just some details to get you in.!"}
      submitButtonText={"Send"}
      formIntro={"Skip the lag ?"}
      formHeader={"Roll the Carpet.!"}
      checkedAccount={"Already Registered? Login"}
      handleMessage={handleMessage}
      redirect={"/forgot-password"}
      array={array}
      schemaPage={schema}
    />
  );
};

export default ForgotPassword;
