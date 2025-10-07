import { isAuthentication } from "../auth/getToken";
import { IProduct } from "../interfaces/product";
import intances, { URL_SERVER_RENDER } from "./instances";
declare var Promise: any;
const dataToken = isAuthentication();

export const getAllProduct = async (page: number, categoryId?: string, seri?: string): Promise<IProduct> => {
  let url = `products?page=${page}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  if (seri) url += `&seri=${seri}`;
  return await intances.get(url);
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

export const addMultipleEpisodeMovie = async (data: any) => {
  return await intances.post(
    `/products/addMultiple/${dataToken.user._id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
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
  return await intances.post(`/products/create/excel`, data, {
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

export const clearCacheRedis = async () => {
  return await intances.post(
    `/products/clear/redis/bull`,
    null,
  );
};

export const approvedMultipleMovies = async (
  arrId: string
): Promise<IProduct> =>
  await intances.post(
    `/products/approvedMultiple/${dataToken.user._id}`,
    arrId,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

export const endcodeMutipleDailymotionServer = async (
  arrId: string
): Promise<IProduct> =>
  await intances.post(
    `/products/encodeMultipleDailymotionServer/${dataToken.user._id}`,
    arrId,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );

export const autoRenderEpisodeMovie = async () => {
  return await intances.post(
    `/products/autoAddEpisodeMovie/${dataToken.user._id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};
export const exportDataExcel = async () =>
  await intances.get(`/products/export/excel`);

export const editVoiceOverBySlug = async (slug: string, voiceOverLink: string, voiceOverLink2: string) => {
  return await intances.post(
    `/product/editVoiceOver/${slug}/${dataToken.user._id}`,
    { voiceOverLink, voiceOverLink2 },
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const getVoiceOverBySlug = async (slug: string) => {
  return await intances.get(`/product/getVoiceOver/${slug}`);
};

export const uploadProductThumbnailService = async (
  productId: string,
  file: File
) => {
  const form = new FormData();
  form.append("file", file);
  return await intances.post(
    `/product/${productId}/thumbnail/${dataToken.user._id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};

export const updateProductThumbnailService = async (
  productId: string,
  file: File
) => {
  const form = new FormData();
  form.append("file", file);
  return await intances.put(
    `/product/${productId}/thumbnail/${dataToken.user._id}`,
    form,
    {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    }
  );
};