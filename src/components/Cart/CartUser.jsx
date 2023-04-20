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
import { filterCate } from '../../function';
import { StyledMessageErrText, StyledTitleCart } from '../Styled/Styled';
import styled from 'styled-components';
import { StyledBtnClickDeleteCartById } from './DeleteCartUser';

const CartText = styled.p`
color: #999;
`;
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const Psyled = styled.p``;
const CartUser = () => {
  try {
    const [reset, setReset] = useState(false);
    const { cart } = useSelector(cartUserFulfilled$);
    const category = useSelector(category$);
    const Auth = isAuthentication();
    const AuthDecode = jwtDecode(Auth.token);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(findCartByUserSlice(AuthDecode._id));
      dispatch(getAllcate());
    }, [reset]);
    console.log(reset);
    return (
      <Divstyled >
        <StyledTitleCart />
        <CartText className='text-lg font-normal  xs:text-xl '>Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</CartText>
        <Divstyled>
          {
            cart && cart.length ? cart.map((item, index) => (
              <Divstyled style={{ padding: "20px 0" }} key={index}>
                <Divstyled className='d-flex align-items-center justify-content-between'>
                  <Divstyled className='searhValue' key={index}>
                    <Link to={'/d/' + item.product._id + `?c=${item.product.category}` + "?n=" + `${decodeURI(item.product.name) + " " + item.product.seri} `}>
                      <Divstyled className='searchValueImg'><img src={filterCate(category, item.product.category).linkImg} style={{ borderRadius: "5px" }} alt="" /></Divstyled>
                    </Link>
                    <Link to={'/d/' + item.product._id + `?c=${item.product.category}` + "?n=" + `${decodeURI(item.product.name) + " " + item.product.seri} `}>
                      <Divstyled className='des'>{item.product.name + " " + item.product.seri}
                        <Psyled className='mt-2'>
                          Ngày thêm: {moment(item.date).format('LTS DD-MM-YYYY')}
                        </Psyled>
                        <Psyled>
                          Tập: {item.product.seri}
                        </Psyled>
                        <Psyled className='mt-1'>Danh mục: {filterCate(category, item.product.category).name}</Psyled>
                        {/* <p className='des des_cart'>Mô tả: {filterCate(category, item.product.category).des}</p> */}
                      </Divstyled>
                    </Link>
                  </Divstyled>
                  <StyledBtnClickDeleteCartById setReset={setReset} id={item.product._id} userId={AuthDecode._id} />
                </Divstyled>
              </Divstyled>
            )) : <StyledMessageErrText text={'Not Found'} />
          }
        </Divstyled>
      </Divstyled>
    )
  } catch (error) {
    return <StyledMessageErrText text={'Đăng nhập'} />
  }
}

export default CartUser
