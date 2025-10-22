import intances from "../instances";
import { isAuthentication } from "../../auth/getToken";

const getAuthHeader = () => {
  const token = isAuthentication();
  return token ? { Authorization: `Bearer ${token.token}` } : {};
};

export const notificationDevice = {
  // Admin endpoint: Lấy danh sách push tokens
  getNotificationsByDevice: async (page = 1, limit = 20) => {
    const { data } = await intances.get("/notifications/device/history", {
      params: { page, limit },
      headers: getAuthHeader(),
    });
    return data;
  },


  getPushNotificationDevices: async (page = 1, limit = 20) => {
    const { data } = await intances.get("/push-notification/devices", {
      params: { page, limit },
    });
    return data;
  },
}