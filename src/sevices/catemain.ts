import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const token = isAuthentication();
export const deleteCategoryType = async (id: any) =>
  await intances.delete(`/bigcategory/content/${id}/${token.user._id}`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

export const addCategoryType = async (data: any) =>
  await intances.post(`/bigcategory/content/${token.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

export const updateCategoryType = async (id, data: any) =>
  await intances.put(`/bigcategory/content/${id}/${token.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
