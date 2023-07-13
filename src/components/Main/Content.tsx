import moment from 'moment'
import React from 'react'

const Content = ({getOneProductDetail}) => {
  return (
    <>
      <div style={{ color: "#fff", margin: "10px 0" }}>
        {
          getOneProductDetail.seri ? getOneProductDetail.trailer ? 'Trailer ' + getOneProductDetail.seri : 'Tập ' + getOneProductDetail.seri : ""
        }
      </div>
      <div className='des'>
        <p>Ngày đăng: {moment(getOneProductDetail.uploadDate).format('LTS DD-MM-YYYY')}</p>
      </div>
      <div style={{ color: "#fff", margin: "10px 0" }} className='des'>
        <p>
          <i className="fa-solid fa-eye mr-1"></i>
          {getOneProductDetail.price} Lượt xem
        </p>
      </div>

      <div className='p-3 mt-3 mb-3 text-white rounded' style={{ background: "rgb(0 0 0 / 47%)" }}>
        Copyright video : <a href={getOneProductDetail.LinkCopyright} className='text-primary'>  {getOneProductDetail.copyright} </a>
      </div>
    </>
  )
}

export default Content