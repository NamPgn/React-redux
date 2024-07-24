import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { router } from "./router";
import { GlobalStyle } from "./components/Styled/Global";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FloatButton, message, notification } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "tailwindcss/tailwind.css";
import { isAuthentication } from "./auth/getToken";
import { isTokenExpired } from "./auth/checkToken";
import { refreshTokenAuth } from "./sevices/user";
import { MVWarning } from "./components/Message";
import ReactGA from "react-ga4";

function App() {
  const location = useLocation();
  const TRACKING_ID = "G-0EEY3R7F0S";
  const Routes = useRoutes(router);
  const nav = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [showToast, setShowToast] = useState(false);
  const Auth = isAuthentication();
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
      title: "User Active",
    });
    (async () => {
      if (Auth) {
        const token = Auth.token;
        const refreshToken = Auth.refreshToken;
        if (isTokenExpired(refreshToken)) {
          MVWarning("Token expires-relogin");
          localStorage.clear();
          nav("/signin");
        } else {
          if (isTokenExpired(token)) {
            const token = {
              refreshToken: Auth.refreshToken,
            };
            const { data } = await refreshTokenAuth(token);
            localStorage.setItem("token", JSON.stringify(data));
          }
        }
      }
    })();

    const timer = setTimeout(() => {
      setShowToast(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  setTimeout(() => {
    setShowToast(false);
  }, 5000);
  return (
    <>
      {showToast && (
        <div
          id="toast-warning"
          className="flex transition-all gap-3 custom-toast items-center w-full max-w-lg p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Xin lỗi, server phim hiện đang quá tải do lượng truy cập lớn. Vui
            lòng chờ đợi trong 1-2 phút để tiếp tục xem. Chúng tôi đang nỗ lực
            để cải thiện tình hình và xin thành thật xin lỗi vì sự bất tiện này.
            Trân trọng!
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-warning"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
      {contextHolder}
      {Routes}
      <GlobalStyle />
      <ToastContainer />
      <FloatButton.BackTop visibilityHeight={200} />
    </>
  );
}

export default App;
