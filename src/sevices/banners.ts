import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const Auth = isAuthentication();
export const uploadBanner = async (data: any): Promise<any> => {
  await intances.post(`/banner/upload`, data);
};

export const getBanners = async (): Promise<any> => {
  return await intances.get(`/banners`);
};

export const deleteBanners = async (id: any): Promise<any> => {
  return await intances.delete(`/banner/${id}`);
};

export const updateBanners = async (id: any, data: any): Promise<any> => {
  return await intances.put(`/banner/${id}`, data);
};
