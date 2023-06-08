
import useSWR from 'swr';
import intances from '../api/instances';

const baseFetcher = async (url: string) => await intances.get(url);
export const useSWRWithAxios = (url:string) => {
  const { data, error, mutate } = useSWR(url, baseFetcher);
  return {
    data: data ? data.data : "",
    isLoading: !data && !error,
    isError: error,
    mutate,
  }
}

