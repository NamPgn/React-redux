import { getAllcategory, getCategoryProduct } from "./api/category";
import { Icategory } from "./interfaces/category";

export const filterCate = (states: any, id: any) => {
  const data = states.find((item: any) => item._id == id);
  return data
}


//get category product
export const getCateProduct = async () => {
  const { data } = await getCategoryProduct();
  return data;
}


//get category
export const Cate = async () => {
  const { data }: any = await getAllcategory();
  return data;
}

export const urlSwr = 'https://test-19k8.onrender.com/api';