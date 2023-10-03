import React, { memo } from "react";
import { Row } from "antd";
const MVRow = memo(({ gutter, justify, align, children, ...rest }: any) => {
  return (
    <Row gutter={gutter} justify={justify} align={align} {...rest}>
      {children}
    </Row>
  );
});

export default MVRow;
