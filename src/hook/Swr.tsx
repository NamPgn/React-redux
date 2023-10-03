import useSWR from "swr";
import intances from "../sevices/instances";

const baseFetcher = async (url: string) => await intances.get(url);

// const localStorageCache = {
//   get: (key) => {
//     const value = window.localStorage.getItem(key);
//     return value ? JSON.parse(value) : null;
//   },
//   set: (key, value) => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   },
//   delete: (key) => {
//     window.localStorage.removeItem(key);
//   },
//   clear: () => {
//     window.localStorage.clear();
//   }
// };

export const useSWRWithAxios = (url: string) => {
  const { data, error, mutate } = useSWR(url, baseFetcher);
  return {
    data: data ? data.data : "",
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useSwrId = (url, id) => {
  const { data, error, isLoading } = useSWR(url + `${id}`, baseFetcher);
  return {
    user: data,
    isLoading: isLoading,
    isError: error,
  };
};
