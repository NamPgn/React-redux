import { createSlice } from "@reduxjs/toolkit";
import { addCartSlice, getAllCartSlice } from "./thunk/cart";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import intances from "../../../api/instances";

export const cartApi = createApi(
  {
    reducerPath: 'Cart',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://test-19k8.onrender.com/api' }),
    tagTypes: ['cart'],
    endpoints: (builder) => ({
      getAllcart: builder.query({
        query: () => "/cart",
        providesTags: ['cart'],
      }),
      addCart: builder.mutation({
        query: (data) => {
          return {
            url: "/cart",
            method: "POST",
            body: data
          }
        },
        invalidatesTags: ['cart']
      }),
      deleteCart: builder.mutation({
        query: (id) => {
          return {
            url: `/cart/${id}`,
            method: "DELETE",
          }
        },
        invalidatesTags: ['cart']
      })
    })
  }
)
export const { useGetAllcartQuery, useAddCartMutation } = cartApi;

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     value: [],
//     isLoading: false
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getAllCartSlice.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.value = action.payload;
//     }).addCase(getAllCartSlice.pending, (state, action) => {
//       state.isLoading = true;
//     });

//     builder.addCase(addCartSlice.pending, (state, action) => {
//       state.isLoading = true;
//     }).addCase(addCartSlice.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.value.push(action.payload);
//     })
//   }
// });

// export default cartSlice.reducer