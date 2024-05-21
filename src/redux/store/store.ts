import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import productReduce from "../slice/product/index";
import categoryReducer from "../slice/category/index";
import trailerReducer from "../slice/trailerSlice";
import commentReducer from "../slice/comment/index";
import cartReducer from "../slice/cart/index";
const rootReducer = combineReducers({
  product: productReduce,
  user: userReducer,
  category: categoryReducer,
  trailer: trailerReducer,
  comment: commentReducer,
  cart: cartReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
