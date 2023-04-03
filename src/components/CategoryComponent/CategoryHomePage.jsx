import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
const CategoryHomePage = ({ category, isLoading }) => {
  return (
    <div>
      <div className='text-light all_movie'>All Movie</div>
      {isLoading === false ? <div className="categoryMovie">
        {category ? category.map((item, index) => {
          return <div className='movie_css' key={index}>
            <div >
              <div className="cateConten cateItem" style={{ width: "100%", }} >
                <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                  <img style={{ width: "100%" }} src={item.linkImg} alt="" />
                </Link>
                <div className="cateTitle text-light mt-1" style={{ height: "50px" }}>
                  <Link to={'/product/category/' + item._id + `?category=${item.name}`} >
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className='release_date'>
                  <div style={{ fontWeight: "500" }}>{item.sumSeri} Tập</div>
                </div>
                <div className='release_date'>
                  <p>Thời gian 20/12 phút</p>
                </div>
              </div>
            </div>
          </div>
        }) : ""}
      </div> : <div className='text-light text-center'>Chờ 1 chút...</div>}
      <div style={{ color: "#fff", marginTop: "150px" }} className='des'>News Movie
        <p className='text-secondary'>Updating.....</p>
      </div>
    </div>
  )
}

export default CategoryHomePage
