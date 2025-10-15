import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getLatestNotifications,
  getNotificationStats,
  getNotificationById,
  resendNotification,
  deleteNotification,
  deleteMultipleNotifications,
  GetNotificationsParams,
} from "../sevices/notification";
import { message } from "antd";

// Query keys
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (params: GetNotificationsParams) => [...notificationKeys.lists(), params] as const,
  latest: (limit?: number) => [...notificationKeys.all, "latest", limit] as const,
  stats: (startDate?: string, endDate?: string) =>
    [...notificationKeys.all, "stats", startDate, endDate] as const,
  detail: (id: string) => [...notificationKeys.all, "detail", id] as const,
};

// Hook: Lấy danh sách notifications
export const useNotifications = (params: GetNotificationsParams = {}) => {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => getNotifications(params),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};

// Hook: Lấy latest notifications
export const useLatestNotifications = (limit = 10) => {
  return useQuery({
    queryKey: notificationKeys.latest(limit),
    queryFn: () => getLatestNotifications(limit),
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};

// Hook: Lấy thống kê
export const useNotificationStats = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: notificationKeys.stats(startDate, endDate),
    queryFn: () => getNotificationStats(startDate, endDate),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
};

// Hook: Lấy notification detail
export const useNotificationDetail = (id: string) => {
  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: () => getNotificationById(id),
    enabled: !!id,
    staleTime: 60000,
  });
};

// Hook: Resend notification
export const useResendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resendNotification,
    onSuccess: (data) => {
      message.success("✅ Đã gửi lại notification thành công!");
      // Invalidate queries để refetch
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "❌ Không thể gửi lại notification");
    },
  });
};

// Hook: Xóa notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      message.success("✅ Đã xóa notification thành công!");
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "❌ Không thể xóa notification");
    },
  });
};

// Hook: Xóa nhiều notifications
export const useDeleteMultipleNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMultipleNotifications,
    onSuccess: (data) => {
      message.success(`✅ Đã xóa ${data.deletedCount} notifications!`);
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "❌ Không thể xóa notifications");
    },
  });
};

