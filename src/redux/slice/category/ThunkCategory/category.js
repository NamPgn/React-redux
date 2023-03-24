import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCate, deleteCate, getAllcategory, getAllCategoryNotReq, updateCate, getCategory } from "../../../../api/category";

export const getAllcate = createAsyncThunk(
  'category/getAllcate',
  async () => {
    const { data } = await getAllcategory();
    return data
  }
)

export const getCateSlice = createAsyncThunk(
  'category/getOne',
  async (id) => {
    const { data } = await getCategory(id);
    return data
  }
)
export const getAllCategoryNotReqSlice = createAsyncThunk(
  'getAll/Category',
  async (id) => {
    const { data } = await getAllCategoryNotReq(id);
    return data
  }
)


export const addCateGorySlice = createAsyncThunk(
  'add/Addcate',
  async (d) => {
    const { data } = await addCate(d);
    return data;
  }
)

export const deleteCategorySlice = createAsyncThunk(
  'delete/DeleteCate',
  async (id) => {
    const { data } = await deleteCate(id);
    return data;
  }
)

export const updateCatgorySlice = createAsyncThunk(
  'update/Category',
  async (dataUpdate) => {
    const { data } = await updateCate(dataUpdate);
    return data;
  }
)