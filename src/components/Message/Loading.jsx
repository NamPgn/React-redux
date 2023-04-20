import React from 'react';
import styed from 'styled-components';
const LoadingStyled = styed.div`
color: #fff;
text-align: center;
font-size: 15px;
margin-top: 20%;
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