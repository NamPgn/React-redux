import { createSlice } from "@reduxjs/toolkit";
import { getProducts, deleteProduct, addProduct, editProduct,
   getAllProductDataByCategorySlice, getProduct, importDataFile } from "./ThunkProduct/product";

const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
    isLoading: false,
    getOneProduct: [],
    getAllProductByCategory: [],
  },

  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true
    }).addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.value = action.payload;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id);
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });

    builder.addCase(importDataFile.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    });

    builder.addCase(getProduct.pending, (state, action) => {
      state.isLoading = true;
    }).addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.getOneProduct = action.payload;
    });

    builder.addCase(getAllProductDataByCategorySlice.fulfilled, (state, action) => {
      state.getAllProductByCategory = action.payload;
    });

  }
})

export default productSlice.reducer