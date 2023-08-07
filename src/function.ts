export const filterCate = (states: any, id: any) => {
  const data = states ? states.find((item: any) => item._id == id) : "";
  return data
}

export const urlSwr = 'http://localhost:8000/api';