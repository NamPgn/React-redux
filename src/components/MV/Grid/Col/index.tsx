import React from "react";
import { Col } from "antd";
const MVCol = ({ children, ...rest }) => {
  return <Col {...rest}>{children}</Col>;
};

export default MVCol;
