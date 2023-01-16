import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllcategory } from "../api/categoty";

export const getAllcate = createAsyncThunk(
  'category/getAllcate',
  async () => {
    const { data } = await getAllcategory();
    return data
  }
)


const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: []
  },
  extraReducers: (builder) => {
    builder.addCase(getAllcate.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
})


export default categorySlice.reducer;