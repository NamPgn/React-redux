import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { router } from "./router";
import { GlobalStyle } from "./components/Styled/Global";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FloatButton, ConfigProvider } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "tailwindcss/tailwind.css";
import { isAuthentication } from "./auth/getToken";
import { isTokenExpired } from "./auth/checkToken";
import { refreshTokenAuth } from "./sevices/user";
import { MVWarning } from "./components/Message";

function App() {
  const route: any = useRoutes(router);
  const nav = useNavigate();
  const location = useLocation();
  const Auth = isAuthentication();

  // Ant Design Theme Configuration
  const antdTheme = {
    token: {
      borderRadius: 2,
    },
  };

  // Hàm kiểm tra và refresh token
  const checkAndRefreshToken = async () => {
    if (!Auth) return;

    const token = Auth.token;
    const refreshToken = Auth.refreshToken;

    // Kiểm tra refresh token trước
    if (isTokenExpired(refreshToken)) {
      MVWarning("Token expires-relogin");
      localStorage.clear();
      nav("/signin");
      return;
    }

    // Nếu access token hết hạn thì refresh
    if (isTokenExpired(token)) {
      try {
        const tokenPayload = {
          refreshToken: Auth.refreshToken,
        };
        const { data } = await refreshTokenAuth(tokenPayload);
        
        // Cập nhật token mới vào localStorage
        const updatedAuth = {
          ...Auth,
          token: data.token || data.accessToken || data,
        };
        localStorage.setItem("token", JSON.stringify(updatedAuth));
      } catch (error) {
        console.error("Refresh token failed:", error);
        MVWarning("Session expired - please login again");
        localStorage.clear();
        nav("/signin");
      }
    }
  };

  // Chạy khi component mount
  useEffect(() => {
    checkAndRefreshToken();
  }, []);

  // Chạy mỗi khi chuyển page (location thay đổi)
  useEffect(() => {
    checkAndRefreshToken();
  }, [location.pathname]);

  return (
    <ConfigProvider theme={antdTheme}>
      {route}
      <GlobalStyle />
      <ToastContainer />
      <FloatButton.BackTop visibilityHeight={200} />
    </ConfigProvider>
  );
}

export default App;