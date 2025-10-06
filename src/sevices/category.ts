import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import { Icategory } from "../interfaces/category";
import { CATEGORY_ENDPOINTS} from "../constants/category";
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllcategoryVersion2 = async (page: number, search?: string, version?: string): Promise<Icategory[]> => {
  let url = `${CATEGORY_ENDPOINTS.BASE}?page=${page}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }
  if (version && version.trim()) {
    url += `&version=${encodeURIComponent(version.trim())}`;
  }
  return await intances.get(url);
};

export const getAllCategory____ = async (page: number, search?: string, version?: string): Promise<Icategory[]> => {
  let url = `${CATEGORY_ENDPOINTS.ALL}?page=${page}`;
  if (search && search.trim()) {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }
  if (version && version.trim()) {
    url += `&version=${encodeURIComponent(version.trim())}`;
  }
  
  return await intances.get(url);
};

export const getCategory = async (id: string): Promise<Icategory> => {
  return await intances.get(`${CATEGORY_ENDPOINTS.CREATE}/${id}`);
};

export const addCate = async (data: any): Promise<Icategory> => {
  return await intances.post(`${CATEGORY_ENDPOINTS.CREATE}/${dataToken.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const deleteCate = async (id: any): Promise<Icategory> => {
  return await intances.delete(`${CATEGORY_ENDPOINTS.DELETE}/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const updateCate = async (data: any): Promise<Icategory> => {
  return await intances.post(
    `${CATEGORY_ENDPOINTS.UPDATE}/${data.get("_id")}/${dataToken.user._id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const getCategoryProduct = async () => {
  return await intances.get(`${CATEGORY_ENDPOINTS.CREATE}/products`);
};

export const getAllCategoryNotReq = async (id: string) => {
  return await intances.get(`${CATEGORY_ENDPOINTS.CREATE}/getAllCategoryNotRequest/${id}`);
};

export const searCategory = async (data: any) => {
  return await intances.get(`${CATEGORY_ENDPOINTS.BASE}/search?value=${data}`);
};

export const ratingCategory = async (categoryId, data: any) => {
  return await intances.post("rating/" + categoryId, data);
};

export const ratingProduct = async (categoryId, data: any) => {
  return await intances.post(`rating/${categoryId}`, data);
};

export const changeLatest = async (data: any) => {
  return await intances.post(`category/changeLatest`, data);
};

export const getRecycleBin = async () => {
  return await intances.get(CATEGORY_ENDPOINTS.RECYCLE_BIN, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const restoreCategory = async (id: string) => {
  return await intances.post(`${CATEGORY_ENDPOINTS.RESTORE}/${id}/${dataToken.user._id}`, {}, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const permanentlyDeleteCategory = async (id: string) => {
  return await intances.delete(`${CATEGORY_ENDPOINTS.PERMANENT_DELETE}/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const changeIsActiveCategory = async (slug: string, isActive: boolean) => {
  return await intances.post(`${CATEGORY_ENDPOINTS.TOGGLE_ACTIVE}/${slug}/${dataToken.user._id}`, { isActive }, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};