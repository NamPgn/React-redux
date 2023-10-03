import Title from "antd/es/typography/Title";
import React, { memo } from "react";

const MVTitle = memo(({ level, children, ...rest }: any) => {
  return (
    <Title level={level} {...rest}>
      {children}
    </Title>
  );
});

export default MVTitle;
