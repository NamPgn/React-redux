import React from "react";
import { Link } from "react-router-dom";

const MVLink = ({ to, children, ...rest }) => {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default MVLink;
