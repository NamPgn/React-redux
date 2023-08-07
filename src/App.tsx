import React from 'react';
import { ToastContainer } from "react-toastify";
import { router } from './router';
import { GlobalStyle } from './components/Styled/Global';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { useRoutes } from "react-router-dom";
import { FloatButton } from 'antd';
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer />
      {useRoutes(router)}
      <FloatButton.BackTop visibilityHeight={200} />
    </div>
  )
}

export default App