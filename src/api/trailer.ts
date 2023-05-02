import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';
import { Itraier } from "../interfaces/trailer";

export const getTrailerUrls = async () => {
  return await intances.get(`/trailerUrl`)
};
export const getTrailerUrl = async (id: string) => {
  return await intances.get(`/trailerUrl/${id}`);
}
export const editTrailer = async (data: Itraier) => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.put(`/trailerUrl/${data._id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}