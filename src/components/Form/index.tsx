import { useForm } from "react-hook-form";
import React, { memo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BtnStyled,
  DivContainer,
  FormBorder,
  FormHeader,
  FormIntro,
  FormStyled,
  FormTitle,
  Formdescription,
  GoogleLogin,
  InputStyled,
} from "./styles";
import MVLink from "../Location/Link";
import MVImage from "../MV/Image";
import { Link } from "react-router-dom";
const AuthForm = memo(
  ({
    onSubmit,
    formTitle,
    formDescription,
    submitButtonText,
    formIntro,
    formHeader,
    checkedAccount,
    handleMessage,
    redirect,
    array,
    schemaPage,
  }: any) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    }: any = useForm({
      resolver: yupResolver(schemaPage),
    });
    return (
      <div className="h-screen relative z-0">
        <DivContainer
          className="g-6 flex flex-wrap justify-center w-full items-center absolute top-1/2 left-1/2 translate-x-2/4 translate-y-2/4"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <div className="w-8/12 items-center text-white hidden lg:block md:hidden">
            <FormHeader className="text-[50px] ">{formHeader}</FormHeader>
            <div className="flex items-center">
              <FormIntro className="w-2/12">{formIntro}</FormIntro>
              <FormBorder className="w-10/12"></FormBorder>
            </div>
          </div>
          <div
            className="md:w-8/12 lg:w-4/12 w-full lg:p-5 md:p-4 p-3"
            style={{
              background: "rgba(248, 248, 248, 0.04)",
              borderRadius: " 5px",
            }}
          >
            <div>
              <FormTitle>{formTitle}</FormTitle>
              <Formdescription>{formDescription}</Formdescription>
            </div>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
              {array &&
                array.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="relative lg:mb-6 md:mb-4 mb-2"
                    data-te-input-wrapper-init
                  >
                    <div>
                      <InputStyled
                        disabled={item.disable}
                        style={{
                          background: `${item.disable ? "#99979742" : ""}`,
                        }}
                        type={item.type}
                        {...register(`${item.field}`)}
                        placeholder={item.field}
                        className="placeholder:capitalize"
                      />
                      {errors && errors[item.field] && (
                        <div className="text-sm text-pink-600 mt-1">
                          {errors[item.field].message}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              <div className="lg:mb-6 md:mb-5 mb-4">
                <Link to={"/forgot-password"}>
                  <div className="text-center text-white text-sm font-medium text-primary-600 hover:underline text-primary-500">
                    Forgot password?{" "}
                  </div>
                </Link>
              </div>
              <BtnStyled
                type="submit"
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
              >
                {submitButtonText}
              </BtnStyled>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center text-white text-[12px]">
                  {" "}
                  OR
                </p>
              </div>
              <GoogleLogin
                className="flex justify-center"
                onClick={handleMessage}
              >
                <MVImage
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt=""
                />
              </GoogleLogin>
              <div className="lg:mb-6 md:mb-4 mb-2 text-center lg:mt-5 md:mt-3 mt-2 text-slate-400 ">
                <MVLink
                  to={redirect}
                  className="text-sm text-primary-600 hover:underline text-primary-500"
                >
                  {checkedAccount}
                </MVLink>
              </div>
            </FormStyled>
          </div>
        </DivContainer>
      </div>
    );
  }
);

export default AuthForm;
