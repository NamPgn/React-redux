import React, { memo } from "react";
import { Select } from "antd";
const MySelect = memo(
  ({ defaultValue, placeholder, style, options, ...rest }: any) => {
    return (
      <Select
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={style}
        options={options}
        allowClear
        {...rest}
      />
    );
  }
);

export default MySelect;
