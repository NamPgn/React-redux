import intances from "./instances";
import { isAuthentication } from "../auth/getToken";

const dataToken = isAuthentication();

export const featureBannerApi = {
  // Lấy danh sách feature banners
  getFeatureBanners: async (isActive?: boolean) => {
    let url = `/feature-banners`;
    if (isActive !== undefined) {
      url += `?isActive=${isActive}`;
    }
    const response = await intances.get(url);
    return response.data;
  },

  // Lấy chi tiết một feature banner
  getFeatureBannerById: async (id: string) => {
    const response = await intances.get(`/feature-banner/${id}`);
    return response.data;
  },

  // Tạo feature banner mới
  createFeatureBanner: async (data: {
    categoryId: string;
    title?: string;
    description?: string;
    order?: number;
    isActive?: boolean;
  }) => {
    const response = await intances.post(`/feature-banner`, data, {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    });
    return response.data;
  },

  // Cập nhật feature banner
  updateFeatureBanner: async (
    id: string,
    data: {
      categoryId?: string;
      title?: string;
      description?: string;
      order?: number;
      isActive?: boolean;
    }
  ) => {
    const response = await intances.put(`/feature-banner/${id}`, data, {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    });
    return response.data;
  },

  // Xóa feature banner
  deleteFeatureBanner: async (id: string) => {
    const response = await intances.delete(`/feature-banner/${id}`, {
      headers: {
        Authorization: `Bearer ${dataToken.token}`,
      },
    });
    return response.data;
  },

  // Cập nhật thứ tự hiển thị
  updateFeatureBannerOrder: async (orders: Array<{ id: string; order: number }>) => {
    const response = await intances.put(
      `/feature-banners/update-order`,
      { orders },
      {
        headers: {
          Authorization: `Bearer ${dataToken.token}`,
        },
      }
    );
    return response.data;
  },

  // Bật/Tắt trạng thái
  toggleFeatureBannerStatus: async (id: string) => {
    const response = await intances.patch(
      `/feature-banner/${id}/toggle-status`,
      {},
      {
        headers: {
          Authorization: `Bearer ${dataToken.token}`,
        },
      }
    );
    return response.data;
  },
};

export default featureBannerApi;


