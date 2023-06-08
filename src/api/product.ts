import { isAuthentication } from "../auth/getToken";
import { IProduct } from "../interfaces/product";
import intances from "./instances"
import jwtDecode from 'jwt-decode';
declare var Promise: any;
export const getAllProduct = async (): Promise<IProduct> => {
  return await intances.get(`products`);
}

export const getOneProduct = async (id: string): Promise<IProduct> => {
  return await intances.get(`product/${id}`)
}

export const deleteProductById = async (id: string): Promise<IProduct> => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.delete(`/product/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const addProductData = async (data: IProduct): Promise<IProduct> => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.post(`/product/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const editProductData = async (data: any): Promise<IProduct> => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.put(`/product/${data.get('_id')}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const importData = async (data: any): Promise<IProduct> => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.post(`/product/creating/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteMultipleProduct = async (id: string): Promise<IProduct> => {
  const dataToken = isAuthentication();
  const tokenDecode: { _id: any } = jwtDecode(dataToken.token);
  return await intances.post(`/product/deleteMultiple/${tokenDecode._id}`, id, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}


export const getAllProductsByCategory = async (id: string): Promise<IProduct> => {
  return await intances.get(`/category/products/${id}`);
}

export const pushListData = async (id: string, typeId: string | any): Promise<IProduct> => {
  return await intances.post(`/product/pushlist/${id}`, typeId);
}
