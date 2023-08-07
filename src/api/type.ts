import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const  Auth  = isAuthentication();
export const deleteTypeByProducts = async (id, body) => {
  return intances.post(`/type/${id}/${Auth.user._id}`, body, {
    headers: {
      "Authorization": `Bearer ${Auth.token}`
    }
  })
}

export const pushCateTotype = async (id, body) => await intances.post(`/push/type/category/${id}/${Auth.user._id}`, body, {
  headers: {
    "Authorization": `Bearer ${Auth.token}`
  }
})