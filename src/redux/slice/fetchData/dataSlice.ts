import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fetchData";

interface DataItem {
  id: string;
  name: string;
}

interface DataState {
  [key: string]: {
    loading: boolean;
    data: DataItem | null;
    error: string | null;
  };
}

const initialState: DataState = {};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        const { key } = action.meta.arg;
        state[key] = { loading: true, data: null, error: null };
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { key } = action.meta.arg;
        state[key] = {
          loading: false,
          data: action.payload,
          error: null,
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        const { key } = action.meta.arg;
        state[key] = {
          loading: false,
          data: null,
          error: action.error.message || "Error",
        };
      });
  },
});

export default dataSlice.reducer;
