import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  editProduct,
  getProduct,
} from "../../../../redux/slice/product/thunk/product";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { MySelectWrapper } from "../../../../components/Form/component/select";
import { UploadAssby } from "../../../../sevices/product";
import { MyButton } from "../../../../components/MV/Button";
import Dividers from "../../../../components/MV/Divider";
import MVUpload from "../../../../components/MV/Upload";
import MVInput from "../../../../components/MV/Input";
import MVLink from "../../../../components/Location/Link";
import MVTitle from "../../../../components/MV/Title";
import MVImage from "../../../../components/MV/Image";
import { ApiContext } from "../../../../context/api";
import { handleImage } from "../../../../lib/handleImage";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import PageTitle from "../../../../components/PageTitle";
declare var Promise: any;

const EditProduct = () => {
  const { seri }: any = useContext(ApiContext) || {};
  const [isLoading, setIsLoading] = useState(false);
  const { data }: any = useAppSelector((state) => state.category.category);
  const { id } = useParams();
  const { handleSubmit, reset, control } = useForm();
  const dispatch = useAppDispatch();
  const [state, setState]: any = useState({});

  useEffect(() => {
    const getFormProduct = async (): Promise<any> => {
      const { payload }: any = await dispatch(getProduct(id));
      reset({
        ...payload,
        category: payload.category?._id,
      });
      setState(payload);
    };
    getFormProduct();
  }, []);

  useEffect(() => {
    dispatch(getAllcate({ page: 0 }));
  }, []);

  const onsubmit = async (value: any) => {
    const formdata = new FormData();
    formdata.append("name", value.name);
    formdata.append("slug", value.slug);
    formdata.append("category", value.category);
    formdata.append("_id", value._id);
    formdata.append("seri", value.seri);
    formdata.append("LinkCopyright", value.LinkCopyright);
    formdata.append("copyright", value.copyright);
    formdata.append("trailer", value.trailer);
    formdata.append("image", value.image);
    formdata.append("typeId", value.typeId);
    formdata.append("categorymain", value.categorymain);
    formdata.append("dailyMotionServer", value.dailyMotionServer);
    formdata.append("link", value.link);
    formdata.append("imageLink", value.image);
    formdata.append("view", value.view);
    formdata.append("server2", value.server2);
    const res = await dispatch(editProduct(formdata));
    if (res?.meta?.requestStatus == "fulfilled") {
      toast.success(`Edit ${value.name} Success`);
    }
  };

  const handleSubmitServerAssb = async (data: any) => {
    try {
      const formdata = new FormData();
      formdata.append("fileupload", data.fileupload);
      const res = await UploadAssby(id, formdata);
      if (res) {
        toast.success(`${data.name} Successfully Uploaded`);
        setIsLoading(true);
      }
    } catch (error) {
      toast.error(`${data.name} Failed to Upload`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle
          title={`Edit Episode: ${state?.name + " tập " + state?.seri}`}
          subtitle="Edit Episode Description"
        />

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <div className="flex items-center justify-between">
            <MVTitle level={4} className="text-xl font-semibold text-gray-800">
              <MVLink
                to={`/d/${state?.slug}`}
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
              >
                {state?.name + " tập " + state?.seri}
              </MVLink>
            </MVTitle>
            <div className="w-36 h-36 rounded-lg overflow-hidden shadow-md">
              <MVImage
                src={handleImage(200, state?.category?.linkImg)}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <MVInput
                      name={"name"}
                      label={"Product name"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"slug"}
                      label={"Slug"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"seri"}
                      label={"Seri"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"view"}
                      label={"View"}
                      control={control}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Media Links</h3>
                  <div className="space-y-4">
                    <MVInput
                      name={"link"}
                      label={"Video Url"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"dailyMotionServer"}
                      label={"DailyMotionServer"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"server2"}
                      label={"Assb server"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"trailer"}
                      label={"Trailer Video"}
                      control={control}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Image & Categories</h3>
                  <div className="space-y-4">
                    <MVUpload
                      name={"image"}
                      label={"New Image Upload"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"imageLink"}
                      label={"Image Link"}
                      control={control}
                      className="w-full"
                    />
                    <MySelectWrapper
                      label={"Category"}
                      control={control}
                      name={"category"}
                      options={data?.map((item:any) => ({ label: item.name, value: item._id }))}
                      className="w-full"
                    />
                    <MySelectWrapper
                      name={"typeId"}
                      label={"Thể loại của phim lẻ"}
                      control={control}
                      defaultValue={"Thể loại"}
                      options={seri?.map((item:any) => ({ label: item.name, value: item._id }))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Copyright Information</h3>
                  <div className="space-y-4">
                    <MVInput
                      name={"LinkCopyright"}
                      label={"LinkCopyright"}
                      control={control}
                      className="w-full"
                    />
                    <MVInput
                      name={"copyright"}
                      label={"Copyright"}
                      control={control}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <MyButton 
                htmlType="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Update Product
              </MyButton>
            </div>
          </form>

          <Dividers 
            textColor={"#4B5563"} 
            orientation={"center"} 
            className="my-8 text-lg font-medium"
          >
            Abyss Server
          </Dividers>

          <form
            onSubmit={handleSubmit(handleSubmitServerAssb)}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Video</h3>
            <div className="space-y-4">
              <MVUpload
                name={"fileupload"}
                label={"New Video Upload"}
                control={control}
                className="w-full"
              />
              <div className="flex justify-end">
                <MyButton 
                  loading={isLoading} 
                  htmlType="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Upload Video
                </MyButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
