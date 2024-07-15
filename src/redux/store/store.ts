import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import productReduce from "../slice/product/index";
import categoryReducer from "../slice/category/index";
import trailerReducer from "../slice/trailerSlice";
import commentReducer from "../slice/comment/index";
import cartReducer from "../slice/cart/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
  expire: "3600000",
};
const rootReducer = combineReducers({
  product: productReduce,
  user: userReducer,
  category: categoryReducer,
  trailer: trailerReducer,
  comment: commentReducer,
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
