import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProduct, getOneProduct } from "../api/product";
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    const { data } = await getAllProduct();
    return data.data;
  }
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const { data } = await getOneProduct(id);
    return data;
  }
)
const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
        state.value = action.payload;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    })
  }
})

export default productSlice.reducer