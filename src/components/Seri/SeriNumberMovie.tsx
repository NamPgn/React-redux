import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { urlSwr } from '../../function';
import { useSWRWithAxios } from '../../hook/Swr';
import styled from 'styled-components';
import { Loader } from '../Message/Loading';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const BtnStyled = styled.button`
padding: 9px 20px;
background: #000;
font-size: 15px;
border-radius: 3px;
`;
const DivstyledContent = styled.div`
background: #00000052;
padding: 20px;
border-radius: 2px;
`
const SeriNumberMovie = () => {
  //còn đây là khi vào danh mục để list tâp phim
  const { id } = useParams();
  const { data, error, isLoading }: any = useSWRWithAxios(urlSwr + `/category/products/${id}`);
  const datas = [...data ? data : ""].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1);
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <div>Lỗi rồi</div>
  }
  return (
    <DivstyledContent>
      <Divstyled className='product_seri_item'>
        {
          datas.length > 0 && datas ? datas.map((item, index) => {
            return <Divstyled style={{ textAlign: "center", }} key={index}>
              <Link to={
                '/d/' + item._id + `?c=${item.category}` + "?n=" + `${item.name + " " + item.seri} `
              }>
                {item.trailer ? <BtnStyled type="button" className="btn d-flex  btn-dark " >
                  <SpanStyled>
                    {item.seri}
                  </SpanStyled>
                  <SpanStyled >
                    Raw
                  </SpanStyled>
                </BtnStyled>
                  : <BtnStyled type="button" className="" >{item.seri}</BtnStyled>
                }
              </Link>
            </Divstyled>
          }) : <Divstyled className='des'>
            <Divstyled style={{ padding: "5px", border: "1px solid #999", fontSize: "12px" }}>Chưa cập nhật!</Divstyled>
          </Divstyled>
        }
      </Divstyled>
    </DivstyledContent>
  )
}

export default SeriNumberMovie
