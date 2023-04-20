import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isAuthentication } from '../../auth/getToken';
import { StyledCartAddContent, StyledTitleFavorite } from '../Styled/Styled';
import { useDispatch, useSelector } from 'react-redux';
import { cart$ } from '../../redux/selectors/Cart';
import styled from 'styled-components';
import { addCartSlice, getAllCartSlice } from '../../redux/slice/cart/thunk/cart';

const CartAddItem = styled.div`
  color: #fff;
  font-size: 14px;
  padding: 5px;
  width: 200px;
  text-align: center;
  border: 1px solid;
  &:hover{
    cursor:pointer;
    opacity:1;
  }
  
`
const IconFavoritesCart = styled.i``;

const DivStyled = styled.div`
`;
const CartAddContent = ({ item, id, categoryId }) => {
  try {
    const dispatch = useDispatch();
    const { cart, code, message } = useSelector(cart$);
    const Auth = isAuthentication();
    const AuthDecode = jwtDecode(Auth.token);
    const state = {
      user: AuthDecode._id,
      product: id,
    };
    useEffect(() => {
      dispatch(getAllCartSlice());
    }, [])
    const handleAddCart = () => {
      if (!Auth) {
        // Nếu người dùng chưa đăng nhập, hiển thị tin nhắn đăng nhập
        toast.error("Bạn cần đăng nhập!");
      } else {
        // Nếu người dùng đã đăng nhập, kiểm tra sản phẩm trong giỏ hàng
        const id_pr = cart ? cart.find(({ product: { _id } }) => _id === id) : null;
        if (id_pr) {
          // Nếu sản phẩm đã có trong giỏ hàng, hiển thị tin nhắn trùng lặp
          toast.warning('Đã tồn tại trong yêu thích!');
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
          dispatch(addCartSlice(state));
          toast.success('Thêm vào danh sách yêu thích thành công!');
        }
      }
    }
    return (
      <StyledCartAddContent>
        <DivStyled style={{ color: "#fff", margin: "10px 0px" }}>{item.name + " " + item.seri}</DivStyled>
        <CartAddItem onClick={() => handleAddCart()}>
          Thêm vào yêu thích: <IconFavoritesCart className='fa-solid fa-bookmark' />
        </CartAddItem>
      </StyledCartAddContent>
    )
  } catch (error) {
    return <div className='d-flex align-items-center justify-content-between'>
      <h4 className='mt-4 mb-4'>{item.name + " " + item.seri}</h4>
      <div className='ml-5' title='Save' onClick={() => { toast.error('Bạn cần đăng nhập a!') }}>
        <i className="fa-solid fa-bookmark text-warning h3 __"></i>
      </div>
    </div>
  }
}

export default CartAddContent
