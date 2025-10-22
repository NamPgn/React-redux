import axios from "axios";
import { toast } from "react-toastify";
import intances from "./instances";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
  token?: string; // Optional: gửi đến 1 device cụ thể
}

export const getDevices = async (page = 1, limit = 20) => {
  const { data } = await intances.get(`/push-notification/devices`, {
    params: { page, limit },
  });
  return data;
};


/**
 * Gửi test notification (cần admin token)
 */
export const sendTestNotification = async (
  payload: NotificationPayload,
  adminToken: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/push-notification/test`,
      payload,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error sending test notification:", error);
    throw error;
  }
};

/**
 * Gửi notification KHÔNG CẦN LOGIN (dùng SECRET_KEY)
 * Dùng từ scripts, automation, webhook
 */
export const sendNotificationWithSecret = async (payload: {
  secretKey: string;
  title?: string;
  body?: string;
  token?: string;
  data?: any;
  type?: "new_episode" | "new_category";
  categoryName?: string;
  categorySlug?: string;
  episode?: string | number;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notification/send`,
      payload
    );
    return response.data;
  } catch (error: any) {
    console.error("Error sending notification with secret:", error);
    throw error;
  }
};

/**
 * Get all active push tokens (admin only)
 */
export const getActivePushTokens = async (
  page = 1,
  limit = 20,
  adminToken: string
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/push-tokens`, {
      params: { page, limit },
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching push tokens:", error);
    throw error;
  }
};

/**
 * Cleanup inactive tokens (admin only)
 */
export const cleanupInactiveTokens = async (
  days = 30,
  adminToken: string
) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/push-tokens/cleanup`, {
      params: { days },
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error cleaning up tokens:", error);
    throw error;
  }
};

/**
 * Helper: Gửi notification cho episode mới
 * Dùng trong admin panel khi cần gửi manual
 */
export const sendNewEpisodeNotification = async (
  categoryName: string,
  episode: number,
  categorySlug: string,
  secretKey: string
) => {
  return await sendNotificationWithSecret({
    secretKey,
    type: "new_episode",
    categoryName,
    categorySlug,
    episode,
  });
};

/**
 * Helper: Gửi notification cho phim mới
 */
export const sendNewCategoryNotification = async (
  categoryName: string,
  categorySlug: string,
  secretKey: string
) => {
  return await sendNotificationWithSecret({
    secretKey,
    type: "new_category",
    categoryName,
    categorySlug,
  });
};

/**
 * Quick send notification with toast feedback
 */
export const quickSendNotification = async (
  title: string,
  body: string,
  options?: {
    token?: string;
    data?: any;
    adminToken?: string;
    secretKey?: string;
  }
) => {
  try {
    let response;

    if (options?.adminToken) {
      // Gửi qua admin API
      response = await sendTestNotification(
        {
          title,
          body,
          token: options.token,
          data: options.data,
        },
        options.adminToken
      );
    } else if (options?.secretKey) {
      // Gửi qua secret key API
      response = await sendNotificationWithSecret({
        secretKey: options.secretKey,
        title,
        body,
        token: options.token,
        data: options.data,
      });
    } else {
      throw new Error("adminToken hoặc secretKey là bắt buộc");
    }

    if (response.success) {
      toast.success("🔔 Notification đã được gửi!");
      return response;
    } else {
      toast.error("Gửi notification thất bại");
      return response;
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Không thể gửi notification");
    throw error;
  }
};

