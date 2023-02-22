import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allCategoryNotReq$ } from '../redux/selectors';
import { getAllCategoryNotReqSlice } from '../redux/slice/categorySlice';

const GetAllCategoryNotRequest = ({ id }) => {
  const category = useSelector(allCategoryNotReq$);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAllCategoryNotReqSlice(id));
    window.scrollTo({
      top: 0,
      behavior:'smooth',
    })
  }, [id]);

  return (
    <div>
      <h5>Liên quan</h5>
      <div className="categoryMovie">
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
                  <p>Thời gian 20/12 phút</p>
                </div>
              </div>
            </div>
          </div>
        }) : ""}
      </div>
    </div>
  )
}

export default GetAllCategoryNotRequest
