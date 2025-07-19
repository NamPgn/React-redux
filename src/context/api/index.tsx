import React, { createContext, useState } from "react";
import { useSWRWithAxios } from "../../hook/Swr";
import { urlSwr } from "../../function";

export const ApiContext = createContext(null);
export const ApiContextProvider = (props) => {
  const [page, setPage] = useState(1);
  const { data: weeks } = useSWRWithAxios(urlSwr + "/weeks", {
    revalidateOnFocus: true,
    dedupingInterval: 300000,
  });



  // const {
  //   data: categorymain,
  //   isLoading: LoadingCateMain,
  //   isError,
  // } = useSWRWithAxios(urlSwr + `/categorymain`);
  const value = {
    //danh mục phim nhiều tập
    //phim lẻ phim 1 tập
    // categorymain,
    // LoadingCateMain,
    // isError,

    //background

    //weekCategory
    weeks,
    setPage,
    page,
  };
  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
};
