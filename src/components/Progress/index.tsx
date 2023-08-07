import React from 'react'
import { Progress } from 'antd';
const MyProgress = ({percent, size,...rest}) => {
  return (
    <div>
      <Progress percent={percent} size={size} {...rest} />
    </div>
  )
}

export default MyProgress 