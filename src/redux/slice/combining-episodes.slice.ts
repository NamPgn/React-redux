import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as combiningEpisodesService from "../../sevices/combining-episodes";

interface CombiningEpisode {
  _id: string;
  link1: string;
  link2: string;
  link3: string;
  episodes: string;
}

interface CombiningEpisodesState {
  combiningEpisodes: CombiningEpisode[];
  currentEpisode: CombiningEpisode | null;
  loading: boolean;
  error: string | null;
}

const initialState: CombiningEpisodesState = {
  combiningEpisodes: [],
  currentEpisode: null,
  loading: false,
  error: null,
};

// Async thunks
export const createCombiningEpisode = createAsyncThunk(
  "combiningEpisodes/create",
  async (data: Partial<CombiningEpisode>) => {
    const response = await combiningEpisodesService.createCombiningEpisodes(data);
    return response.data;
  }
);

export const getListCombiningEpisodes = createAsyncThunk(
  "combiningEpisodes/getList",
  async () => {
    const response = await combiningEpisodesService.getListCombiningEpisodes();
    return response.data;
  }
);

export const getCombiningEpisodeById = createAsyncThunk(
  "combiningEpisodes/getById",
  async (id: string) => {
    const response = await combiningEpisodesService.getCombiningEpisodesById(id);
    return response.data;
  }
);

export const updateCombiningEpisode = createAsyncThunk(
  "combiningEpisodes/update",
  async ({ id, data }: { id: string; data: Partial<CombiningEpisode> }) => {
    const response = await combiningEpisodesService.updateCombiningEpisodes(id, data);
    return response.data;
  }
);

export const deleteCombiningEpisode = createAsyncThunk(
  "combiningEpisodes/delete",
  async (id: string) => {
    await combiningEpisodesService.deleteCombiningEpisodes(id);
    return id;
  }
);

const combiningEpisodesSlice = createSlice({
  name: "combiningEpisodes",
  initialState,
  reducers: {
    clearCurrentEpisode: (state) => {
      state.currentEpisode = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCombiningEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCombiningEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.combiningEpisodes.push(action.payload.data);
      })
      .addCase(createCombiningEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create combining episode";
      })
      // Get List
      .addCase(getListCombiningEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListCombiningEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.combiningEpisodes = action.payload.data;
      })
      .addCase(getListCombiningEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch combining episodes";
      })
      // Get By ID
      .addCase(getCombiningEpisodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCombiningEpisodeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEpisode = action.payload.data;
      })
      .addCase(getCombiningEpisodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch combining episode";
      })
      // Update
      .addCase(updateCombiningEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCombiningEpisode.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.combiningEpisodes.findIndex(
          (episode) => episode._id === action.payload.data._id
        );
        if (index !== -1) {
          state.combiningEpisodes[index] = action.payload.data;
        }
        state.currentEpisode = action.payload.data;
      })
      .addCase(updateCombiningEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update combining episode";
      })
      // Delete
      .addCase(deleteCombiningEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCombiningEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.combiningEpisodes = state.combiningEpisodes.filter(
          (episode) => episode._id !== action.payload
        );
        if (state.currentEpisode?._id === action.payload) {
          state.currentEpisode = null;
        }
      })
      .addCase(deleteCombiningEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete combining episode";
      });
  },
});

export const { clearCurrentEpisode, clearError } = combiningEpisodesSlice.actions;
export default combiningEpisodesSlice.reducer; 