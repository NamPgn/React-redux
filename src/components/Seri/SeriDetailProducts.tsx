import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components';
const Divstyled = styled.div``;
const BtnStyled = styled.button`
  background-color: rgb(0 0 0 / 24%);
  border-radius: .2rem;
  text-align: -webkit-center;
  text-align: center;
  color: #111827;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 600;
  padding: 0.5rem 0.5rem;
  text-align: center;
  cursor: pointer;
  color: #fff;
  @media (min-width: 768px){
    padding: .6rem .6rem;
    font-size: .875rem;
  }
`;
const SeriDetailProducts = ({ seriProduct }) => {
  //chi tiết tập phìm khi vào trăng xem phim
  return (
    <Divstyled className='product_seri_item_deltail md:gap-2 lg:gap-3 gap-1' >
      {
        seriProduct.map((item: any, index: any) => {
          return <Divstyled key={index} className='mt-2 activeSeriNumber'>
            <NavLink to={'/d/' + item._id + `?c=${item.category}` + `?n=${item.name}/tập/${item.seri}`} >
              <BtnStyled className={item.seri ? 'btnMovieSeri d-flex text-dark bg-light w-full justify-center' : ""} >
                <span> {item.seri ? 'Tập ' + item.seri : ""}</span>
              </BtnStyled>
            </NavLink>
          </Divstyled>
        })
      }
    </Divstyled>
  )
}

export default SeriDetailProducts
