import React from "react";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../../redux/slice/userSlice";
import { useAppDispatch } from "../../hook";
import { message } from "antd";
import AuthForm from "../../components/Form";
import { MVError, MVSuccess } from "../../components/Message";
import * as yup from "yup";

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
];

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(3, "Password tối thiểu 6 kí tự"),
  });
  const onsubmit = async (data: any) => {
    const responese: any = await dispatch(loginForm(data));
    if (responese.payload && responese?.payload?.success) {
      MVSuccess(responese.payload?.message);
      navigate("/");
    } else {
      MVError(responese.payload.message);
    }
  };

  const handleMessage = () => {
    message.success("Đang cập nhật!");
  };
  return (
    <AuthForm
      onSubmit={onsubmit}
      formTitle={"Login"}
      formHeader={"Welcome Back .!"}
      formIntro={"Skip the lag ?"}
      submitButtonText={"Login"}
      formDescription={"Glad you’re back.!"}
      checkedAccount={"Don’t have an account ? Signup"}
      handleMessage={handleMessage}
      redirect={"/signup"}
      array={array}
      schemaPage={schema}
    />
  );
};

export default Signin;
