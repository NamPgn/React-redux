import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
export const resgister = async (data) => {
    return await intances.post('/signup', data);
}

export const login = async (data) => {
    return await intances.post("/signin", data)
}

export const getUser = async () => {
    return await intances.get("user")
}

export const getAuth = async (id) => {
    return await intances.get("user/" + id);
}

export const deleteAuth = async (id) => {
    return await intances.delete("removeUser/" + id);
}

export const editAuth = async (data) => {
    return await intances.put(`user/${data._id}`, data);
}

export const importExcel = async (data) => {
    return await intances.post('user/creating', data)
}

export const findCartByUser = async (id) => await intances.get(`user/cart/${id}`)