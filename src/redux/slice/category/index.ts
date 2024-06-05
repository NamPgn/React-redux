import { createSlice } from "@reduxjs/toolkit";

import {
  getAllcate,
  getAllCategoryNotReqSlice,
  getCateSlice,
  addCateGorySlice,
  updateCatgorySlice,
  deleteCategorySlice,
} from "./thunk/category";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    isLoading: false,
    categoryNotReqId: [],
    details: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllcate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(getAllcate.pending, (state, action) => {
        state.isLoading = true;
      });

    builder
      .addCase(getAllCategoryNotReqSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryNotReqId = action.payload;
      })
      .addCase(getAllCategoryNotReqSlice.pending, (state, action) => {
        state.isLoading = true;
      });

    builder.addCase(addCateGorySlice.fulfilled, (state, action) => {
      state.category = state.category.concat(action.payload);
    });
    builder.addCase(deleteCategorySlice.fulfilled, (state, action) => {
      state.category = state.category.filter(
        (item) => item._id !== action.payload._id
      );
    });
    builder.addCase(updateCatgorySlice.fulfilled, (state, action) => {
      state.category.push(action.payload);
    });
    builder.addCase(getCateSlice.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

export default categorySlice.reducer;
