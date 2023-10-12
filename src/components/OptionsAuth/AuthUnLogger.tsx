import React from "react";
import { AccountStyle } from "./styles";
import { LoginOutlined, SmileOutlined } from "@ant-design/icons";
import MVLink from "../Location/Link";
import MVRow from "../MV/Grid";
import MVCol from "../MV/Grid/Col";
import MVText from "../MV/Text";

const AuthUnLogger = () => {
  return (
    <MVLink to={"/auth/signin"}>
      <MVRow align={"middle"} gutter={[12, 12]}>
        <MVCol>
          <SmileOutlined />
        </MVCol>
        <MVCol>
          <MVText level={6} className="auth">
            Signin
          </MVText>
        </MVCol>
      </MVRow>
    </MVLink>
  );
};

export default AuthUnLogger;
