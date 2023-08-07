import React from "react"
import { message } from 'antd'

export const NotUpdate = () => {
  return (
    <div className="h-screen text-white">
      Chưa cập nhật
    </div>
  )
}


export const Warning = (props) => {
  return (
    message.warning(props)
  )
}
