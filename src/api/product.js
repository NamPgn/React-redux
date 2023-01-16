import intances from "./instances"

export const getAllProduct = async () => {
  return await intances.get('products');
}

export const getOneProduct = async (id) => {
  return await intances.get(`product/${id}`)
}

export const deleteProductById = async (id) => {
  return await intances.delete(`/product/${id}`);
}

export const addProductData = async (data) => {
  return await intances.post('/product', data);
}

export const editProductData = async (data) => {
  // console.log("data",);
  return await intances.put(`/product/${data.get('_id')}`, data);
}

export const importData= async (data)=>{
  return await intances.post('/product/creating',data);
}