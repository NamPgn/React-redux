import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { GlobalStyle } from "./components/Styled/Global";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FloatButton } from "antd";
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
  // const [showToast, setShowToast] = useState(false);
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
    {alert(
      " Xin lỗi, server phim hiện đang quá tải do lượng truy cập lớn. Vui lòng chờ đợi trong 1-2 phút để tiếp tục xem. Chúng tôi đang nỗ lực để cải thiện tình hình và xin thành thật xin lỗi vì sự bất tiện này.Trân trọng!"
    )}
  }, []);

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
