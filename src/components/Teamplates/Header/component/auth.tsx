import React from "react";
import MVAvatar from "../../../MV/Avatar";
import AuthLogged from "../../../OptionsAuth/AuthLogged";
import { UserOutlined } from "@ant-design/icons";
import AuthUnLogger from "../../../OptionsAuth/AuthUnLogger";
import { handelChangeAuthOptions } from "../../../Dom";

const AuthHeader = ({ Auth, isLoggedInState, user, style, ...rest }) => {
  const { state, handleClick } = handelChangeAuthOptions();
  return (
    <React.Fragment>
      {Auth && isLoggedInState ? (
        <div className="relative">
          <MVAvatar
            title={user?.name}
            src={user && user.image}
            onClick={handleClick}
            size={40}
          />
          {state && <AuthLogged user={user} />}
        </div>
      ) : (
        <div className="relative">
          <MVAvatar
            title={user?.name}
            src={undefined}
            style={style}
            onClick={handleClick}
            size={40}
            icon={<UserOutlined />}
          />
          {state && <AuthUnLogger />}
        </div>
      )}
    </React.Fragment>
  );
};

export default AuthHeader;
