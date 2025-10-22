import { useQuery } from "@tanstack/react-query";
import { notificationDevice } from "../../sevices/v2/notification-device";

export const useNotificationDevice = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ["notification-device", page, limit],
    queryFn: () => notificationDevice.getPushNotificationDevices(page, limit),
    staleTime: 30000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};