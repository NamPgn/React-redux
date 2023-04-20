import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const SeriDetailProducts = ({ seriProduct }) => {
  const { id } = useParams();
  //chi tiết tập phìm khi vào trăng xem phim
  return (
    <Divstyled className='product_seri_item_deltail'>
      {
        seriProduct.map((item) => {
          return <Divstyled key={item._id} className='mt-2'>
            <Link to={'/d/' + item._id + `?c=${item.category}` + `?n=${item.name}/tập/${item.seri}`} >
              {
                item._id == id ? <BtnStyled className='btnMovieSeri d-flex text-dark bg-light' >
                  <span>Tập {item.seri}</span>
                </BtnStyled> : <BtnStyled className='btnMovieSeri'>Tập {item.seri}</BtnStyled>
              }
            </Link>
          </Divstyled>
        })
      }
    </Divstyled>
  )
}

export default SeriDetailProducts
