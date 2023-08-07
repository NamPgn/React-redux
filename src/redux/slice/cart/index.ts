import { createSlice } from "@reduxjs/toolkit";
import { addCartSlice, getAllCartSlice, deleteCartSlice } from "./thunk/cart";

// export const cartApi = createApi(
//   {
//     reducerPath: 'Cart',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://test-19k8.onrender.com/api' }),
//     tagTypes: ['cart'],
//     endpoints: (builder) => ({
//       getAllcart: builder.query({
//         query: () => "/cart",
//         providesTags: ['cart'],
//       }),
//       addCart: builder.mutation({
//         query: (data) => {
//           return {
//             url: "/cart",
//             method: "POST",
//             body: data
//           }
//         },
//         invalidatesTags: ['cart']
//       }),
//       deleteCart: builder.mutation({
//         query: (id) => ({
//           url: `/cart/${id}`,
//           method: 'DELETE',
//         }),
//         invalidatesTags: ['cart']
//       })
//     })
//   }
// )
// export const { useGetAllcartQuery, useAddCartMutation, useDeleteCartMutation } = cartApi;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
    isLoading: false,
    code: null
  },
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(getAllCartSlice.fulfilled, (state:any, action) => {
      state.isLoading = false;
      state.value = action.payload;
    }).addCase(getAllCartSlice.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(addCartSlice.pending, (state, action) => {
      state.isLoading = true;
    }).addCase(addCartSlice.fulfilled, (state, action) => {
      if (!Array.isArray(state.value)) {
        state.value = [];
      }
      state.isLoading = false;
      state.value.push(action.payload.cart);
    });
  }
});

export default cartSlice.reducer