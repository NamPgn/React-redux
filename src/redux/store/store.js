import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../slice/userSlice";
import productReduce from "../slice/product/index";
import categoryReducer from "../slice/category/index";
import postReducer from "../slice/postSlice";
import commentReducer from "../slice/comment/index";
export const store = configureStore({
  reducer: {  //data
    product: productReduce,
    user: userReducer,
    category: categoryReducer,
    post: postReducer,
    comment: commentReducer
  },
});