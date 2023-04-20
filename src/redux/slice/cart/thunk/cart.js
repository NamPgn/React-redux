import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, deleteCart, getAllCart } from "../../../../api/cart";

export const getAllCartSlice = createAsyncThunk(
  'cartSlice',
  async () => {
    const { data: { data, message }, status } = await getAllCart();
    return {
      cart: data,
      code: status,
      message: message
    }
  }
)

export const addCartSlice = createAsyncThunk(
  'addCartSlice',
  async (cart) => {
    const { data: { data, message }, status } = await addCart(cart);
    return {
      data: data,
      code: status,
      message: message
    }
  }
)

export const deleteCartSlice = createAsyncThunk(
  'deleteCartSlice',
  async (state) => {
    const { data: { data, message }, status } = await deleteCart(state.id, state);
    return {
      data: data,
      message: message,
      code: status
    }
  }
)