import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { fetchData } from "../redux/slice/fetchData/fetchData";

type UseFetchDataProps = {
  key: string; // Key duy nhất cho từng màn hình
  id?: string; // Có thể có id nếu màn hình cần
  page?: number; // Nếu cần phân trang, có thể có page
  shouldFetch?: boolean; // Điều kiện để gọi API, mặc định là true
};

const useFetchData = ({
  key,
  page = 1,
  id,
  shouldFetch = true,
}: UseFetchDataProps) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state.data[key]);
  const [timeout, setTime] = useState(true);
  useEffect(() => {
    if (shouldFetch && !data) {
      dispatch(fetchData({ key, page, id }));
    }
    const time = setTimeout(() => {
      setTime(false);
    }, 500);

    return () => clearTimeout(time);
  }, [key, id, page, shouldFetch, data, dispatch]);

  return { data, timeout };
};

export default useFetchData;
