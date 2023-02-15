import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostListsRequest, addPostlistRequest } from "../../api/post";

export const getAllPostListSlice = createAsyncThunk(
  'getALL/Post',
  async () => {
    const { data } = await getAllPostListsRequest();
    return data
  }
)


export const addPostListSlice = createAsyncThunk(
  'addPost/Post',
  async (dataPost) => {
    const { data } = await addPostlistRequest(dataPost);
    console.log('dâtta', data);
    return data;
  }
)
const postSlice = createSlice({
  name: "post",
  initialState: {
    value: []
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPostListSlice.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addPostListSlice.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    })
  }
})
 
export default postSlice.reducer