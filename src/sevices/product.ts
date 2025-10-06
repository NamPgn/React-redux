import { isAuthentication } from "../auth/getToken";
import { IProduct } from "../interfaces/product";
import intances, { URL_SERVER_RENDER } from "./instances";
import {
  PRODUCT_ENDPOINTS,
  PRODUCT_QUERY_PARAMS,
  HEADERS,
  BEARER_PREFIX,
  FORM_DATA_FIELDS,
  VOICE_OVER_FIELDS,
} from "../constants/product";
declare var Promise: any;
const dataToken = isAuthentication() || { user: { _id: '' }, token: '' };

export const getAllProduct = async (page: number, categoryId?: string, seri?: string, version?: string): Promise<IProduct> => {
  let url = `${PRODUCT_ENDPOINTS.BASE}?${PRODUCT_QUERY_PARAMS.PAGE}=${page}`;
  if (categoryId) url += `&${PRODUCT_QUERY_PARAMS.CATEGORY_ID}=${categoryId}`;
  if (seri) url += `&${PRODUCT_QUERY_PARAMS.SERI}=${seri}`;
  if (version) url += `&${PRODUCT_QUERY_PARAMS.VERSION}=${version}`;
  return await intances.get(url);
};

export const getOneProduct = async (id: string): Promise<IProduct> => {
  return await intances.get(`${PRODUCT_ENDPOINTS.SINGLE}/${id}`);
};

export const deleteProductById = async (id: string): Promise<IProduct> => {
  return await intances.delete(`${PRODUCT_ENDPOINTS.SINGLE}/${id}/${dataToken.user._id}`, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });
};

export const addMultipleEpisodeMovie = async (data: any) => {
  return await intances.post(
    `${PRODUCT_ENDPOINTS.ADD_MULTIPLE}/${dataToken.user._id}`,
    data,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};


export const addProductData = async (data: IProduct): Promise<IProduct> => {
  return await intances.post(`${PRODUCT_ENDPOINTS.CREATE}/${dataToken.user._id}`, data, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });
};

export const editProductData = async (data: any): Promise<IProduct> => {
  return await intances.put(
    `${PRODUCT_ENDPOINTS.UPDATE}/${data.get(FORM_DATA_FIELDS.ID)}/${dataToken.user._id}`,
    data,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};

export const importData = async (data: any): Promise<IProduct> => {
  return await intances.post(`${PRODUCT_ENDPOINTS.IMPORT_EXCEL}`, data, {
    // headers: {
    //   [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    // },
  });
};

export const deleteMultipleProduct = async (id: string): Promise<IProduct> =>
  await intances.post(`${PRODUCT_ENDPOINTS.DELETE_MULTIPLE}/${dataToken.user._id}`, id, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });

export const getAllProductsByCategory = async (id: string): Promise<IProduct> =>
  await intances.get(`${PRODUCT_ENDPOINTS.BY_CATEGORY}/${id}`);

export const pushListData = async (
  id: string,
  typeId: string | any
): Promise<IProduct> =>
  await intances.post(`${PRODUCT_ENDPOINTS.PUSH_LIST}/${id}/${dataToken.user._id}`, typeId, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });

export const UploadAssby = async (id: any, body: any): Promise<IProduct> =>
  await URL_SERVER_RENDER.post(
    `${PRODUCT_ENDPOINTS.UPLOAD_ABYSS}/${id}/${dataToken.user._id}`,
    body,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );

export const approveProduct = async (id: any) =>
  await intances.post(`${PRODUCT_ENDPOINTS.APPROVE}/${id}/${dataToken.user._id}`, null, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });

export const cancelApproveProduct = async (id: any) =>
  await intances.post(
    `${PRODUCT_ENDPOINTS.APPROVE_CANCEL}/${id}/${dataToken.user._id}`,
    null,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );

export const filterProductByCategory = async (categoryId) => {
  return await intances.get(`${PRODUCT_ENDPOINTS.FILTER}?${PRODUCT_QUERY_PARAMS.CATEGORY}=${categoryId}`);
};

export const searchProduct = async (val: any) => {
  return await intances.get(`${PRODUCT_ENDPOINTS.SEARCH}?${PRODUCT_QUERY_PARAMS.NAME}=${val}`);
};

export const clearCacheProducts = async () => {
  return await intances.post(`${PRODUCT_ENDPOINTS.CLEAR_CACHE}/${dataToken.user._id}`, null, {
    headers: {
      [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
    },
  });
};

export const clearCacheRedis = async () => {
  return   await intances.post(
    `${PRODUCT_ENDPOINTS.CLEAR_REDIS}`,
    null,
  );
};

export const approvedMultipleMovies = async (
  arrId: string
): Promise<IProduct> =>
  await intances.post(
    `${PRODUCT_ENDPOINTS.APPROVED_MULTIPLE}/${dataToken.user._id}`,
    arrId,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );

export const endcodeMutipleDailymotionServer = async (
  arrId: string
): Promise<IProduct> =>
  await intances.post(
    `${PRODUCT_ENDPOINTS.ENCODE_DAILYMOTION}/${dataToken.user._id}`,
    arrId,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );

export const autoRenderEpisodeMovie = async () => {
  return await intances.post(
    `${PRODUCT_ENDPOINTS.AUTO_ADD_EPISODE}/${dataToken.user._id}`,
    null,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};
export const exportDataExcel = async () =>
  await intances.get(`${PRODUCT_ENDPOINTS.EXPORT_EXCEL}`);

export const editVoiceOverBySlug = async (slug: string, voiceOverLink: string, voiceOverLink2: string) => {
  return await intances.post(
    `${PRODUCT_ENDPOINTS.EDIT_VOICE_OVER}/${slug}/${dataToken.user._id}`,
    { [VOICE_OVER_FIELDS.VOICE_OVER_LINK]: voiceOverLink, [VOICE_OVER_FIELDS.VOICE_OVER_LINK_2]: voiceOverLink2 },
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};

export const getVoiceOverBySlug = async (slug: string) => {
  return await intances.get(`${PRODUCT_ENDPOINTS.GET_VOICE_OVER}/${slug}`);
};

export const uploadProductThumbnailService = async (
  productId: string,
  file: File
) => {
  const form = new FormData();
  form.append(FORM_DATA_FIELDS.FILE, file);
  return await intances.post(
    `${PRODUCT_ENDPOINTS.UPLOAD_THUMBNAIL}/${productId}/thumbnail/${dataToken.user._id}`,
    form,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};

export const updateProductThumbnailService = async (
  productId: string,
  file: File
) => {
  const form = new FormData();
  form.append(FORM_DATA_FIELDS.FILE, file);
  return await intances.put(
    `${PRODUCT_ENDPOINTS.UPDATE_THUMBNAIL}/${productId}/thumbnail/${dataToken.user._id}`,
    form,
    {
      headers: {
        [HEADERS.AUTHORIZATION]: `${BEARER_PREFIX} ${dataToken.token}`,
      },
    }
  );
};

// Lấy tất cả episodes theo category và version
export const getAllEpisodesByCategoryAndVersion = async (categoryId: string, version?: string): Promise<IProduct> => {
  let url = `${PRODUCT_ENDPOINTS.BASE}/category/${categoryId}`;
  if (version) {
    url += `/version/${version}`;
  }
  return await intances.get(url);
};