import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { posterService, PosterListResponse, PosterItem, BulkUploadResponse } from '../services/poster.service'

export const usePosters = (params?: { page?: number; limit?: number; category?: string; isActive?: boolean }) => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<PosterListResponse>({
    queryKey: ['posters', params],
    queryFn: () => posterService.getAll(params),
    staleTime: 5 * 60 * 1000,
  })

  const useGetPoster = (id: string) => {
    return useQuery<{ data: PosterItem }>({
      queryKey: ['poster', id],
      queryFn: () => posterService.getById(id),
      enabled: !!id,
    })
  }

  const createMutation = useMutation({
    mutationFn: (data: FormData) => posterService.create(data),
    onSuccess: () => {
      message.success('Poster created successfully')
      queryClient.invalidateQueries({ queryKey: ['posters'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to create poster')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => posterService.update(id, data),
    onSuccess: () => {
      message.success('Poster updated successfully')
      queryClient.invalidateQueries({ queryKey: ['posters'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to update poster')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => posterService.delete(id),
    onSuccess: () => {
      message.success('Poster deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['posters'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to delete poster')
    },
  })

  const bulkCreateMutation = useMutation({
    mutationFn: (data: FormData) => posterService.bulkCreate(data),
    onSuccess: (response: BulkUploadResponse) => {
      if (response.errorCount > 0) {
        message.warning(`${response.message} - ${response.errorCount} files failed`)
      } else {
        message.success(`Successfully uploaded ${response.successCount} posters`)
      }
      queryClient.invalidateQueries({ queryKey: ['posters'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to bulk upload posters')
    },
  })

  return {
    posters: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    useGetPoster,
    createPoster: createMutation.mutate,
    updatePoster: updateMutation.mutate,
    deletePoster: deleteMutation.mutate,
    bulkCreatePosters: bulkCreateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isBulkCreating: bulkCreateMutation.isPending,
  }
}


