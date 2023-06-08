import intances from "./instances"
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';
import { Icommented } from "../interfaces/comment";
declare var Promise: any;
export const getAllComment = async (): Promise<Icommented[]> => {
  return await intances.get('/comments');
}

export const addComment = async (id: any, data: any): Promise<Icommented> => {
  const dataToken = isAuthentication();
  const tokenDecode: any = jwtDecode(dataToken.token);
  return await intances.post(`/comment/${id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteComent = async (id: any): Promise<Icommented> => {
  const dataToken = isAuthentication();
  const tokenDecode: any = jwtDecode(dataToken.token);
  return await intances.delete(`/comment/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}