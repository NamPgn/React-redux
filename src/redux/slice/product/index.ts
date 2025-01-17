import { createSlice, current } from "@reduxjs/toolkit";
import {
  getProducts,
  deleteProduct,
  addProduct,
  editProduct,
  getAllProductDataByCategorySlice,
  getProduct,
  importDataFile,
  filterProductByCategorySlice,
  searchProductsSlice,
  autoGenarateEpisodeMovieSlice,
} from "./thunk/product";
import { isProductSlice } from "../../../interfaces/product";

const initialState: isProductSlice = {
  value: {
    data: [],
    totalCount: 0,
    totalPages: 0,
  },
  isLoading: false,
  getOneProduct: {},
  getAllProductByCategory: [],
  status: false,
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.value.data = state.value.data.filter(
        (item: any) => item._id !== action.payload.data._id
      );
    });

    builder.addCase(addProduct.fulfilled, (state: any, action) => {
      state.value.data.push(action.payload);
      // state.status = action.payload.status;
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.value.data.push(action.payload);
    });

    builder.addCase(importDataFile.fulfilled, (state, action) => {
      state.value.data = [...state.value.data, action.payload];
    });

    builder.addCase(filterProductByCategorySlice.fulfilled, (state, action) => {
      state.value.data = action.payload;
    });

    builder.addCase(searchProductsSlice.fulfilled, (state, action) => {
      state.value.data = action.payload;
    });

    builder
      .addCase(getProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getOneProduct = action.payload;
      });

    builder.addCase(
      getAllProductDataByCategorySlice.fulfilled,
      (state, action) => {
        state.getAllProductByCategory = action.payload;
      }
    );

    builder.addCase(
      autoGenarateEpisodeMovieSlice.fulfilled,
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});

export default productSlice.reducer;
