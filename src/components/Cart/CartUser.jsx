import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { cartUserFulfilled$ } from '../../redux/selectors/user';
import { findCartByUserSlice } from '../../redux/slice/userSlice';
import moment from 'moment';
import { category$ } from '../../redux/selectors';
import { getAllcate } from '../../redux/slice/category/ThunkCategory/category';
import { filterCate } from '../../main';
import CategoryProductSidebar from '../CategoryComponent/CategoryProductSideBar';
const CartUser = () => {
  try {
    const { cart } = useSelector(cartUserFulfilled$);
    const category = useSelector(category$);
    const Auth = isAuthentication();
    const AuthDecode = jwtDecode(Auth.token);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllcate());
      dispatch(findCartByUserSlice(AuthDecode._id))
    }, [])
    return (
      <div >
        <h1 className="mb-4 text-3xl font-extrabold  dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span> Scalable AI.</h1>
        <p className="text-lg font-normal  xs:text-xl text-light">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div className=' d-flex align-items-center justify-content-between' style={{ height: "100vh" }}>
          <div>
            {
              cart && cart.length ? cart.map((item, index) => (
                <div style={{ padding: "20px 0" }} key={index}>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='searhValue' key={index}>
                      <Link to={'/detail/' + item.product._id + `?category=${item.product.category}` + "?name=" + `${decodeURI(item.product.name) + " " + item.product.seri} `}>
                        <div className='searchValueImg'><img src={filterCate(category, item.product.category).linkImg} style={{ borderRadius: "5px" }} alt="" /></div>
                      </Link>
                      <Link to={'/detail/' + item.product._id + `?category=${item.product.category}` + "?name=" + `${decodeURI(item.product.name) + " " + item.product.seri} `}>
                        <div className='des'>{item.product.name + " " + item.product.seri}
                          <p className='mt-2'>
                            Ngày thêm: {moment(item.date).format('LTS DD-MM-YYYY')}
                          </p>
                          <p>
                            Tập: {item.product.seri}
                          </p>
                          <p className='mt-1'>Danh mục: {filterCate(category, item.product.category).name}</p>
                          {/* <p className='des des_cart'>Mô tả: {filterCate(category, item.product.category).des}</p> */}
                        </div>
                      </Link>
                    </div>
                    <div >
                    <i  class="fa-solid fa-trash-can text-light"></i> 
                    </div>
                  </div>
                </div>
              )) : <div style={{ color: "#fff", textAlign: "center" }}>Not Found</div>
            }
          </div>
          <CategoryProductSidebar />
        </div>
      </div>
    )
  } catch (error) {
    return <div style={{ color: "#fff", textAlign: "center" }}>Đăng nhập</div>
  }
}

export default CartUser
