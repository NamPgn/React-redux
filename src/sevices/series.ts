import intances from "./instances";

const seriesApi = {
	getSeries: async () => {
		const response = await intances.get(`/series`);
		return response.data;
	},

	getSeriesById: async (id: string) => {
		const response = await intances.get(`/series/${id}`);
		return response.data;
	},

	createSeries: async (series: any) => {
		const response = await intances.post(`/series`, series);
		return response.data;
	},

	updateSeries: async (id: string, series: any) => {
		const response = await intances.put(`/series/${id}`, series);
		return response.data;
	},

	deleteSeries: async (id: string) => {
		const response = await intances.delete(`/series/${id}`);
		return response.data;
	},

	addCategoriesToSeries: async (seriesId: string, categoryIds: string[]) => {
		const response = await intances.post(`/series/${seriesId}/categories`, {
			categoryIds,
		});
		return response.data;
	},

	removeCategoriesFromSeries: async (seriesId: string, categoryIds: string[]) => {
		const response = await intances.delete(`/series/${seriesId}/categories`, {
			data: { categoryIds }, // gửi data qua body trong DELETE (axios hỗ trợ)
		});
		return response.data;
	},

	getSeriesCategories: async (seriesId: string) => {
		const response = await intances.get(`/series/${seriesId}/categories`);
		return response.data;
	}
};

export default seriesApi;
