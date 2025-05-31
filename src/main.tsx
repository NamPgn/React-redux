import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./redux/store/store";
import { MyContextProvider } from "./context";
import { ApiContextProvider } from "./context/api";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ApiContextProvider>
          <MyContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MyContextProvider>
        </ApiContextProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
