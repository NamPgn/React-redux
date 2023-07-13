import React, { useContext } from 'react';
import styed from 'styled-components';
import { Skeleton } from 'antd';
import { MyContext } from '../../context';
import { Spin } from 'antd';
const LoadingStyled = styed.div`
height: 100vh;
`

const LoadingErr = styed.div`
position: relative;
height: 100vh;
justify-content: center;
display: flex;
&>*{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
`
export const Loading = () => {
  return (
    <LoadingStyled />
  )
}

export const Loader = () => {
  const { state } = useContext(MyContext);
  return (
    <Skeleton
      className={state ? 'w-11/12' : 'w-10/12'}
      active
      title={{ width: "20%" }}
      paragraph={{
        rows: 8,
        width: [300, 200, 400, 100]
      }}
      loading
      style={{ height: "100vh", padding: "0 30px" }}
    />
  )
}



export const MessageErr = () => {
  return <LoadingErr>
    <div>Lỗi rồi kiểm tra lại mạng của bạn hoặc tải lại trang...</div>
  </LoadingErr>
}

export const Spiner = () => (
  <Spin />
)