import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const dataToken = isAuthentication();
export const addWeeks = async (data: any) => {
  return await intances.post(`/week/${dataToken.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const removeWeeks = async (id: any) => {
  return await intances.delete(`/week/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const getCategoryByWeek = async (name: any) => {
  return await intances.get(`/week?w=${name}`);
};

export const deleteCategoryByWeek = async (id, body) => {
  return await intances.post(
    `/week/category/${id}/${dataToken.user._id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const insertManyCategoryFromWeek = async (id, body) => {
  return await intances.post(
    `/week/insertMany/${id}/${dataToken.user._id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};
