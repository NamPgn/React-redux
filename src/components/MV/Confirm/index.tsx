import { Popconfirm } from 'antd'
import React, { memo } from 'react'
import Error from '../../Message/Error';

const MVConfirm = memo(({ title, cancelText, okText, onConfirm, children, ...rest }: any) => {
  const cancel = () => {
    Error('Hủy');
  }
  return (
    <Popconfirm
      title={title}
      onCancel={cancel}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
      {...rest}
    >{children}</Popconfirm>
  )
})

export default MVConfirm