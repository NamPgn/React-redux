import React from 'react'
import { Divider } from 'antd';
const Dividers = ({ orientation, children, ...rest }) => {
  return (
    <Divider style={{
      color:"#fff",
      borderBlockStartColor:"#999"
    }} className='text-white' orientation={orientation}>{children}</Divider>
  )
}

export default Dividers