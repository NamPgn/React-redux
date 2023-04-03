import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, getAllCart } from "../../../../api/cart";

export const getAllCartSlice = createAsyncThunk(
  'cartSlice',
  async () => {
    const { data } = await getAllCart();
    return data
  }
)

export const addCartSlice = createAsyncThunk(
  'addCartSlice',
  async (cart) => {
    const { data } = await addCart(cart);
    return data
  }
)