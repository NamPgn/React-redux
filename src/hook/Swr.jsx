
import useSWR from 'swr';
import intances from '../api/instances';
const baseFetcher = async (url) => await intances.get(url);
export const useSWRWithAxios = (url) => {
  const { data, error, mutate } = useSWR(url, baseFetcher);
  return {
    data: data ? data.data : "",
    isLoading: !data && !error,
    isError: error,
    mutate,
  }
}