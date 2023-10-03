import { isAuthentication } from "../auth/getToken";
import intances from "./instances";
const token = isAuthentication();
export const deleteCatemainByProduct = async (id: any, body: any) =>
  await intances.post(`/categorymain/${id}/${token.user._id}`, body, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });
