import React, { createContext } from 'react'
import { urlSwr } from '../../function';
import { useSWRWithAxios } from '../../hook/Swr';
import { useParams } from 'react-router-dom';

export const MyContext = createContext();

export const MyContextProvider = (props) => {
  const { id } = useParams();
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys`);
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


    
  }
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  )
}