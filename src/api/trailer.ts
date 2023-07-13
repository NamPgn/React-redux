import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import { Itraier } from "../interfaces/trailer";


export const getTrailerUrl = async () => {
  return await intances.get(`/trailer`);
}
const dataToken = isAuthentication();
export const editTrailer = async (data: Itraier) => {
  return await intances.put(`/trailer/${data._id}/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}
export const createTrailer = async (data: any) => {
  return await intances.post(`/trailer/${data._id}/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}