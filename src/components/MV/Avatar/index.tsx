import React, { memo } from 'react'
import { Avatar } from 'antd';
const MVAvatar = memo(({ title, src, size, ...rest }:any) => {
  return (
    <div title={title} style={{ cursor: 'pointer' }}>
      <Avatar
        src={src}
        size={size}
        {...rest}
      />
    </div>
  )
})

export default MVAvatar