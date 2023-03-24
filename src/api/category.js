import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';
export const getAllcategory = async () => {
  return await intances.get(`/categorys`);
}

export const getCategory = async (id) => {
  return await intances.get(`/category/${id}`);
}

export const addCate = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.post(`/category/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}

export const deleteCate = async (id) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.delete(`/category/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}


export const updateCate = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.put(`/category/${data._id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}

export const getCategoryProduct = async () => {
  return await intances.get('/category/products');
}

export const getAllCategoryNotReq = async (id) => {
  return await intances.get('/category/getAllCategoryNotRequest/' + id)
}

export const searCategory = async (data) => {
  return await intances.get(`/products/search?value=${data}`);
}