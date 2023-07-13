import { isAuthentication } from "../auth/getToken";
import { IProduct } from "../interfaces/product";
import intances from "./instances"
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllProduct = async (page): Promise<IProduct> => {
  return await intances.get(`products?page=${page}`);
}

export const getOneProduct = async (id: string): Promise<IProduct> => {
  return await intances.get(`product/${id}`)
}

export const deleteProductById = async (id: string): Promise<IProduct> => {
  return await intances.delete(`/product/${id}/${dataToken.user._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const addProductData = async (data: IProduct): Promise<IProduct> => {
  return await intances.post(`/product/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const editProductData = async (data: any): Promise<IProduct> => {
  return await intances.put(`/product/${data.get('_id')}/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const importData = async (data: any): Promise<IProduct> => {
  return await intances.post(`/product/creating/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteMultipleProduct = async (id: string): Promise<IProduct> => await intances.post(`/product/deleteMultiple/${dataToken.user._id}`, id, {
  headers: {
    "Authorization": `Bearer ${dataToken.token}`
  }
});

export const getAllProductsByCategory = async (id: string): Promise<IProduct> => await intances.get(`/category/products/${id}`);


export const pushListData = async (id: string, typeId: string | any): Promise<IProduct> => await intances.post(`/product/pushlist/${id}`, typeId);


export const UploadAssby = async (id: any, body: any): Promise<IProduct> => await intances.post(`/product/server2/${id}`, body);
