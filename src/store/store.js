import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slice/userSlice";
import productReduce from "../slice/productSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import categoryReducer from "../slice/categorySlice";
// const persistConfig = {
//     key: "root",
//     storage: storage,
// }

// const persist_Reducer = persistReducer(persistConfig, userReducer)
export const store = configureStore({
  reducer: {  //data
    product: productReduce,
    user: userReducer,
    category: categoryReducer
  },
})
// export const store = createStore(persist_Reducer);
// export const persitor = persistStore(store);