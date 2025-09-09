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
    dispatch(getAllcate({ page: 0 }));
  }, []);

  const categoryOptions = data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const typeOptions = seri?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("category", data.category);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Create Episode" 
          subtitle="Create Episode Description" 
        />
        
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <MVInput
                    name="name"
                    label="Product Name"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="view"
                    label="View"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="seri"
                    label="Seri"
                    control={control}
                    
                    className="w-full"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Copyright Information</h3>
                <div className="space-y-4">
                  <MVInput
                    name="copyright"
                    label="Copyright"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="LinkCopyright"
                    label="Link Copyright"
                    control={control}
                    
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Media Links</h3>
                <div className="space-y-4">
                  <MVInput
                    name="dailyMotionServer"
                    label="DailyMotion Server"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="trailer"
                    label="Trailer Video"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="video2"
                    label="Video Link"
                    control={control}
                    
                    className="w-full"
                  />
                  
                  <MVInput
                    name="imageLink"
                    label="Image Link"
                    control={control}
                    
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-4">
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
                  label="Category Donghua"
                  control={control}
                  placeholder="Select a type"
                  options={typeOptions}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Upload</h3>
              <MVUpload 
                name="image" 
                label="New Image Upload" 
                control={control} 
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <MyButton
              htmlType="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit
            </MyButton>
            
            {idProduct && (
              <MVLink to={`/dashboard/product/edit/${idProduct}`}>
                <MyButton 
                  type="text" 
                  danger 
                  shape="circle"
                  className="hover:bg-red-50 transition-colors duration-300"
                >
                  <EditOutlined className="text-lg" />
                </MyButton>
              </MVLink>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
