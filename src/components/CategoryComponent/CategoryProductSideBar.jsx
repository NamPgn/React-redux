import React from 'react'
import { Link } from 'react-router-dom';
const CategoryProductSidebar = ({ category, isLoading }) => {
  const catedata = category ? category.slice(0, 4) : '';
  return (
    <nav className="nav navCate col-sm-3 des" >
      <p style={{ color: "#fff" }}>See more</p>
      {isLoading === false ? catedata ? catedata.map((item, index) => <div className='d-flex categoryContent col-md-12' key={index}>
        <div style={{ maxWidth: "50px", height: "55px" }} className='col-md-2'>
          <Link
            key={index}
            to={'/product/category/' + item._id + `?category=${item.name}`}>
            <img
              style={{ width: "100%", objectFit: "cover", height: '100%', borderRadius: "8px", boxShadow: "0 0 3px #fff" }}
              src={item.linkImg} alt=""
            />
          </Link>
        </div>
        <div className='col-md-10'>
          <Link key={index}
            style={{ textDecoration: "none", color: "#999", fontSize: "12px" }} to={'/product/category/' + item._id + `?category=${item.name}`}>{item.name}
          </Link>
        </div>
      </div>
      ) : "" : <div className='text-light text-center'>Chờ 1 chút...</div>}
    </nav>
  )
}

export default CategoryProductSidebar