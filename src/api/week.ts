import { isAuthentication } from "../auth/getToken";
import intances from "./instances"
const dataToken = isAuthentication();
export const addWeeks = async (data: any) => {
  return await intances.post(`/week/${dataToken.user._id}`, data, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}

export const removeWeeks = async (id: any) => {
  return await intances.delete(`/week/${id}/${dataToken.user._id}`, {
    headers: {
      "Authorization": `Bearer ${dataToken.token}`
    }
  })
}