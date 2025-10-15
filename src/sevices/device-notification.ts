import intances from "./instances";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

/**
 * Lấy device token từ localStorage
 * (Giả sử mobile app đã lưu token sau khi register)
 */
const getDeviceToken = (): string | null => {
  return localStorage.getItem("devicePushToken");
};

const getDeviceHeaders = () => {
  const deviceToken = getDeviceToken();
  return deviceToken ? { "x-device-token": deviceToken } : {};
};

export interface DeviceNotification {
  _id: string;
  title: string;
  body: string;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
    poster?: string;
  };
  categorySlug: string;
  productSlug?: string;
  episodeNumber?: number;
  sentAt: Date;
  data?: {
    type?: string;
    categorySlug?: string;
    episode?: string;
    productId?: string;
    productSlug?: string;
    [key: string]: any;
  };
}

export interface DeviceNotificationsResponse {
  success: boolean;
  data: DeviceNotification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UnreadCountResponse {
  success: boolean;
  unreadCount: number;
}

/**
 * Lấy lịch sử notifications cho device
 * GET /api/notifications/device/history
 */
export const getDeviceNotificationHistory = async (
  page = 1,
  limit = 20
): Promise<DeviceNotificationsResponse> => {
  const { data } = await intances.get("/notifications/device/history", {
    params: { page, limit },
    headers: getDeviceHeaders(),
  });
  return data;
};

/**
 * Lấy số lượng notifications chưa đọc
 * GET /api/notifications/device/unread-count
 */
export const getUnreadNotificationsCount = async (): Promise<UnreadCountResponse> => {
  const { data } = await intances.get("/notifications/device/unread-count", {
    headers: getDeviceHeaders(),
  });
  return data;
};

/**
 * Helper: Set device token vào localStorage
 */
export const setDeviceToken = (token: string) => {
  localStorage.setItem("devicePushToken", token);
};

/**
 * Helper: Remove device token
 */
export const removeDeviceToken = () => {
  localStorage.removeItem("devicePushToken");
};

/**
 * Helper: Check có device token không
 */
export const hasDeviceToken = (): boolean => {
  return !!getDeviceToken();
};

/**
 * Mark notification as read
 * PUT /api/notifications/device/mark-read/:id
 */
export const markNotificationAsRead = async (notificationId: string): Promise<any> => {
  const { data } = await intances.put(
    `/notifications/device/mark-read/${notificationId}`,
    {},
    {
      headers: getDeviceHeaders(),
    }
  );
  return data;
};

