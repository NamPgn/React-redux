import { getAllcategory, getCategoryProduct } from "./api/category";
import { getAllcate } from "./redux/slice/category/ThunkCategory/category";

export const filterCate = (states, id) => {
  const data = states.find(item => item._id === id);
  return data
}


//get category product
export const getCateProduct = async () => {
  const { data } = await getCategoryProduct();
  return data;
}


//get category
export const Cate = async () => {
  const { data } = await getAllcategory();
  return data;
}

export const urlSwr = 'https://test-19k8.onrender.com/api';