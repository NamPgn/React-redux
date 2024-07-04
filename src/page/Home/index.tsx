import React, { useContext, useEffect } from "react";
import ConfigHomePage from "./Container/Config";
import { Spiner } from "../../components/Message/Notification";
import { useAppDispatch, useAppSelector } from "../../hook";
import { getAllcate } from "../../redux/slice/category/thunk/category";
import { MyContext } from "../../context";
const HomePage = () => {
  const { data } = useAppSelector((state) => state.category.category);
  const isLoading = useAppSelector((state) => state.category.isLoading);
  const isError = useAppSelector((state) => state.category.isError);
  const { state } = useContext(MyContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllcate(1));
    document.title = "Hoạt hình trung quốc";
  }, []);
  return (
    <>
      {!isLoading ? (
        <ConfigHomePage
          category={data}
          isLoading={isLoading}
          isError={isError}
          state={state}
        />
      ) : (
        <Spiner size="large" children={undefined} />
      )}
    </>
  );
};

export default HomePage;
