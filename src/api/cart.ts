import { isAuthentication } from "../auth/getToken";
import { Icart } from "../interfaces/cart";
import intances from "./instances";
declare var Promise: any;
const Auth = isAuthentication();
export const getAllCart = async (): Promise<Icart[]> => await intances.get('/cart');
export const addCart = async (data: Icart): Promise<Icart> => await intances.post(`/cart/${Auth.user._id}`, data, {
  headers: {
    "Authorization": `Bearer ${Auth.token}`
  }
});
export const deleteCart = async (id: string, userId: any): Promise<Icart> => await intances.post(`/cart/${id}/${Auth.user._id}`, userId, {
  headers: {
    "Authorization": `Bearer ${Auth.token}`
  }
});