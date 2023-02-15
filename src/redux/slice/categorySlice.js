import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllcategory, getAllCategoryNotReq } from "../../api/category";

export const getAllcate = createAsyncThunk(
  'category/getAllcate',
  async () => {
    const { data } = await getAllcategory();
    return data
  }
)
export const getAllCategoryNotReqSlice = createAsyncThunk(
  'getAll/Category',
  async (id) => {
    const { data } = await getAllCategoryNotReq(id);
    return data
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: [],
    categoryNotReqId: []
  },
  extraReducers: (builder) => {
    builder.addCase(getAllcate.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getAllCategoryNotReqSlice.fulfilled, (state, action) => {
      state.categoryNotReqId = action.payload;
    })
  }
})


export default categorySlice.reducer;