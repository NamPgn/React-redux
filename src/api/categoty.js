import intances from "./instances"

export const getAllcategory = async () => {
  return await intances.get('/categorys');
}

export const getCategory = async (id) => {
  return await intances.get(`/category/${id}`);
}

export const addCate = async (data) => {
  return await intances.post('/category', data)
}

export const deleteCate = async (id) => {
  return await intances.delete('/category' + id);
}


export const updateCate = async (data) => {
  return await intances.put('/category' + data._id, data)
}

export const getCategoryProduct=async()=>{
  return await intances.get('/category/products');
}
