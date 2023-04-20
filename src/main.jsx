import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import 'antd/dist/reset.css';
import { Provider } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store/store';
import { MyContextProvider } from './components/Context';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </MyContextProvider>
  </React.StrictMode>
)
