import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductData, deleteMultipleProduct, deleteProductById, editProductData, getAllProduct, getOneProduct, importData } from "../api/product";
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    const { data } = await getAllProduct();
    return data;
  }
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const { data } = await getOneProduct(id);
    return data;
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id) => {
    const { data } = await deleteProductById(id);
    return data;
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (dataProduct) => {
    const { data } = await addProductData(dataProduct);
    return data;
  }
)

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (dataProdut) => {
    const { data } = await editProductData(dataProdut);
    return data;
  }
)

export const importDataFile = createAsyncThunk(
  'product/importDataFile',
  async (dataFile) => {
    const { data } = await importData(dataFile);
    return data;
  }
)


// export const deleteMultipleData = createAsyncThunk(
//   'product/deleteProductMultiple',
//   async (id) => {
//     const { data } = await deleteMultipleProduct(id);
//     return data;
//   }
// )
const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
    isChecked: false
  },

  reducers: {
    addCheckbox: (state, action) => {
      state.push(action.payload);
    },

    deleteData: (state, action) => {
      state.filter = (item => {
        return item._id !== action.payload
      })
    },

    // deleteSelectData: async (state, action) => {
    //   return state.value = state.value.filter(item => item !== deleteMultipleData);
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      // console.log("actionProductdataa", action.payload);
      state.value = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.value = state.value.filter(item => item._id !== action.payload._id);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(importDataFile.fulfilled, (state, action) => {
      state.value.unshift(action.payload);
    });
    // builder.addCase(deleteMultipleData.fulfilled, (state, action) => {
    //   console.log(state.value = state.value.filter(item => item !== action.payload.data));
      
    // })
  }
})

export const { addCheckbox, deleteData, deleteSelectData } = productSlice.actions;
export default productSlice.reducer
