import intances from "./instances"

export const getAllProduct = async () => {
  return await intances.get('products');
}

export const getOneProduct = async (id: any) => {
  return await intances.get(`product/${id}`)
}

export const deleteProductById = async (id: any) => {
  return await intances.delete(`/product/${id}`);
}

export const addProductData = async (data: any) => {
  return await intances.post('/product', data);
}

export const editProductData = async (data: any) => {
  // console.log("data",);
  return await intances.put(`/product/${data.get('_id')}`, data);
}

export const importData = async (data: any) => {
  return await intances.post('/product/creating', data);
}

export const deleteMultipleProduct = async (id: any) => {
  return await intances.post('/product/deleteMultiple', id);
}
