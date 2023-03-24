import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';

export const getTrailerUrls = async () => {

  return await intances.get(`/trailerUrl`)
};
export const getTrailerUrl = async (id) => {
  return await intances.get(`/trailerUrl/${id}`);
}
export const editTrailer = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.put(`/trailerUrl/${data._id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}