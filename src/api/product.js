import intances from "./instances"

export const getAllProduct = async () => {
  return await intances.get('products');
}

export const getOneProduct = async (id) => {
  return await intances.get(`product/${id}`)
}