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
  const { seri }: any = useContext(ApiContext);
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
        category: payload.category?.name,
      });
      setState(payload);
    };
    getFormProduct();
  }, []);
  useEffect(() => {
    dispatch(getAllcate(0));
  }, []);
  const onsubmit = async (data: any) => {
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("slug", data.slug);
    formdata.append("category", data.category._id);
    formdata.append("_id", data._id);
    formdata.append("seri", data.seri);
    formdata.append("LinkCopyright", data.LinkCopyright);
    formdata.append("copyright", data.copyright);
    formdata.append("trailer", data.trailer);
    formdata.append("image", data.image);
    // formdata.append('file', data.file[0]);
    formdata.append("typeId", data.typeId);
    formdata.append("categorymain", data.categorymain);
    formdata.append("dailyMotionServer", data.dailyMotionServer);
    formdata.append("link", data.link);
    formdata.append("imageLink", data.image);
    formdata.append("view", data.view);
    formdata.append("server2", data.server2);
    const res = await dispatch(editProduct(formdata));
    if (res?.meta?.requestStatus == "fulfilled") {
      toast.success(`Edit ${data.name} Success`);
    }
  };
  const handleSubmitServerAssb = async (data: any) => {
    try {
      const formdata = new FormData();
      formdata.append("fileupload", data.fileupload);
      const res = await UploadAssby(id, formdata);
      if (res) {
        toast.success(`${data.name} Susscessfully Uploaded`);
        setIsLoading(true);
      }
    } catch (error) {
      toast.success(`${data.name} Failer Uploaded`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <PageTitle
        title={`Edit Episode: ${state?.name + " tập " + state?.seri}`}
        subtitle="Edit Episode Description"
      />
      <MVTitle level={4} className="mb-4 text-lg font-semibold">
        <MVLink
          to={`/d/${state?.slug}`}
          className="text-blue-500 hover:underline"
        >
          {state?.name + " tập " + state?.seri}
        </MVLink>
      </MVTitle>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
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
        <MVInput
          name={"LinkCopyright"}
          label={"LinkCopyright"}
          control={control}
          className="w-full"
        />
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

        <div className=" w-36">
          <MVImage
            src={handleImage(200, state?.category?.linkImg)}
            className="object-cover rounded-md shadow-sm"
          />
        </div>

        <MVUpload
          name={"image"}
          label={"New Image Upload"}
          control={control}
          className="w-full mt-4"
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
          options={data?.map((item) => ({ label: item.name, value: item._id }))}
          className="w-full mt-4"
        />

        <MySelectWrapper
          name={"typeId"}
          label={"Thể loại của phim lẻ"}
          control={control}
          defaultValue={"Thể loại"}
          options={seri?.map((item) => ({ label: item.name, value: item._id }))}
          className="w-full mt-4"
        />

        <MyButton htmlType="submit">Submit</MyButton>
      </form>

      <Dividers textColor={"#000"} orientation={"center"} className="mt-8">
        Abyss Server
      </Dividers>

      <form
        onSubmit={handleSubmit(handleSubmitServerAssb)}
        className="space-y-4 mt-4"
      >
        <MVUpload
          name={"fileupload"}
          label={"New Video Upload"}
          control={control}
          className="w-full"
        />
        <MyButton loading={isLoading} htmlType="submit">
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default EditProduct;
