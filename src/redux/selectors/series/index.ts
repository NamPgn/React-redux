import { RootState } from "../../store/store";

export const selectAllSeries = (state: RootState) => state.series.list;
export const selectSeriesById = (id: string) => (state: RootState) => 
    state.series.list.find(series => series._id === id);
export const selectSelectedSeries = (state: RootState) => state.series.selectedSeries;
export const selectSeriesLoading = (state: RootState) => state.series.loading;
export const selectSeriesError = (state: RootState) => state.series.error;
export const selectSeriesCategories = (seriesId: string) => (state: RootState) => {
    const series = state.series.list.find(s => s._id === seriesId);
    return series?.categories || [];
};
