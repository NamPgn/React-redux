import { createSlice } from "@reduxjs/toolkit";
import { 
	createSeries, 
	deleteSeries, 
	fetchAllSeries, 
	fetchSeriesById, 
	updateSeries,
	addCategoriesToSeries,
	removeCategoriesFromSeries,
	getSeriesCategories
} from "./thunk";

interface SeriesState {
	list: any[];
	selectedSeries: any | null;
	loading: boolean;
	error: string | null;
	seriesCategories: any[];
}

const initialState: SeriesState = {
	list: [],
	selectedSeries: null,
	loading: false,
	error: null,
	seriesCategories: []
};

const seriesSlice = createSlice({
	name: "series",
	initialState,
	reducers: {
		clearSelectedSeries(state) {
			state.selectedSeries = null;
		},
		clearSeriesCategories(state) {
			state.seriesCategories = [];
		}
	},
	extraReducers: (builder) => {
		builder
			// Fetch all series
			.addCase(fetchAllSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchAllSeries.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(fetchAllSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error fetching series list";
			})

			// Fetch series by ID
			.addCase(fetchSeriesById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchSeriesById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedSeries = action.payload;
			})
			.addCase(fetchSeriesById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error fetching series";
			})

			// Create series
			.addCase(createSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createSeries.fulfilled, (state, action) => {
				state.loading = false;
				state.list.push(action.payload);
			})
			.addCase(createSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error creating series";
			})

			// Update series
			.addCase(updateSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateSeries.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.list.findIndex(s => s._id === action.payload._id);
				if (index !== -1) {
					state.list[index] = action.payload;
				}
			})
			.addCase(updateSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error updating series";
			})

			// Delete series
			.addCase(deleteSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteSeries.fulfilled, (state, action) => {
				state.loading = false;
				state.list = state.list.filter(s => s._id !== action.payload);
			})
			.addCase(deleteSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error deleting series";
			})

			// Add categories to series
			.addCase(addCategoriesToSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addCategoriesToSeries.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.list.findIndex(s => s._id === action.payload._id);
				if (index !== -1) {
					state.list[index] = action.payload;
				}
			})
			.addCase(addCategoriesToSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error adding categories to series";
			})

			// Remove categories from series
			.addCase(removeCategoriesFromSeries.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeCategoriesFromSeries.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.list.findIndex(s => s._id === action.payload._id);
				if (index !== -1) {
					state.list[index] = action.payload;
				}
			})
			.addCase(removeCategoriesFromSeries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error removing categories from series";
			})

			// Get series categories
			.addCase(getSeriesCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getSeriesCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.seriesCategories = action.payload;
			})
			.addCase(getSeriesCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error fetching series categories";
			});
	},
});

export const { clearSelectedSeries, clearSeriesCategories } = seriesSlice.actions;
export default seriesSlice.reducer;
