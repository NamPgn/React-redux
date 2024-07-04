import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../hook";
import { MyContext } from "../../context";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import MVAvatar from "../../components/MV/Avatar";
import { useForm } from "react-hook-form";
import { handleLogout } from "../../function";
import { MVError, MVSuccess } from "../../components/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useContext(MyContext) || {};
  const shcemaProfile = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    firstName: yup.string().optional(),
    lastName: yup.string().optional(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(shcemaProfile),
  });

  const isLoading = useAppSelector((state) => state.user.isLoading);
  const handleEditImage = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    const datas = {
      id: user._id,
      formData: formData,
    };
    const responese = await dispatch(uploadImage(datas));
    if (responese.payload?.success) {
      MVSuccess("Image saved successfully");
    } else {
      MVError("Image saved failed");
    }
  };
  const handleEditUserInfo = async (data) => {
    console.log(data);
  };
  return (
    // <Container className="containers p-5 ">
    //   <MVRow
    //     style={{
    //       margin: "20px",
    //     }}
    //     justify={"center"}
    //   >
    //     {user.image ? (
    //       <MVAvatar
    //         size={undefined}
    //         className="w-20 h-20 text-large"
    //         src={user.image}
    //       />
    //     ) : (
    //       <div>Upload ảnh</div>
    //     )}
    //   </MVRow>
    //   <div className="text-[20px] text-white text-center mb-3 capitalize">
    //     {user.username}
    //   </div>
    //   <MVRow gutter={16} justify={"center"} align={"middle"}>
    //     <MVCol>
    //       <form onSubmit={handleSubmit(handleEditImage)}></form>
    //       <input
    //         type="file"
    //         className="text-white underline text-sm text-grey-500
    //         file:mr-5 file:py-2 file:px-6
    //         file:rounded-full file:border-0
    //         file:text-sm file:font-medium
    //         file:bg-blue-50 file:text-blue-700
    //         hover:file:cursor-pointer hover:file:bg-amber-50
    //         hover:file:text-amber-700
    //       "
    //         onChange={(e) => {
    //           const file = Array.from(e.target.files);
    //           setState(file);
    //         }}
    //       />
    //     </MVCol>
    //   </MVRow>
    //   <div className="text-center mt-5">
    //     <MyButton
    //       onClick={() => handleLogout(dispatch, navigate)}
    //       danger
    //       className="text-white btn-rounded btn-lg"
    //     >
    //       Logout
    //     </MyButton>
    //   </div>
    //   <MVRow
    //     gutter={16}
    //     justify={"center"}
    //     align={"middle"}
    //     style={{ marginTop: "20px" }}
    //   >
    //     <MVCol className="lg:w-4/12 md:w-6/12 w-full">
    //       {/* <div className='text-sm text-[#fff]'>Full name</div> */}
    //       <InputStyled
    //         type="text"
    //         disabled
    //         defaultValue={user.username}
    //         placeholder="Full name"
    //       />
    //     </MVCol>
    //   </MVRow>
    //   <div className="flex justify-center">
    //     <MyButton
    //       icon={<EditOutlined />}
    //       loading={isLoading}
    //       className="text-white mt-7"
    //       onClick={handleEditImage}
    //     >
    //       Update Profile
    //     </MyButton>
    //   </div>
    // </Container>
    <div className="flex justify-around">
      <form
        className="bg-[#1b1b1b18] p-5 rounded-lg lg:w-4/12 md:w-6/12 w-full"
        onSubmit={handleSubmit(handleEditUserInfo)}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-50/10 pb-12">
            <div className="flex justify-between">
              <h2 className="text-base font-semibold leading-7 text-white">
                Profile
              </h2>
              <button
                onClick={() => handleLogout(dispatch, navigate)}
                className="inline-flex gap-2 items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
              >
                <LogoutOutlined />
                Logout
              </button>
            </div>
            <div className="flex justify-center">
              {isLoading ? <div className="seriLoading">Loading...</div>: <div className="h-40 w-40">
                {user ? (
                  <img
                    className="object-cover h-full p-1 rounded-lg ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={user.image}
                    alt={user.username}
                  />
                ) : (
                  <MVAvatar
                    title={user?.name}
                    src={undefined}
                    size={40}
                    icon={<UserOutlined />}
                  />
                )}
              </div>}
            </div>
            <div className="text-center m-5">
              <input
                type="file"
                className="text-white underline text-sm text-grey-500
                          file:mr-5 file:py-2 file:px-6
                          file:rounded-full file:border-0
                          file:text-sm file:font-medium
                        file:bg-blue-50 file:text-blue-700
                          hover:file:cursor-pointer hover:file:bg-amber-50
                           hover:file:text-amber-700"
                onChange={handleEditImage}
              />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    {...register("username")}
                    defaultValue={user.username}
                    placeholder="Username"
                    type="text"
                    name="Username"
                    id="Username"
                    autoComplete="given-name"
                    className="block w-full p-2 bg-transparent rounded-md border-0 py-1.5 text-[#999] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.username && (
                    <div className="text-sm text-pink-600 mt-1">
                      {errors.username.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    placeholder=" email"
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="family-name"
                    className="block w-full p-2 bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <div className="text-sm text-pink-600 mt-1">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-300">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    placeholder="First name"
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full p-2 bg-transparent rounded-md border-0 py-1.5 text-[#999] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <div className="text-sm text-pink-600 mt-1">
                      {errors.firstName?.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    placeholder=" Last name"
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full p-2 bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <div className="text-sm text-pink-600 mt-1">
                      {errors.lastName?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <MyButton
            htmlType="submit"
            icon={}
            loading={isLoading}
            className="text-white mt-7"
          >
            
          </MyButton> */}
          <button className="inline-flex gap-2 items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
            <EditOutlined />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
