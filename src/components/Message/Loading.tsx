import React from 'react';
import styed from 'styled-components';
const LoadingStyled = styed.div`
color: #fff;
text-align: center;
font-size: 15px;
display: flex;
justify-content: center !important;
align-items: center;
height: 100vh;
width: 100%;
`
export const Loading = () => {
  return (
    <LoadingStyled>Loading...</LoadingStyled>
  )
}

export const Loader = () => {
  return (
    <LoadingStyled>Chờ 1 chút...</LoadingStyled>
  )
}

export const MessageErr = () => {
  return <LoadingStyled>Lỗi rồi kiểm tra lại mạng của bạn hoặc tải lại trang...</LoadingStyled>
}