import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import 'antd/dist/reset.css';
import { Provider } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store/store';
import { AuthContextProvider, MyContextProvider } from './context';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </AuthContextProvider>
    </MyContextProvider>
  </React.StrictMode>
)
