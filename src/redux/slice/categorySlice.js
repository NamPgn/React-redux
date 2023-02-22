import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCate, deleteCate, getAllcategory, getAllCategoryNotReq, updateCate, getCategory } from "../../api/category";

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
    console.log("data", data);
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
const categorySlice = createSlice({
  name: "category",
  initialState: {
    value: [],
    categoryNotReqId: [],
    details: null
  },
  reducers: {
    // setCategoryDetails: (state, action) => {
    //   state.details = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllcate.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getAllCategoryNotReqSlice.fulfilled, (state, action) => {
      state.categoryNotReqId = action.payload;
    });
    builder.addCase(addCateGorySlice.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(deleteCategorySlice.fulfilled, (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id);
    });
    builder.addCase(updateCatgorySlice.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(getCateSlice.fulfilled, (state, action) => {
      // state.categoryOne
      state.categoryOne = action.payload;
    })
  }
})


export default categorySlice.reducer;