import React, { useContext } from 'react'
import { MainContent } from './style'
import { MyContext } from '../context';

const Main = ({ children, ...rest }) => {
  const { background } = useContext(MyContext) || {};
  return (
    <MainContent background={background && (background.data.url)} {...rest}>{children}</MainContent>
  )
}

export default Main