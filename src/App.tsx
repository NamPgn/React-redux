import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { GlobalStyle } from "./components/Styled/Global";
import { useNavigate, useRoutes } from "react-router-dom";
import { FloatButton, notification } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "tailwindcss/tailwind.css";
import { isAuthentication } from "./auth/getToken";
import { isTokenExpired } from "./auth/checkToken";
import { refreshTokenAuth } from "./sevices/user";
import { MVWarning } from "./components/Message";
function App() {
  const Routes = useRoutes(router);
  const nav = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const Auth = isAuthentication();
  useEffect(() => {
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

    setTimeout(() => {
      api.open({
        message: "Quản trị viên xin thông báo!",
        description:
          "Xin lỗi, server phim hiện đang quá tải do lượng truy cập lớn. Vui lòng chờ đợi trong 1-2 phút để tiếp tục xem. Chúng tôi đang nỗ lực để cải thiện tình hình và xin thành thật xin lỗi vì sự bất tiện này. Trân trọng!",
        className: "custom-class",
        duration: 10,
      });
    }, 1000);
  }, []);
  return (
    <>
      {contextHolder}
      {Routes}
      <GlobalStyle />
      <ToastContainer />
      <FloatButton.BackTop visibilityHeight={200} />
    </>
  );
}

export default App;
