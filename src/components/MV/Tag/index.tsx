import React from "react";
import { Tag } from "antd";
const MVTags = ({ color, children, ...rest }) => {
  return (
    <Tag color={color} {...rest}>
      {children}
    </Tag>
  );
};

export default MVTags;
