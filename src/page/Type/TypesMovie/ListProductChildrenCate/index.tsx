import React, { useState } from 'react'
import { TypeStyled } from '..'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSWRWithAxios } from '../../../../hook/Swr';
import { urlSwr } from '../../../../function';
import { DivStyledText, DivStyledTitle } from '../../../../components/TypeComponent';
import { Loader } from '../../../../components/Message/Loading';

export const DivStyled = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
@media (max-width:1024px){
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
@media (max-width:768px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
`
export const DivStyledContent = styled.div`
`
export const DivStyledItem = styled.div`
&:hover{
  cursor: pointer;
}
`
export const DivStyledImage = styled.img`
border-radius: 5px;
`
export const Div = styled.div`
width: 220px;
height: 350px;
@media(1024px){
  width: 220px;
height: 350px;
}
@media(768px){
  width: 120px;
height: 250px;
}
`

export const DivStyledTitleItem = styled.div`
margin:10px 0;
font-weight:500;
`
const ListType = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSWRWithAxios(urlSwr + `/categorymain/${id}`);
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return 'Lỗi rồi'
  }

  return (
    <TypeStyled className='col-md-10'>
      <div>
        <DivStyledText>Trang chủ - {data.name}</DivStyledText>
        <DivStyledTitle>{data.name}</DivStyledTitle>
        <DivStyledText className='mt-3'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
        <DivStyled className='mt-4'>
          {data.products && data.products.length ? data.products.map((item: any, index: number) => (
            <DivStyledContent key={index}>
              <DivStyledItem>
                <Link to={'/d/' + item._id + `?c=${item.categorymain}` + "?n=" + `${item.name + " " + item.seri} `}>
                  <Div>
                    <DivStyledImage src={item.image}></DivStyledImage>
                  </Div>
                </Link>
                <DivStyledTitleItem>{item.name}</DivStyledTitleItem>
                <DivStyledText>{data.name}</DivStyledText>
              </DivStyledItem>
            </DivStyledContent>
          )) : 'Chưa cập nhật!'}
        </DivStyled>
      </div>
    </TypeStyled>
  )
}

export default ListType