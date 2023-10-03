import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, deleteCart, getAllCart } from "../../../../sevices/cart";

export const getAllCartSlice = createAsyncThunk("cartSlice", async () => {
  const { data }: any = await getAllCart();
  return data;
});

export const addCartSlice = createAsyncThunk(
  "addCartSlice",
  async (cart: any) => {
    const { data }: any = await addCart(cart);
    return data;
  }
);

export const deleteCartSlice = createAsyncThunk(
  "deleteCartSlice",
  async (state: any) => {
    const { data, status }: any = await deleteCart(state.id, state);
    return data.data;
  }
);
