import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const { token } = isAuthentication();
export const deleteTypeByProducts = async (id, body) => {
  return intances.post(`/type/${id}/${token.user._id}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const pushCateTotype=async(id,body)=>await intances.post(`/push/category/type/${id}`,body)