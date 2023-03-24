import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allCategoryNotReq$ } from '../../redux/selectors';
import { isPendingCategory$ } from '../../redux/selectors/category';
import { getAllCategoryNotReqSlice } from '../../redux/slice/category/ThunkCategory/category';

const GetAllCategoryNotRequest = ({ id }) => {
  const category = useSelector(allCategoryNotReq$);
  const dispath = useDispatch();
  const isPendingCategory = useSelector(isPendingCategory$);
  useEffect(() => {
    dispath(getAllCategoryNotReqSlice(id));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [id]);

  return (
    <div>
      <h5 style={{ margin: "0 20px" }}>Liên quan</h5>
      {isPendingCategory === false ? <div className="categoryMovie px-3 mt-5">
        {category ? category.map((item, index) => {
          return <div className='movie_css' key={index}>
            <div >
              <div className="cateConten cateItem" style={{ width: "100%", }} >
                <Link to={'/product/category/' + item._id + `?category=${item.name}`} >
                  <img style={{ width: "100%" }} src={item.linkImg} alt="" />
                </Link>
                <div className="cateTitle text-light mt-1">
                  <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className='release_date'>
                  <p>Tổng {item.sumSeri} tập</p>
                </div>
                <div className='release_date'>
                  <p>Thời gian 20/12 phút</p>
                </div>
              </div>
            </div>
          </div>
        }) : "Trống!"}
      </div> : <div className='text-light text-center'>Chờ 1 chút...</div>}
    </div>
  )
}

export default GetAllCategoryNotRequest
