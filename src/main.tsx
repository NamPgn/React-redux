import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store/store";
import { ChangeContextProvider, MyContextProvider } from "./context";
import { ProvidersNext } from "./providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ProvidersNext>
      <MyContextProvider>
        <ChangeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChangeContextProvider>
      </MyContextProvider>
    </ProvidersNext>
  </Provider>
);
