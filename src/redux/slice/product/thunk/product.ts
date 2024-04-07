import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductData,
  deleteProductById,
  editProductData,
  filterProductByCategory,
  getAllProduct,
  getAllProductsByCategory,
  getOneProduct,
  importData,
  searchProduct,
} from "../../../../sevices/product";
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (page: number) => {
    const { data }: any = await getAllProduct(page);
    return {
      product: data.data,
      length: data.length,
    };
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id: string) => {
    const { data }: any = await getOneProduct(id);
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: any) => {
    const { data }: any = await deleteProductById(id);
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (dataProduct: any) => {
    const { data, status }: any = await addProductData(dataProduct);
    return data;
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (dataProdut: any) => {
    const { data }: any = await editProductData(dataProdut);
    return data;
  }
);

export const importDataFile = createAsyncThunk(
  "product/importDataFile",
  async (dataFile: any) => {
    const { data }: any = await importData(dataFile);
    return data;
  }
);

export const getAllProductDataByCategorySlice = createAsyncThunk(
  "product/getAllProductDataByCategory",
  async (dataCategory: any) => {
    const { data }: any = await getAllProductsByCategory(dataCategory);
    return data;
  }
);

// export const pushListDataSlice = createAsyncThunk(
//   'product',
//   async (item: any) => {
//     const { data }: any = await pushListData(item.id, item);
//     return data
//   }
// )

export const filterProductByCategorySlice = createAsyncThunk(
  "product/filter",
  async (filter: any) => {
    const { data }: any = await filterProductByCategory(filter);
    return data;
  }
);

export const searchProductsSlice = createAsyncThunk(
  "product/Search",
  async (val: any) => {
    const { data }: any = await searchProduct(val);
    return data;
  }
);
