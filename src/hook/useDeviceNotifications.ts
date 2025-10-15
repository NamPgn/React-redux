import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDeviceNotificationHistory,
  getUnreadNotificationsCount,
  markNotificationAsRead,
} from "../sevices/device-notification";

// Query keys
export const deviceNotificationKeys = {
  all: ["device-notifications"] as const,
  history: (page?: number, limit?: number) =>
    [...deviceNotificationKeys.all, "history", page, limit] as const,
  unreadCount: () => [...deviceNotificationKeys.all, "unread-count"] as const,
};

/**
 * Hook: Lấy lịch sử notifications cho device (mobile app)
 * Không cần auth, chỉ cần device token trong headers
 */
export const useDeviceNotificationHistory = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: deviceNotificationKeys.history(page, limit),
    queryFn: () => getDeviceNotificationHistory(page, limit),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true, // Auto refetch khi quay lại app
    retry: 1,
  });
};

/**
 * Hook: Lấy số lượng notifications chưa đọc
 * Dùng để hiển thị badge trên icon
 */
export const useUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: deviceNotificationKeys.unreadCount(),
    queryFn: getUnreadNotificationsCount,
    staleTime: 10000, // 10 seconds
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Auto refetch every 30s
    retry: 1,
  });
};

/**
 * Hook: Mark notification as read
 * Auto refetch unread count sau khi mark
 */
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      // Invalidate unread count để refetch
      queryClient.invalidateQueries({ queryKey: deviceNotificationKeys.unreadCount() });
      queryClient.invalidateQueries({ queryKey: deviceNotificationKeys.all });
    },
    onError: (error: any) => {
      console.error("Error marking notification as read:", error);
    },
  });
};

