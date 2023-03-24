import { createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, deleteComent, getAllComment } from "../../../../api/comment";

export const getAllCommentSlice = createAsyncThunk(
  'getAllCommentSlice',
  async () => {
    const { data } = await getAllComment();
    return data
  }
)


export const addCommentSlice = createAsyncThunk(
  'addCommentSlice',
  async (dataCm) => {
    const { data } = await addComment(dataCm.product, dataCm);
    return data
  }
)

export const deleteCommentSlice = createAsyncThunk(
  'deleteComment',
  async (id) => {
    const { data } = await deleteComent(id);
    return data
  }
)
