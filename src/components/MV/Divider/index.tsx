import React, { memo } from 'react'
import { Divider } from 'antd';
const Dividers = memo(({ textColor, orientation, children, ...rest }: any) => {
  return (
    <Divider style={{
      color: textColor,
      borderBlockStartColor: "#999"
    }}
      className='text-white'
      orientation={orientation}
      {...rest}
    >{children}</Divider>
  )
})

export default Dividers