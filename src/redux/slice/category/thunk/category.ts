import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCate,
  deleteCate,
  getAllcategory,
  getAllCategoryNotReq,
  updateCate,
  getCategory,
  changeIsActiveCategory,
} from "../../../../sevices/category";
import { getAllCategoryAdmin } from "../../../../sevices/v2/categories";
export const getAllcate = createAsyncThunk(
  "category/getAllcate",
  async ({ page, search, version }: { page: number; search?: string; version?: string }) => {
    const { data }: any = await getAllcategory(page, search, version);
    return data;
  }
);

export const getAllCategoryAdminSlice = createAsyncThunk(
  "category/getAllCategoryAdminSlice",
  async ({ page }: { page: any }) => {
    const { data }: any = await getAllCategoryAdmin(page);
    return data;
  }
);

export const getCateSlice = createAsyncThunk(
  "category/getOne",
  async (id: string) => {
    const { data }: any = await getCategory(id);
    return data;
  }
);
export const getAllCategoryNotReqSlice = createAsyncThunk(
  "getAll/Category",
  async (id: any) => {
    const { data } = await getAllCategoryNotReq(id);
    return data;
  }
);

export const addCateGorySlice = createAsyncThunk(
  "add/Addcate",
  async (d: any) => {
    const { data }: any = await addCate(d);
    return data;
  }
);

export const deleteCategorySlice = createAsyncThunk(
  "delete/DeleteCate",
  async (id: any) => {
    const { data }: any = await deleteCate(id);
    return data;
  }
);

export const updateCatgorySlice = createAsyncThunk(
  "update/Category",
  async (dataUpdate: any) => {
    const { data }: any = await updateCate(dataUpdate);
    return data;
  }
);

export const changeIsActiveCategorySlice = createAsyncThunk(
  "changeIsActive/Category",
  async ({ slug, isActive }: { slug: string, isActive: boolean }) => {
    const { data }: any = await changeIsActiveCategory(slug, isActive);
    return data;
  }
);