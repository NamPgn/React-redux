import { isAuthentication } from "../auth/getToken";
import { Iusers } from "../interfaces/user";
import intances from "./instances";
declare var Promise: any;
const Auth = isAuthentication();
export const resgister = async (data: any) => {
  return await intances.post("/signup", data);
};

export const login = async (data: any) => {
  return await intances.post("/signin", data);
};

export const getUser = async (): Promise<Iusers[]> => {
  return await intances.get("user");
};

export const getAuth = async (id: string): Promise<Iusers> => {
  return await intances.get("user_one/" + id);
};

export const deleteAuth = async (id: string): Promise<Iusers> => {
  return await intances.delete("removeUser/" + id + `/${Auth.user._id}`, {
    headers: {
      Authorization: `Bearer ${Auth.token}`,
    },
  });
};

export const editAuth = async (data: any): Promise<Iusers> => {
  return await intances.put(`user/${data._id}/${Auth.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${Auth.token}`,
    },
  });
};

export const importExcel = async (data: Iusers): Promise<Iusers> => {
  return await intances.post("user/creating", data);
};

export const findCartByUser = async (id: string): Promise<Iusers> =>
  await intances.get(`user/cart/${id}`);

export const editImageUser = async (id: any, data: any) =>
  await intances.post(`/user/upload/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Auth.token}`,
    },
  });

export const forgotPassword = async (data) => {
  return await intances.post("/forgot-password", data);
};

export const resetPassword = async (id, token, data) => {
  return await intances.post(`/reset-password/${id}/${token}`, data);
};

export const refreshTokenAuth = async (refreshToken: any) => {
  console.log(refreshToken)
  return await intances.post("/refreshToken", refreshToken);
};
