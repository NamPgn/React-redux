import React from "react";
import MVAvatar from "../../../MV/Avatar";
import AuthLogged from "../../../OptionsAuth/AuthLogged";
import { UserOutlined } from "@ant-design/icons";
import AuthUnLogger from "../../../OptionsAuth/AuthUnLogger";
import { Popover } from "antd";
import MVTitle from "../../../MV/Title";
const AuthHeader = ({ Auth, isLoggedInState, user, style }) => {
  const contentAuthLooger = user && <AuthLogged user={user} />;
  const contentAuthunLooger = user && <AuthUnLogger />;
  return (
    <React.Fragment>
      {Auth && isLoggedInState ? (
        <Popover
          content={contentAuthLooger}
          title={
            <MVTitle
              style={{
                textTransform: "uppercase",
              }}
              secondary
              level={5}
            >
              {user?.username}
            </MVTitle>
          }
          placement="bottomLeft"
          trigger="click"
        >
          <MVAvatar title={user?.name} src={user && user.image} size={40} />
        </Popover>
      ) : (
        <Popover
          content={contentAuthunLooger}
          title={
            <MVTitle
              style={{
                textTransform: "uppercase",
              }}
              secondary
              level={5}
            >
              {"Hi"}
            </MVTitle>
          }
          placement="bottom"
          trigger="click"
        >
          <MVAvatar
            title={user?.name}
            src={undefined}
            style={style}
            size={40}
            icon={<UserOutlined />}
          />
        </Popover>
      )}
    </React.Fragment>
  );
};

export default AuthHeader;
