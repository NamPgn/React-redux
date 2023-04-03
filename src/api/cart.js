import intances from "./instances";

export const getAllCart = async () => await intances.get('/cart');
export const addCart = async (data) => await intances.post('/cart', data);