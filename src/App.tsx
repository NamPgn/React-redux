import React from "react";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { GlobalStyle } from "./components/Styled/Global";
import { useRoutes } from "react-router-dom";
import { FloatButton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
function App() {
  const Routes = useRoutes(router);
  return (
    <>
      {Routes}
      <GlobalStyle />
      <ToastContainer />
      <FloatButton.BackTop visibilityHeight={200} />
    </>
  );
}

export default App;
