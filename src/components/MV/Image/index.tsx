import React from 'react'
import { Image } from 'antd';
const MVImage = ({ src, width, ...rest }) => {
  return (
    <Image
      width={width}
      src={src}
    />
  )
}

export default MVImage