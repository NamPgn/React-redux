import intances from "./instances";
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';
import { Icategory } from "../interfaces/category";
declare var Promise: any;
export const getAllcategory = async (): Promise<Icategory[]> => {
  return await intances.get(`/categorys`);
}

export const getCategory = async (id: string): Promise<Icategory> => {
  return await intances.get(`/category/${id}`);
}

export const addCate = async (data: any): Promise<Icategory> => {
  const dataToken = isAuthentication();
  const tokenDecode: any = jwtDecode(dataToken.token);
  return await intances.post(`/category/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}

export const deleteCate = async (id: any): Promise<Icategory> => {
  const dataToken = isAuthentication();
  const tokenDecode: any = jwtDecode(dataToken.token);
  return await intances.delete(`/category/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}


export const updateCate = async (data:any): Promise<Icategory> => {
  const dataToken = isAuthentication();
  const tokenDecode:any = jwtDecode(dataToken.token);
  return await intances.put(`/category/${data._id}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}

export const getCategoryProduct = async () => {
  return await intances.get('/category/products');
}

export const getAllCategoryNotReq = async (id:string) => {
  return await intances.get('/category/getAllCategoryNotRequest/' + id)
}

export const searCategory = async (data:any) => {
  return await intances.get(`/products/search?value=${data}`);
}