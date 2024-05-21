import React, { useContext, useEffect } from "react";
import ConfigHomePage from "./Container/Config";
import { MyContext } from "../../context";
import { Spiner } from "../../components/Message/Notification";
const HomePage = () => {
  const { category, isLoading, isError, state }: any =
    useContext(MyContext) ?? {};

  return (
    <>
      {!isLoading ? (
        <ConfigHomePage
          category={category?.data}
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
