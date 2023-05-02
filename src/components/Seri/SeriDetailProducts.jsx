import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const SeriDetailProducts = ({ seriProduct, typeProduct, cateMainProduct }) => {
  const { id } = useParams();
  //chi tiết tập phìm khi vào trăng xem phim
  const data = typeProduct ? typeProduct : seriProduct;
  return (
    <Divstyled className='product_seri_item_deltail'>
      {
        data.map((item, index) => {
          return <Divstyled key={index} className='mt-2'>
            <Link to={'/d/' + item._id + `?c=${item.category ? item.category : item.typeId}` + `?n=${item.name}/tập/${item.seri}`} >
              {
                item._id == id ? <BtnStyled className={item.seri ? 'btnMovieSeri d-flex text-dark bg-light' : ""} >
                  <span> {item.seri ? 'Tập ' + item.seri : ""}</span>
                </BtnStyled> : <BtnStyled className={item.seri ? 'btnMovieSeri' : ""}>{item.seri ? 'Tập ' + item.seri : ""}</BtnStyled>
              }
            </Link>
          </Divstyled>
        })
      }
    </Divstyled>
  )
}

export default SeriDetailProducts
