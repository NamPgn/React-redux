import { createSlice } from "@reduxjs/toolkit";
import { addCommentSlice, deleteCommentSlice, getAllCommentSlice } from "./thunk/comment";

const commment = createSlice({
  name: "comment",
  initialState: {
    value: [],
  },
  reducers:{

  },
  extraReducers: (builder) => {
    builder.addCase(getAllCommentSlice.fulfilled, (state, action) => {
      state.value = action.payload
    })
    builder.addCase(addCommentSlice.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(deleteCommentSlice.fulfilled, (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id)
    })
  }
})

export default commment.reducer