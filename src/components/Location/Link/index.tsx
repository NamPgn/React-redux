import React from "react";
import { Link } from "react-router-dom";

const MVLink = ({ to, children, ...rest }) => {
  return (
    <Link to={to} {...rest} className="link" >
      {children}
    </Link>
  );
};

export default MVLink;
