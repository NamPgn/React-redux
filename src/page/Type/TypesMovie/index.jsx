import React from 'react'
import styled from 'styled-components';
import Series from '../../../components/TypeComponent';

export const TypeStyled = styled.div`
height: 100vh;
color: #fff;
`;



const TypesMovie = () => {
  return (
    <TypeStyled className='col-md-10'>
      <Series />
    </TypeStyled>
  )
}

export default TypesMovie