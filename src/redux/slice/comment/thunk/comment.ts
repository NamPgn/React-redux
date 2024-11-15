import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComent,
  deleteMultipleComment,
  getAllComment,
} from "../../../../sevices/comment";

export const getAllCommentSlice = createAsyncThunk(
  "getAllCommentSlice",
  async () => {
    const { data }: any = await getAllComment();
    return data;
  }
);

export const addCommentSlice = createAsyncThunk(
  "addCommentSlice",
  async (dataCm: any) => {
    const { data }: any = await addComment(dataCm.product, dataCm);
    return data;
  }
);

export const deleteCommentSlice = createAsyncThunk(
  "deleteComment",
  async (dataId: any) => {
    const { data }: any = await deleteComent(dataId);
    return data;
  }
);

export const deleteMultipleCommentsActions = createAsyncThunk(
  "deleteCommentsMultiple",
  async (dataId: any) => {
    const {data}: any = await deleteMultipleComment(dataId);
    return data;
  }
);
