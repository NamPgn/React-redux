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
      reset(payload);
      setState(payload);
    };
    getFormProduct();
  }, []);
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("options", data.options);
    formdata.append("category", data.category);
    formdata.append("_id", id);
    formdata.append("seri", data.seri);
    formdata.append("LinkCopyright", data.LinkCopyright);
    formdata.append("copyright", data.copyright);
    formdata.append("descriptions", data.descriptions);
    formdata.append("trailer", data.trailer);
    formdata.append("image", data.image);
    // formdata.append('file', data.file[0]);
    formdata.append("year", data.year);
    formdata.append("country", data.country);
    formdata.append("typeId", data.typeId);
    formdata.append("categorymain", data.categorymain);
    formdata.append("dailyMotionServer", data.dailyMotionServer);
    formdata.append("link", data.link);
    formdata.append("imageLink", data.image);
    formdata.append("view", data.view);
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
    <div>
      <MVTitle level={4}>
        <MVLink to={`/d/${state._id}?c=${state.category?._id}`}>
          {state.name + " tập " + state.seri}
        </MVLink>
      </MVTitle>
      <form onSubmit={handleSubmit(onsubmit)}>
        <MVInput
          name={"name"}
          label={"Product name"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"seri"}
          label={"Seri"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"view"}
          label={"View"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"descriptions"}
          label={"Desciption"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"LinkCopyright"}
          label={"LinkCopyright"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"link"}
          label={"Video Url"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"dailyMotionServer"}
          label={"DailyMotionServer"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"server2"}
          label={"Assb server"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"trailer"}
          label={"Trailer Video"}
          control={control}
          rules={undefined}
        />
        <div style={{ width: "150px", height: "200px" }}>
          <MVImage
            src={handleImage(200, state?.category?.linkImg)}
            className="w-full h-full"
          />
        </div>
        <br />
        {/* <MyUploadWrapper
          name={'file'}
          label={'New Video Upload'}
          control={control}
        /> */}
        <MVUpload name={"image"} label={"New Image Upload"} control={control} />
        <MVInput
          name={"year"}
          label={"Year"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"country"}
          label={"country"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"options"}
          label={"Options"}
          control={control}
          rules={undefined}
        />
        <MVInput
          name={"imageLink"}
          label={"Image Link"}
          control={control}
          rules={undefined}
        />

        {/** Thể loại của phim tập*/}
        <MySelectWrapper
          label={"Category"}
          control={control}
          name={"category"}
          defaultValue={"category"}
          options={
            data &&
            data.map((item, index) => ({
              label: item.name,
              value: item._id,
            }))
          }
        />
        <br />
        {/** Thể loại của phim lẻ phim bộ 1 tập */}
        <MySelectWrapper
          name={"typeId"}
          label={"Thể loại của phim lẻ"}
          control={control}
          defaultValue={"Thể loại"}
          options={
            seri &&
            seri?.map((item, index) => ({
              label: item.name,
              value: item._id,
            }))
          }
        />
        <br />
        {/** Thể loại của danh mục thể loại gồm các danh mục con */}
        {/* <MySelectWrapper
          control={control}
          name={"Thể loại của danh mục thể loại gồm các danh mục con"}
          label={"Categorymain"}
          placeholder={"categorymain"}
          defaultValue={"categorymain"}
          options={
            categorymain &&
            categorymain?.map((item, index) => ({
              label: item.name,
              value: item._id,
            }))
          }
        /> */}
        <br />
        <MyButton htmlType="submit" className="btn btn-primary mt-2">
          Submit
        </MyButton>
      </form>
      <Dividers textColor={"#000"} orientation={"center"}>
        Abyss Server
      </Dividers>
      <form onSubmit={handleSubmit(handleSubmitServerAssb)}>
        <MVUpload
          name={"fileupload"}
          label={"New Video Upload"}
          control={control}
        />
        <div className="mt-2">
          <MyButton
            loading={isLoading}
            htmlType="submit"
            className="btn btn-primary"
          >
            Submit
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
