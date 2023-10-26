import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import productReduce from "../slice/product/index";
import categoryReducer from "../slice/category/index";
import trailerReducer from "../slice/trailerSlice";
import commentReducer from "../slice/comment/index";
import cartReducer from "../slice/cart/index";
export const store = configureStore({
  reducer: {
    //data
    product: productReduce,
    user: userReducer,
    category: categoryReducer,
    trailer: trailerReducer,
    comment: commentReducer,
    cart: cartReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
