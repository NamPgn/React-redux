import intances from "./instances";

const reportApi = {
    // Lấy danh sách tất cả báo cáo
    getReports: async (params: any) => {
        const response = await intances.get(`reports`);
        return response.data;
    },

    // Lấy chi tiết một báo cáo
    getReportById: async (id: string) => {
        const response = await intances.get(`reports/${id}`);
        return response.data;
    },

    // Tạo báo cáo mới
    createReport: async (data: { productId: string; reaction: string; comment: string }) => {
        const response = await intances.post(`reports`, data);
        return response.data;
    },

    // Xử lý báo cáo (đánh dấu đã giải quyết)
    resolveReport: async (id: string) => {
        const response = await intances.put(`reports/${id}/resolve`);
        return response.data;
    },

    // Từ chối báo cáo
    rejectReport: async (id: string) => {
        const response = await intances.put(`reports/${id}/reject`);
        return response.data;
    },

    deleteReports: async (id:any) => {
        const response = await intances.delete(`reports/${id}`);
        return response.data;
    }
};

export default reportApi;
