import { createAsyncThunk } from "@reduxjs/toolkit";
import seriesApi from "../../../../sevices/series";

// Lấy tất cả series
export const fetchAllSeries = createAsyncThunk(
    "series/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await seriesApi.getSeries()
            return res;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Lấy 1 series theo ID
export const fetchSeriesById = createAsyncThunk(
    "series/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            return await seriesApi.getSeriesById(id);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Tạo mới 1 series
export const createSeries = createAsyncThunk(
    "series/create",
    async (seriesData: any, { rejectWithValue }) => {
        try {
            return await seriesApi.createSeries(seriesData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Cập nhật series
export const updateSeries = createAsyncThunk(
    "series/update",
    async ({ id, ...seriesData }: { id: string; seriesData: any }, { rejectWithValue }) => {
        try {
            return await seriesApi.updateSeries(id, seriesData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Xoá series
export const deleteSeries = createAsyncThunk(
    "series/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            return await seriesApi.deleteSeries(id);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Thêm category vào series
export const addCategoriesToSeries = createAsyncThunk(
    "series/addCategories",
    async ({ seriesId, categoryIds }: { seriesId: string; categoryIds: string[] }, { rejectWithValue }) => {
        try {
            return await seriesApi.addCategoriesToSeries(seriesId, categoryIds);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Xoá category khỏi series
export const removeCategoriesFromSeries = createAsyncThunk(
    "series/removeCategories",
    async ({ seriesId, categoryIds }: { seriesId: string; categoryIds: string[] }, { rejectWithValue }) => {
        try {
            return await seriesApi.removeCategoriesFromSeries(seriesId, categoryIds);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Lấy danh sách category của 1 series
export const getSeriesCategories = createAsyncThunk(
    "series/getCategories",
    async (seriesId: string, { rejectWithValue }) => {
        try {
            return await seriesApi.getSeriesCategories(seriesId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
