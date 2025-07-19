import instances from "../sevices/instances"

const API_URL = "tags"

export interface TagFormData {
  name: string
  categories: string[]
}

export interface TagResponse {
  _id: string
  name: string
  slug: string
  categories: Array<{
    _id: string
    name: string
  }>
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export const tagsService = {
  // Get all tags
  getTags: async (): Promise<TagResponse[]> => {
    const response = await instances.get(`${API_URL}`)
    return response.data
  },

  // Get tag by ID
  getTagById: async (id: string): Promise<TagResponse> => {
    const response = await instances.get(`${API_URL}/${id}`)
    return response.data
  },

  // Create new tag
  createTag: async (data: TagFormData): Promise<ApiResponse<TagResponse>> => {
    const response = await instances.post(`${API_URL}`, data)
    return response.data
  },

  // Update tag
  updateTag: async (id: string, data: TagFormData): Promise<ApiResponse<TagResponse>> => {
    const response = await instances.put(`${API_URL}/${id}`, data)
    return response.data
  },

  // Delete tag
  deleteTag: async (id: string): Promise<ApiResponse<null>> => {
    const response = await instances.delete(`${API_URL}/${id}`)
    return response.data
  },
}
