import React from 'react'
import { Select } from 'antd';
const MySelect = ({ defaultValue, placeholder, style, options, ...rest }) => {
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      style={style}
      options={options}
      allowClear
      {...rest}
    />
  )
}

export default MySelect