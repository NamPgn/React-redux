import intances from "./instances"
import { isAuthentication } from "../auth/getToken";
import { Icommented } from "../interfaces/comment";
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllComment = async (): Promise<Icommented[]> => {
  return await intances.get('/comments');
}

export const addComment = async (id: any, data: any): Promise<Icommented> => {
  return await intances.post(`/comment/${id}/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteComent = async (id: any): Promise<Icommented> => {
  return await intances.delete(`/comment/${id}/${dataToken.user._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}