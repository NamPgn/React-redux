import intances from "./instances"
import { isAuthentication } from "../auth/getToken";
import jwtDecode from 'jwt-decode';

export const getAllProduct = async () => {
  return await intances.get('products');
}

export const getOneProduct = async (id) => {
  return await intances.get(`product/${id}`)
}

export const deleteProductById = async (id) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.delete(`/product/${id}/${tokenDecode._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const addProductData = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.post(`/product/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const editProductData = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.put(`/product/${data.get('_id')}/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const importData = async (data) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.post(`/product/creating/${tokenDecode._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}

export const deleteMultipleProduct = async (id) => {
  const dataToken = isAuthentication();
  const tokenDecode = jwtDecode(dataToken.token);
  return await intances.post(`/product/deleteMultiple/${tokenDecode._id}`, id, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  });
}


export const getAllProductsByCategory = async (id) => {
  return await intances.get(`/category/products/${id}`);
}

