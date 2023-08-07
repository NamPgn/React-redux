import { Button } from "antd";
import React from "react";

export const MyButton = ({ children, ...rest }) => {
  return (
    <Button {...rest}>{children}</Button>
  )
}