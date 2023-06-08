import { isAuthentication } from "../auth/getToken";
import { Iusers } from "../interfaces/user";
import intances from "./instances";
declare var Promise: any;
export const resgister = async (data: any) => {
    return await intances.post('/signup', data);
}

export const login = async (data: any) => {
    return await intances.post("/signin", data)
}

export const getUser = async (): Promise<Iusers[]> => {
    return await intances.get("user")
}

export const getAuth = async (id: string): Promise<Iusers> => {
    return await intances.get("user_one/" + id);
}

export const deleteAuth = async (id: string): Promise<Iusers> => {
    return await intances.delete("removeUser/" + id);
}

export const editAuth = async (data: Iusers): Promise<Iusers> => {
    return await intances.put(`user/${data._id}`, data);
}

export const importExcel = async (data: Iusers): Promise<Iusers> => {
    return await intances.post('user/creating', data)
}

export const findCartByUser = async (id: string): Promise<Iusers> => await intances.get(`user/cart/${id}`)