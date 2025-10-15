import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import { Icategory } from "../interfaces/category";
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllcategory = async (page: number, search?: string, version?: string): Promise<Icategory[]> => {
  let url = `/categorys?page=${page}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }
  if (version && version.trim()) {
    url += `&version=${encodeURIComponent(version.trim())}`;
  }
  return await intances.get(url);
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
  return await intances.post(
    `/category/${data.get("_id")}/${dataToken.user._id}`,
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
  return await intances.get(`/categorys/search?value=${data}`);
};

export const ratingCategory = async (categoryId, data: any) => {
  return await intances.post("/rating/" + categoryId, data);
};

export const ratingProduct = async (categoryId, data: any) => {
  return await intances.post(`/rating/${categoryId}`, data);
};

export const changeLatest = async (data: any) => {
  return await intances.post(`/category/changeLatest`, data);
};

export const getRecycleBin = async () => {
  return await intances.get("/c/recycle", {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const restoreCategory = async (id: string) => {
  return await intances.post(`/category/restore/${id}/${dataToken.user._id}`, {}, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const permanentlyDeleteCategory = async (id: string) => {
  return await intances.delete(`/category/permanent-delete/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const changeIsActiveCategory = async (slug: string, isActive: boolean) => {
  return await intances.post(`/category/change/isActive/${slug}/${dataToken.user._id}`, { isActive }, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};