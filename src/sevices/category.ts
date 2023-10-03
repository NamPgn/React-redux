import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import { Icategory } from "../interfaces/category";
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllcategory = async (): Promise<Icategory[]> => {
  return await intances.get(`/categorys`);
};

export const getCategory = async (id: string): Promise<Icategory> => {
  return await intances.get(`/category/${id}`);
};

export const addCate = async (data: any): Promise<Icategory> => {
  return await intances.post(`/category/${dataToken.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const deleteCate = async (id: any): Promise<Icategory> => {
  return await intances.delete(`/category/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const updateCate = async (data: any): Promise<Icategory> => {
  return await intances.put(
    `/category/${data._id}/${dataToken.user._id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const getCategoryProduct = async () => {
  return await intances.get("/category/products");
};

export const getAllCategoryNotReq = async (id: string) => {
  return await intances.get("/category/getAllCategoryNotRequest/" + id);
};

export const searCategory = async (data: any) => {
  return await intances.get(`/products/search?value=${data}`);
};
