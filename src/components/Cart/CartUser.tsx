import jwtDecode from 'jwt-decode';
import moment from 'moment';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { cartUserFulfilled$ } from '../../redux/selectors/user';
import { findCartByUserSlice } from '../../redux/slice/userSlice';
import { category$ } from '../../redux/selectors';
import { getAllcate } from '../../redux/slice/category/ThunkCategory/category';
import { filterCate } from '../../function';
import { StyledBtnClickDeleteCartById } from './DeleteCartUser';
import { useAppDispatch, useAppSelector } from '../../hook';
import { cartUserPending$ } from '../../redux/selectors/user';
import { Loader } from '../Message/Loading';
import { getAllCartSlice } from '../../redux/slice/cart/thunk/cart';

const CartText = styled.p`
color: #999;
`;
const Divstyled = styled.div`

`;

const Psyled = styled.p``;
const CartUser = () => {
  try {
    const [reset, setReset] = useState(false);
    const { cart } = useAppSelector(cartUserFulfilled$);
    const loandingCart = useAppSelector(cartUserPending$);
    const category = useAppSelector(category$);
    const Auth = isAuthentication();
    const AuthDecode: { _id: string } = jwtDecode(Auth.token);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(findCartByUserSlice(AuthDecode._id));
      dispatch(getAllcate());
      dispatch(getAllCartSlice())
    }, [reset]);
    loandingCart ? <Loader /> : ""
    if (!AuthDecode) {
      return <div className='text-white'>Đăng nhập</div>
    }
    return (
      <Divstyled >
        <h1 className='mb-4 text-3xl font-extrabold  dark:text-white md:text-5xl lg:text-6xl'>
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">List Movie</span>Favorite.
        </h1>
        <CartText className='text-lg font-normal xs:text-xl'>Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</CartText>
        <Divstyled style={{ height: '100vh' }}>
          {
            cart && cart.length ? cart.filter((item: any) => item.product !== null).map((item: any, index: any) => (
              <Divstyled style={{ padding: "20px 0" }} key={index}>
                <Divstyled className='d-flex align-items-center justify-content-between'>
                  <Divstyled className='searhValue' key={index}>
                    <Link to={'/d/' + item.product._id + `?c=${item.product.category} `}>
                      <Divstyled className='searchValueImg'><img src={item.product.image ? item.product.image : filterCate(category, item.product.category).linkImg} style={{ borderRadius: "5px" }} alt="" /></Divstyled>
                    </Link>
                    <Link to={'/d/' + item.product._id + `?c=${item.product.category} `}>
                      <Divstyled className='des'>{item.product.name + " " + item.product.seri}
                        <Psyled className='mt-2'>
                          Ngày thêm: {moment(item.date).format('LTS DD-MM-YYYY')}
                        </Psyled>
                        <Psyled>
                          Tập: {item.product.seri}
                        </Psyled>
                        <Psyled className='mt-1'>Danh mục: {item.product.name ? item.product.name : filterCate(category, item.product.category).name}</Psyled>
                        {/* <p className='des des_cart'>Mô tả: {filterCate(category, item.product.category).des}</p> */}
                      </Divstyled>
                    </Link>
                  </Divstyled>
                  <StyledBtnClickDeleteCartById setReset={setReset} id={item.product._id} userId={AuthDecode._id} />
                </Divstyled>
              </Divstyled>
            )) : <div className='text-white'>Not Found</div>
          }
        </Divstyled>
      </Divstyled>
    )
  } catch (error) {
    console.log(error)
    return <Loader />
  }
}

export default CartUser
