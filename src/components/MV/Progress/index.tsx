import React, { memo } from 'react'
import { Progress } from 'antd';
const MyProgress = memo(({ percent, size, ...rest }: any) => {
  return (
    <Progress
      percent={percent}
      size={size}
      {...rest}
    />
  )
})

export default MyProgress 