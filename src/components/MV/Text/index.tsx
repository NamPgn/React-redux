import Text from "antd/es/typography/Text";
import React, { memo } from "react";
const MVText = memo(({ level, children, ...rest }: any) => {
  return (
    <Text {...rest}>
      {children}
    </Text>
  );
});

export default MVText;
