import { isAuthentication } from "../auth/getToken";
import { IProduct } from "../interfaces/product";
import intances, { URL_SERVER_RENDER } from "./instances";
declare var Promise: any;
const dataToken = isAuthentication();
export const getAllProduct = async (page): Promise<IProduct> => {
  return await intances.get(`products?page=${page}`);
};

export const getOneProduct = async (id: string): Promise<IProduct> => {
  return await intances.get(`product/${id}`);
};

export const deleteProductById = async (id: string): Promise<IProduct> => {
  return await intances.delete(`/product/${id}/${dataToken.user._id}`, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const addProductData = async (data: IProduct): Promise<IProduct> => {
  return await intances.post(`/product/${dataToken.user._id}`, data, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

export const editProductData = async (data: any): Promise<IProduct> => {
  return await intances.put(
    `/product/${data.get("_id")}/${dataToken.user._id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const importData = async (data: any): Promise<IProduct> => {
  return await intances.post(`/products/creating`, data, {
    // headers: {
    //   Authorization: `Bearer ${dataToken.token}`,
    // },
  });
};

export const deleteMultipleProduct = async (id: string): Promise<IProduct> =>
  await intances.post(`/products/deleteMultiple/${dataToken.user._id}`, id, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });

export const getAllProductsByCategory = async (id: string): Promise<IProduct> =>
  await intances.get(`/category/products/${id}`);

export const pushListData = async (
  id: string,
  typeId: string | any
): Promise<IProduct> =>
  await intances.post(`/product/pushlist/${id}/${dataToken.user._id}`, typeId, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });

export const UploadAssby = async (id: any, body: any): Promise<IProduct> =>
  await URL_SERVER_RENDER.post(
    `/product/abyss/${id}/${dataToken.user._id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

export const approveProduct = async (id: any) =>
  await intances.post(`/product/approve/${id}/${dataToken.user._id}`, null, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });

export const cancelApproveProduct = async (id: any) =>
  await intances.post(
    `/product/approve/cancel/${id}/${dataToken.user._id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

export const filterProductByCategory = async (categoryId) => {
  return await intances.get(`/product/filter?c=${categoryId}`);
};

export const searchProduct = async (val: any) => {
  return await intances.get(`/product/v?name=${val}`);
};

export const clearCacheProducts = async () => {
  return await intances.post(`/products/clear/${dataToken.user._id}`, null, {
    headers: {
      Authorization: `Bearer ${dataToken.token}`,
    },
  });
};

// export const ratingProduct = async (productId, data: any) => {
//   return await intances.post(`/product/rating/${productId}`, data);
// };

// export const ratingProductStats = async (productId) => {
//   return await intances.get(`/product/rate/${productId}`);
// };
