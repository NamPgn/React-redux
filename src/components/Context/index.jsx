import React, { createContext } from 'react'
import { urlSwr } from '../../function';
import { useSWRWithAxios } from '../../hook/Swr';
import { useParams } from 'react-router-dom';

export const MyContext = createContext();

export const MyContextProvider = (props) => {
  const { id } = useParams();
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys`);
  const { data: seri, isLoading: loadingSeri } = useSWRWithAxios(urlSwr + `/types`);
  const value = {
    category,
    isLoading,
    seri,
    loadingSeri,
  }
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  )
}