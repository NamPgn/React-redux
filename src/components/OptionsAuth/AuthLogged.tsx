import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hook";
import {
  LikeOutlined,
  LogoutOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { handleLogout } from "../../function";
import MVLink from "../Location/Link";
import { MVError } from "../Message";
import MVText from "../MV/Text";
import MVRow from "../MV/Grid";
import MVCol from "../MV/Grid/Col";
const AuthLogged = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCheckCart = () => {
    if (!user) {
      MVError("Bạn cần đăng nhập!");
    } else {
      navigate("/cart/user");
    }
  };
  return (
    <>
      <MVLink to={"/auth/profile"}>
        <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={12}>
          <MVCol>
            <UsergroupAddOutlined />
          </MVCol>
          <MVCol>
            <MVText level={6} className="auth">
              Your profile
            </MVText>
          </MVCol>
        </MVRow>
      </MVLink>
      <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={[12, 12]}>
        <MVCol>
          <LikeOutlined />
        </MVCol>
        <MVCol>
          <MVText
            style={{
              cursor: "pointer",
            }}
            onClick={handleCheckCart}
            className="auth"
          >
            Saved
          </MVText>
        </MVCol>
      </MVRow>
      {user && user.role >= 1 && (
        <MVLink to={"/dashboard"}>
          <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={[12, 12]}>
            <MVCol>
              <UserOutlined />
            </MVCol>
            <MVCol>
              <MVText className="auth">Admin</MVText>
            </MVCol>
          </MVRow>
        </MVLink>
      )}
      <MVRow style={{ lineHeight: "0" }} align={"middle"} gutter={[12, 12]}>
        <MVCol>
          <LogoutOutlined />
        </MVCol>
        <MVCol>
          <MVText
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleLogout(dispatch, navigate)}
          >
            Logout
          </MVText>
        </MVCol>
      </MVRow>
    </>
  );
};

export default AuthLogged;
