import instances from '../sevices/instances'

const API_URL = 'poster'

export const sliderService = {
    // Get all sliders
    getAllSliders: async (): Promise<any[]> => {
        const response = await instances.get(`${API_URL}`)
        return response.data.data
    },

    // Get single slider
    getSliderById: async (id: string): Promise<any> => {
        const response = await instances.get(`${API_URL}/${id}`)
        return response.data.data
    },

    // Create new slider
    createSlider: async (data: FormData): Promise<any> => {
        const response = await instances.post(`${API_URL}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    },

    // Update slider
    updateSlider: async (id: string, data: FormData): Promise<any> => {
        const response = await instances.put(`${API_URL}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    },

    // Delete slider
    deleteSlider: async (id: string): Promise<void> => {
        await instances.delete(`${API_URL}/${id}`)
    },
}