import { createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, deleteComent, getAllComment } from "../../../../api/comment";

export const getAllCommentSlice = createAsyncThunk(
  'getAllCommentSlice',
  async () => {
    const { data }: any = await getAllComment();
    return data
  }
)


export const addCommentSlice = createAsyncThunk(
  'addCommentSlice',
  async (dataCm: any) => {
    const { data }: any = await addComment(dataCm.product, dataCm);
    console.log(data);
    return data
  }
)

export const deleteCommentSlice = createAsyncThunk(
  'deleteComment',
  async (id:any) => {
    const { data }: any = await deleteComent(id);
    return data
  }
)
