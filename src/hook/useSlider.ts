import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { sliderService } from '../services/slider.service'

export const useSlider = () => {
  const queryClient = useQueryClient()

  const { data: sliders, isLoading } = useQuery({
    queryKey: ['sliders'],
    queryFn: sliderService.getAllSliders,
  })

  const useGetSlider = (id: string) => {
    return useQuery({
      queryKey: ['slider', id],
      queryFn: () => sliderService.getSliderById(id),
      enabled: !!id,
    })
  }

  const createSliderMutation = useMutation({
    mutationFn: (data: FormData) => sliderService.createSlider(data),
    onSuccess: () => {
      message.success('Slider created successfully')
      queryClient.invalidateQueries({ queryKey: ['sliders'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to create slider')
    },
  })

  const updateSliderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      sliderService.updateSlider(id, data),
    onSuccess: () => {
      message.success('Slider updated successfully')
      queryClient.invalidateQueries({ queryKey: ['sliders'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to update slider')
    },
  })

  const deleteSliderMutation = useMutation({
    mutationFn: (id: string) => sliderService.deleteSlider(id),
    onSuccess: () => {
      message.success('Slider deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['sliders'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to delete slider')
    },
  })

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => sliderService.deleteSlider(id)))
    },
    onSuccess: () => {
      message.success('Selected sliders deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['sliders'] })
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to delete sliders')
    },
  })

  return {
    sliders,
    isLoading,
    useGetSlider,
    createSlider: createSliderMutation.mutate,
    updateSlider: updateSliderMutation.mutate,
    deleteSlider: deleteSliderMutation.mutate,
    bulkDelete: bulkDeleteMutation.mutate,
    isCreating: createSliderMutation.isPending,
    isUpdating: updateSliderMutation.isPending,
    isDeleting: deleteSliderMutation.isPending,
    isBulkDeleting: bulkDeleteMutation.isPending,
  }
} 