import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { tagsService, type TagFormData } from "../services/tags.service"

// Query keys
export const TAGS_QUERY_KEYS = {
  all: ["tags"] as const,
  lists: () => [...TAGS_QUERY_KEYS.all, "list"] as const,
  list: (filters: Record<string, any>) => [...TAGS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...TAGS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...TAGS_QUERY_KEYS.details(), id] as const,
}

// Get all tags
export const useTags = () => {
  return useQuery({
    queryKey: TAGS_QUERY_KEYS.lists(),
    queryFn: tagsService.getTags,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get tag by ID
export const useTag = (id: string) => {
  return useQuery({
    queryKey: TAGS_QUERY_KEYS.detail(id),
    queryFn: () => tagsService.getTagById(id),
    enabled: !!id,
  })
}

// Create tag mutation
export const useCreateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TagFormData) => tagsService.createTag(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEYS.lists() })
      message.success(response.message || "Tạo tag thành công!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi tạo tag"
      message.error(errorMessage)
    },
  })
}

// Update tag mutation
export const useUpdateTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TagFormData }) => tagsService.updateTag(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEYS.lists() })
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEYS.detail(variables.id) })
      message.success(response.message || "Cập nhật tag thành công!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi cập nhật tag"
      message.error(errorMessage)
    },
  })
}

// Delete tag mutation
export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tagsService.deleteTag(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: TAGS_QUERY_KEYS.lists() })
      message.success(response.message || "Xóa tag thành công!")
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi xóa tag"
      message.error(errorMessage)
    },
  })
}
