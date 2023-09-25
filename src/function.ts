import { logout } from "./redux/slice/userSlice";

export const filterCate = (states: any, id: any) => {
  const data = states ? states.find((item: any) => item._id == id) : "";
  return data
}

export const urlSwr = import.meta.env.VITE_DATABASE;

export const handleLogout = (dispatch, redirect) => {
  dispatch(logout());
  redirect('/');
}