import instances from '../sevices/instances'

const API_URL = 'posters'

export interface PosterItem {
  _id: string
  imageUrl: string
  category: { _id: string; name?: string; slug?: string } | string
  title?: string
  alt?: string
  isActive?: boolean
  aspect?: '1:1' | '16:9' | '4:3' | '3:2' | '21:9' | '9:16' | '2:3'
  createdAt?: string
  updatedAt?: string
}

export interface PosterListResponse {
  data: PosterItem[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface BulkUploadResponse {
  data: PosterItem[]
  errors?: Array<{
    fileIndex: number
    fileName: string
    error: string
  }>
  message: string
  successCount: number
  errorCount: number
}

export const posterService = {
  getAll: async (params?: { page?: number; limit?: number; category?: string; isActive?: boolean }): Promise<PosterListResponse> => {
    const response = await instances.get(`${API_URL}`, { params })
    return response.data
  },

  getById: async (id: string): Promise<{ data: PosterItem }> => {
    const response = await instances.get(`${API_URL}/${id}`)
    return response.data
  },

  getByCategory: async (categoryId: string, params?: { page?: number; limit?: number }): Promise<PosterListResponse> => {
    const response = await instances.get(`${API_URL}/category/${categoryId}`, { params })
    return response.data
  },

  create: async (data: FormData): Promise<{ data: PosterItem }> => {
    const response = await instances.post(`${API_URL}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  update: async (id: string, data: FormData): Promise<{ data: PosterItem }> => {
    const response = await instances.put(`${API_URL}/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await instances.delete(`${API_URL}/${id}`)
  },

  bulkCreate: async (data: FormData): Promise<BulkUploadResponse> => {
    const response = await instances.post(`${API_URL}/bulk`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}


