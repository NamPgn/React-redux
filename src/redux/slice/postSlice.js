import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostListsRequest, addPostlistRequest } from "../../api/post";
import { editTrailer } from "../../api/trailer";

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
    return data;
  }
)

export const editTrailerSlice = createAsyncThunk(
  'trailer/Trailing',
  async (dataEdit) => {
    const { data } = await editTrailer(dataEdit);
    return data
  }
)
const postSlice = createSlice({
  name: "post",
  initialState: {
    value: [],
    trailerValues: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPostListSlice.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addPostListSlice.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    });


    builder.addCase(editTrailerSlice.fulfilled, (state, action) => {
      state.trailerValues.push(action.payload);
    })
  }
})

export default postSlice.reducer