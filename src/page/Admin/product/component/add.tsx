import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addProduct } from "../../../../redux/slice/product/thunk/product";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { MySelectWrapper } from "../../../../components/Form/component/select";
import { MyButton } from "../../../../components/MV/Button";
import MVUpload from "../../../../components/MV/Upload";
import MVInput from "../../../../components/MV/Input";
import MVLink from "../../../../components/Location/Link";
import { EditOutlined } from "@ant-design/icons";
import { ApiContext } from "../../../../context/api";
import { getAllcate } from "../../../../redux/slice/category/thunk/category";
import PageTitle from "../../../../components/PageTitle";
const ProductAdd = () => {
  const { seri }: any = useContext(ApiContext);
  const { data }: any = useAppSelector((state) => state.category.category);
  const [idProduct, setIdProduct] = useState("");
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm();
  useEffect(() => {
    dispatch(getAllcate(0));
  }, []);
  const categoryOptions =
    data &&
    data.map((item, index) => ({
      label: item.name,
      value: item._id,
    }));

  // const categorymainOptions =
  //   categorymain &&
  //   categorymain?.map((item, index) => ({
  //     label: item.name,
  //     value: item._id,
  //   }));

  const typeOptions =
    seri &&
    seri?.map((item, index) => ({
      label: item.name,
      value: item._id,
    }));
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("category", data.category);
    // formdata.append('file', data.file[0]);
    formdata.append("seri", data.seri);
    formdata.append("LinkCopyright", data.LinkCopyright);
    formdata.append("copyright", data.copyright);
    formdata.append("trailer", data.trailer);
    formdata.append("image", data.image);
    formdata.append("typeId", data.typeId);
    formdata.append("categorymain", data.categorymain);
    formdata.append("dailyMotionServer", data.dailyMotionServer);
    formdata.append("imageLink", data.imageLink);
    formdata.append("video2", data.video2);
    const res = await dispatch(addProduct(formdata));
    setIdProduct(res?.payload?.data?._id);
    if (res.payload.success === true) {
      toast.success("Add product Successfully");
    } else {
      toast.error("Add product failed");
    }
  };
  return (
    <div>
       <PageTitle
        title={`Create Episode`}
        subtitle="Create Episode Description"
      />
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-4">Episode Create</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MVInput
            name="name"
            label="Product Name"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="view"
            label="View"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="seri"
            label="Seri"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="copyright"
            label="Copyright"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="LinkCopyright"
            label="Link Copyright"
            control={control}
            rules={undefined}
            className="w-full"
          />
        </div>

        <div className="mt-4">
          <MVUpload name="image" label="New Image Upload" control={control} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <MVInput
            name="dailyMotionServer"
            label="DailyMotion Server"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="trailer"
            label="Trailer Video"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="video2"
            label="Video Link"
            control={control}
            rules={undefined}
            className="w-full"
          />
          <MVInput
            name="imageLink"
            label="Image Link"
            control={control}
            rules={undefined}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <MySelectWrapper
            control={control}
            name="category"
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            className="w-full"
          />
          <MySelectWrapper
            name="typeId"
            label="Cateogory Donghua"
            control={control}
            placeholder="Select a type"
            options={typeOptions}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <MyButton
            htmlType="submit"
            className="btn btn-primary w-full sm:w-auto"
          >
            Submit
          </MyButton>
          <MVLink to={`/dashboard/product/edit/${idProduct}`}>
            <MyButton type="text" danger shape="circle">
              <EditOutlined />
            </MyButton>
          </MVLink>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
