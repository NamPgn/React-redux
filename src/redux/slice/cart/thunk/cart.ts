import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, deleteCart, getAllCart } from "../../../../api/cart";

export const getAllCartSlice = createAsyncThunk(
  'cartSlice',
  async () => {
    const { data }: any = await getAllCart();
    return data
  }
)

export const addCartSlice = createAsyncThunk(
  'addCartSlice',
  async (cart: any) => {
    const { data: { data, message }, status }: any = await addCart(cart);
    return {
      data: data,
      code: status,
      message: message
    }
  }
)

export const deleteCartSlice = createAsyncThunk(
  'deleteCartSlice',
  async (state: any) => {
    const { data: { data, message }, status }: any = await deleteCart(state.id, state);
    return {
      data: data,
      message: message,
      code: status
    }
  }
)