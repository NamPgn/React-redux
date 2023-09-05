import React, { createContext, useEffect, useState } from 'react'
import { urlSwr } from '../function';
import { useSWRWithAxios } from '../hook/Swr';
import { isAuthentication } from '../auth/getToken';
import { useAppDispatch, useAppSelector } from '../hook';
import { getUser_id } from '../redux/slice/userSlice';

const Auth: any = isAuthentication();

export const MyContext = createContext(null);
export const MyContextProvider = (props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const isLoggedIn = localStorage.getItem('isLogin');
  const isLoggedInState = useAppSelector(state => state.user.isLogin);
  const loandingCart = useAppSelector(state => state.user.isLoading);
  const [reset, setReset] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (Auth) {
      dispatch(getUser_id(Auth.user._id));
    }
  }, [isLoggedInState, dispatch, reset, rerender]);
  const { data: weeks } = useSWRWithAxios(urlSwr + '/weeks');

  const { data: background } = useSWRWithAxios(urlSwr + '/background');
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys?page=${page}`);
  const { data: seri, isLoading: loadingSeri } = useSWRWithAxios(urlSwr + `/types`);
  const { data: categorymain, isLoading: LoadingCateMain, isError } = useSWRWithAxios(urlSwr + `/categorymain`);
  const value = {
    //danh mục phim nhiều tập
    category,
    isLoading,
    //sibarr
    seri,
    loadingSeri,
    //phim lẻ phim 1 tập
    categorymain,
    LoadingCateMain,
    isError,

    //user
    Auth: Auth ? Auth : "",
    user,
    isLoggedIn,
    isLoggedInState,
    loandingCart,
    setReset,
    setRerender,

    //background
    background,

    //weekCategory
    weeks,
    setPage,
    page
  }
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  )
}

export const ChangeContext = createContext(null);
export const ChangeContextProvider = (props) => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
  }

  var value = {
    handleClick,
    state
  }
  return <ChangeContext.Provider value={value}>
    {props.children}
  </ChangeContext.Provider>
}


