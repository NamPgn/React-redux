import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slice/userSlice";
import productReduce from "../slice/productSlice";
import categoryReducer from "../slice/categorySlice";
import postReducer from "../slice/postSlice"
// const middleWare = applyMiddleware(sagaMiddleWare)
export const store = configureStore({
  reducer: {  //data
    product: productReduce,
    user: userReducer,
    category: categoryReducer,
    post: postReducer
  },
});
// export const store = createStore(persist_Reducer);
// export const persitor = persistStore(store);