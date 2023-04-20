import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductData, deleteMultipleProduct, deleteProductById, editProductData, getAllProduct, getAllProductsByCategory, getOneProduct, importData } from "../../../../api/product";
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
    console.log("data", data);
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

export const getAllProductDataByCategorySlice = createAsyncThunk(
  'product/getAllProductDataByCategory',
  async (dataCategory) => {
    const { data } = await getAllProductsByCategory(dataCategory);
    return data;
  }
)