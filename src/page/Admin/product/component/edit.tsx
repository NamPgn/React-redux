import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  editProduct,
  getProduct,
} from "../../../../redux/slice/product/thunkProduct/product";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch } from "../../../../hook";
import { MyContext } from "../../../../context";
import { MySelectWrapper } from "../../../../components/Form/component";
import { UploadAssby } from "../../../../sevices/product";
import { MyButton } from "../../../../components/MV/Button";
import Dividers from "../../../../components/MV/Divider";
import MVUpload from "../../../../components/MV/Upload";
import MVInput from "../../../../components/MV/Input";
import MVLink from "../../../../components/Location/Link";
import MVTitle from "../../../../components/MV/Title";
declare var Promise: any;
const Divstyled = styled.div``;
const EditProduct = () => {
  const { categorymain, category, seri }: any = useContext(MyContext);
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
    formdata.append("seri", data.seri);
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
    const res = await dispatch(editProduct(formdata));
    if (res.payload.success) {
      toast.success(`Sửa ${data.name} công`);
    }
  };
  const handleSubmitServerAssb = async (data: any) => {
    const formdata = new FormData();
    formdata.append("fileupload", data.fileupload);
    const res = await UploadAssby(id, formdata);
    if (res) {
      toast.success(`${data.name} susscessfully uploaded`);
    }
  };
  return (
    <Divstyled>
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
        <Divstyled style={{ width: "150px", height: "200px" }}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={
              state.image == undefined || null
                ? "https://firebasestorage.googleapis.com/v0/b/mystorage-265d8.appspot.com/o/image%2Fdau-pha-thuong-khung-ova-3-hen-uoc-3-nam-856.jpg?alt=media&token=dca80d37-bb85-41a0-9fd5-c6e949e1db54"
                : state.image
            }
            alt=""
          />
        </Divstyled>
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
          placeholder={"category"}
          defaultValue={"category"}
          style={{ width: 300 }}
          options={
            category &&
            category?.data.map((item, index) => ({
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
          placeholder={"Thể loại"}
          defaultValue={"Thể loại"}
          style={{ width: 300 }}
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
        <MySelectWrapper
          control={control}
          name={"Thể loại của danh mục thể loại gồm các danh mục con"}
          label={"Categorymain"}
          placeholder={"categorymain"}
          defaultValue={"categorymain"}
          style={{ width: 300 }}
          options={
            categorymain &&
            categorymain?.map((item, index) => ({
              label: item.name,
              value: item._id,
            }))
          }
        />
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
          label={"New Image Upload"}
          control={control}
        />
        <div className="mt-2">
          <MyButton htmlType="submit" className="btn btn-primary">
            Submit
          </MyButton>
        </div>
      </form>
    </Divstyled>
  );
};

export default EditProduct;