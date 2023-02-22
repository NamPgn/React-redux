import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
export const resgister = async (data:any) => {
    return await intances.post('signup', data);
}

export const login = async (data:any) => {
    return await intances.post("signin", data)
}

export const getUser = async () => {
    return await intances.get("user")
}

export const getAuth = async (id:any) => {
    return await intances.get("user/" + id);
}

export const deleteAuth = async (id:any ) => {
    console.log("id", id)
    return await intances.delete("removeUser/" + id);
}

export const editAuth = async (data:any) => {
    return await intances.put(`user/${data._id}`, data);
}

export const importExcel = async (data:any) => {
    return await intances.post('user/creating', data)
}