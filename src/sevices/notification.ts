import axios from "axios";
import intances from "./instances";
import { isAuthentication } from "../auth/getToken";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const getAuthHeader = () => {
  const token = isAuthentication();
  return token ? { Authorization: `Bearer ${token.token}` } : {};
};

export interface Notification {
  _id: string;
  title: string;
  body: string;
  categoryId: {
    _id: string;
    name: string;
    slug: string;
  };
  categorySlug: string;
  productId?: {
    _id: string;
    name: string;
    seri: string;
    slug: string;
  };
  productSlug?: string;
  episodeNumber?: number;
  sentAt: Date;
  sentBy?: {
    _id: string;
    username: string;
    email: string;
  };
  totalRecipients: number;
  successCount: number;
  failureCount: number;
  status: "pending" | "sent" | "failed" | "partial";
  platform?: string;
  data?: any;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationStats {
  byStatus: Array<{
    _id: string;
    count: number;
    totalRecipients: number;
    successCount: number;
    failureCount: number;
  }>;
  summary: {
    totalNotifications: number;
    totalRecipients: number;
    totalSuccess: number;
    totalFailures: number;
    successRate: string;
  };
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  status?: "pending" | "sent" | "failed" | "partial";
  categoryId?: string;
  categorySlug?: string;
  startDate?: string;
  endDate?: string;
}

// Lấy danh sách notifications
export const getNotifications = async (params: GetNotificationsParams = {}) => {
  const { data } = await intances.get(`/notifications`, {
    params,
    headers: getAuthHeader(),
  });
  return data;
};

// Lấy latest notifications
export const getLatestNotifications = async (limit = 10) => {
  const { data } = await intances.get(`/notifications/latest`, {
    params: { limit },
    headers: getAuthHeader(),
  });
  return data;
};

// Lấy thống kê
export const getNotificationStats = async (startDate?: string, endDate?: string) => {
  const { data } = await intances.get(`/notifications/stats`, {
    params: { startDate, endDate },
    headers: getAuthHeader(),
  });
  return data;
};

// Lấy notification by ID
export const getNotificationById = async (id: string) => {
  const { data } = await intances.get(`/notifications/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
};

// Lấy notifications by category slug
export const getNotificationsByCategorySlug = async (slug: string, limit = 50) => {
  const { data } = await intances.get(`/notifications/category-slug/${slug}`, {
    params: { limit },
  });
  return data;
};

// Kiểm tra đã gửi notification chưa
export const checkNotificationExists = async (categorySlug: string, episodeNumber: number) => {
  const { data } = await intances.get(
    `${API_BASE_URL}/notifications/check/${categorySlug}/${episodeNumber}`,
    {
      headers: getAuthHeader(),
    }
  );
  return data;
};

// Resend notification
export const resendNotification = async (id: string) => {
  const { data } = await axios.post(
    `${API_BASE_URL}/notifications/${id}/resend`,
    {},
    {
      headers: getAuthHeader(),
    }
  );
  return data;
};

// Xóa notification
export const deleteNotification = async (id: string) => {
  const { data } = await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
};

// Xóa nhiều notifications
export const deleteMultipleNotifications = async (ids: string[]) => {
  const { data } = await axios.delete(`${API_BASE_URL}/notifications/bulk/delete`, {
    data: { ids },
    headers: getAuthHeader(),
  });
  return data;
};

