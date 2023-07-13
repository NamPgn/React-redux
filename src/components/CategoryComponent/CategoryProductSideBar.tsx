import React from 'react'
import { Link } from 'react-router-dom';
import { Loader } from '../Message/Loading';
const CategoryProductSidebar = ({ category, isLoading }) => {
  const catedata = category ? category.slice(0, 4) : '';
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="nav navCate col-sm-3 des w-3/12" >
      <p style={{ color: "#fff" }}>See more</p>
      {
        catedata ? catedata.map((item: any, index: any) => <div className='d-flex categoryContent col-md-12' key={index}>
          <div style={{ maxWidth: "50px", height: "55px" }} className='w-3/12'>
            <Link
              key={index}
              to={'/q/' + item._id + `?n=${item.name}`}>
              <img
                style={{ width: "100%", objectFit: "cover", height: '100%', borderRadius: "8px", boxShadow: "0 0 3px #000" }}
                src={item.linkImg} alt=""
              />
            </Link>
          </div>
          <div className='w-9/12'>
            <Link key={index}
              style={{ textDecoration: "none", color: "#999", fontSize: "11px" }} to={'/q/' + item._id + `?n=${item.name}`}>{item.name}
            </Link>
          </div>
        </div>
        ) : ""}
    </div>
  )
}

export default CategoryProductSidebar