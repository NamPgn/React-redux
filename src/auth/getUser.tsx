import { useEffect, useState } from "react";
import { isAuthentication } from "./getToken";
import { urlSwr } from "../function";
import { useSWRWithAxios } from "../hook/Swr";
const Auth = isAuthentication();
const getUser = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData]: any = useState('');
  const { data }:any = Auth ? useSWRWithAxios(urlSwr + `/user_one/${Auth.user._id}`) : '';
 
  return {
    User: data,
  }
}

export default getUser