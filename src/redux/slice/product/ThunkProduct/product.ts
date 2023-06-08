import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductData, deleteMultipleProduct, deleteProductById, editProductData, getAllProduct, getAllProductsByCategory, getOneProduct, importData, pushListData } from "../../../../api/product";
import { IProduct } from "../../../../interfaces/product";
declare var Promise: any;
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    const { data }: any = await getAllProduct();
    return data;
  }
)

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id: string) => {
    const { data }: any = await getOneProduct(id);
    return data;
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: any) => {
    const { data }: any = await deleteProductById(id);
    return data;
  }
)

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (dataProduct: any) => {
    const { data }: any = await addProductData(dataProduct);
    console.log("data", data);
    return data;
  }
)

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (dataProdut: any) => {
    const { data }: any = await editProductData(dataProdut);
    return data;
  }
)

export const importDataFile = createAsyncThunk(
  'product/importDataFile',
  async (dataFile: any) => {
    const { data }: any = await importData(dataFile);
    return data;
  }
)

export const getAllProductDataByCategorySlice = createAsyncThunk(
  'product/getAllProductDataByCategory',
  async (dataCategory: any) => {
    const { data }: any = await getAllProductsByCategory(dataCategory);
    return data;
  }
)

// export const pushListDataSlice = createAsyncThunk(
//   'product',
//   async (item: any) => {
//     const { data }: any = await pushListData(item.id, item);
//     return data
//   }
// )