import { createSlice, current } from "@reduxjs/toolkit";
import {
  getAllcate,
  getAllCategoryNotReqSlice,
  getCateSlice,
  addCateGorySlice,
  updateCatgorySlice,
  deleteCategorySlice,
  changeIsActiveCategorySlice,
  getAllcateVersion2,
} from "./thunk/category";
import { isCategorysSlice } from "../../../interfaces/category";
import { getAllcategoryVersion2 } from "../../../sevices/category";
const state: isCategorysSlice = {
  category: {
    data: [],
    length: 0,
  },
  isLoading: false,
  isError: false,
  categoryNotReqId: [],
  details: {},
};
const categorySlice = createSlice({
  name: "category",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(getAllcateVersion2.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.category = action.payload;
      })
      .addCase(getAllcateVersion2.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllcateVersion2.rejected, (state, action) => {
        state.isError = true;
      });
    
    builder
      .addCase(getAllcate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(getAllcate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllcate.rejected, (state, action) => {
        state.isError = true;
      });

    builder
      .addCase(getAllCategoryNotReqSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryNotReqId = action.payload;
      })
      .addCase(getAllCategoryNotReqSlice.pending, (state, action) => {
        state.isLoading = true;
      });

    builder
      .addCase(addCateGorySlice.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addCateGorySlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload && action.payload.data) {
          state.category.data = state.category.data.concat(action.payload.data);
        }
      })
      .addCase(addCateGorySlice.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });


    
    builder.addCase(deleteCategorySlice.fulfilled, (state, action) => {
      state.category.data = state.category.data.filter(
        (item: any) => item._id !== action.payload._id
      );
    });
    builder.addCase(updateCatgorySlice.fulfilled, (state, action) => {
      state.category.data.push(action.payload);
    });
    builder
      .addCase(getCateSlice.fulfilled, (state, action) => {
        state.details = action.payload;
        state.isLoading = false;
      })
      .addCase(getCateSlice.pending, (state, action) => {
        state.isLoading = true;
      });
    builder.addCase(changeIsActiveCategorySlice.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeIsActiveCategorySlice.rejected, (state, action) => {
      state.isError = true;
    });
    builder.addCase(changeIsActiveCategorySlice.fulfilled, (state, action) => {
      state.category.data = state.category.data.map((item: any) => item.slug === action.payload.slug ? action.payload : item);
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
