import { createSlice } from "@reduxjs/toolkit";
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
} from "./thunk/product";
interface State {
  value: any[]; // Thay any bằng kiểu dữ liệu chính xác của các phần tử trong mảng
  isLoading: boolean;
  getOneProduct: any;
  getAllProductByCategory: any[];
  status: any;
}
const state: any = {
  value: [],
  isLoading: false,
  getOneProduct: {},
  getAllProductByCategory: [],
  status: null,
};
const productSlice = createSlice({
  name: "product",
  initialState: state,
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
      state.value.product = state.value.product.filter(
        (item) => item._id !== action.payload.data._id
      );
    });

    builder.addCase(addProduct.fulfilled, (state: any, action) => {
      state.value = [action.payload, ...state.value];
      state.status = action.payload.status;
    });

    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });

    builder.addCase(importDataFile.fulfilled, (state, action) => {
      state.value = [...state.value, action.payload];
    });

    builder.addCase(filterProductByCategorySlice.fulfilled, (state, action) => {
      state.value.product = action.payload;
    });

    builder.addCase(searchProductsSlice.fulfilled, (state, action) => {
      state.value.product = action.payload;
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
  },
});

export default productSlice.reducer;
