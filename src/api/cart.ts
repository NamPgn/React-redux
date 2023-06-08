import { Icart } from "../interfaces/cart";
import intances from "./instances";
declare var Promise: any;
export const getAllCart = async (): Promise<Icart[]> => await intances.get('/cart');
export const addCart = async (data: Icart): Promise<Icart> => await intances.post('/cart', data);
export const deleteCart = async (id: string, userId: any): Promise<Icart> => await intances.post(`/cart/${id}`, userId);