import React, { useContext } from "react";
import { MainContent } from "./style";
import { ApiContext } from "../context/api";

const Main = ({ children, ...rest }) => {
  const { background } = useContext(ApiContext) || {};
  return (
    <MainContent background={background && background.data.url} {...rest}>
      {children}
    </MainContent>
  );
};

export default Main;
