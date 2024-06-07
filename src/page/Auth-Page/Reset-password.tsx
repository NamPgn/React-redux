import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthForm from "../../components/Form";
import { message } from "antd";
import { MVError, MVSuccess } from "../../components/Message";
import { resetPassword } from "../../sevices/user";
import * as yup from "yup";
const array = [
  {
    type: "password",
    field: "password",
    disable: false,
  },
  {
    type: "password",
    field: "repassword",
    disable: false,
  },
];
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const schema = yup.object().shape({
    password: yup.string().required().min(6, "Password tối thiểu 6 kí tự"),
    repassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const onsubmit = async (data: any) => {
    const response = await resetPassword(id, token, data);
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
      formTitle={"Reset Password"}
      formDescription={"Just some details to get you in.!"}
      submitButtonText={"Send"}
      formIntro={"Skip the lag ?"}
      formHeader={"Roll the Carpet.!"}
      checkedAccount={"Already Registered? Login"}
      handleMessage={handleMessage}
      redirect={"/reset-password"}
      array={array}
      schemaPage={schema}
    />
  );
};

export default ResetPassword;
