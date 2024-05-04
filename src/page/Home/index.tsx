import React, { useContext } from "react";
import ConfigHomePage from "./Container/Config";
import { MyContext } from "../../context";
import { Spiner } from "../../components/Message/Notification";
import MVRow from "../../components/MV/Grid";

const HomePage = () => {
  const { category, isLoading, isError, state }: any =
    useContext(MyContext) ?? {};
  return (
    <React.Fragment>
      {!isLoading ? (
        <React.Fragment>
          <MVRow align="middle"></MVRow>
          <ConfigHomePage
            category={category?.data}
            isLoading={isLoading}
            isError={isError}
            state={state}
          />
        </React.Fragment>
      ) : (
        <Spiner size="large" children={undefined} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
