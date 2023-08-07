import React from 'react'
import { NavLink } from 'react-router-dom'
import { BtnStyled, DivContainerSeriDetail, Divstyled } from './styles'

const SeriDetailProducts = ({ seriProduct }) => {
  //chi tiết tập phìm khi vào trăng xem phim
  return (
    <DivContainerSeriDetail className='md:gap-2 lg:gap-3 gap-1' >
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
    </DivContainerSeriDetail>
  )
}

export default SeriDetailProducts
