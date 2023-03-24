import intances from "./instances"
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';
export const getAllComment = async () => {
  return await intances.get('/comments');
}

export const addComment = async (id, data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.post(`/comment/${id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteComent = async (id) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.delete(`/comment/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}