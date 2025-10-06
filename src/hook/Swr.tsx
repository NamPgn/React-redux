import useSWR from "swr";
import instances from "../sevices/instances";

const baseFetcher = async (url: string) => await instances.get(url);

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

export const useSWRWithAxios = (url: string, options?: {
  cacheTime?: number;
  dedupingInterval?: number;
  revalidateOnFocus?: boolean;
}) => {
  const { data, error, mutate } = useSWR(url, baseFetcher, {
    dedupingInterval: options?.dedupingInterval ?? 120000, // mặc định: 60s
    revalidateOnFocus: options?.revalidateOnFocus ?? false,  
    keepPreviousData: true, // giữ data cũ khi loading data mới
  });
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
