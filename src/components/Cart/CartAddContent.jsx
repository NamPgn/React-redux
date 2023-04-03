import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isAuthentication } from '../../auth/getToken';
import { cart$ } from '../../redux/selectors/Cart';
import { useAddCartMutation, useGetAllcartQuery } from '../../redux/slice/cart';
import { addCartSlice, getAllCartSlice } from '../../redux/slice/cart/thunk/cart';

const CartAddContent = ({ item, id, categoryId }) => {
  try {
    const Auth = isAuthentication();
    const [carts] = useAddCartMutation();
    // console.log('cart', cart, 'id', id);
    const AuthDecode = jwtDecode(Auth.token);
    const dispatch = useDispatch();
    const { data: cart = [], error, isLoading } = useGetAllcartQuery();
    const state = {
      user: AuthDecode._id,
      product: id,
    };
    const handleAddCart = () => {
      const id_pr = cart.find(({ product: { _id } }) => _id === id);

      !Auth ? toast.error("Bạn cần đăng nhập!") :
        id_pr ? toast.warning('Đã tồn tại!') :
          toast.success('Thêm thành công vui lòng kiểm tra lại mục yêu thích của bạn ngoài HomePage', carts(state));
    }
    return (
      <div className='d-flex align-items-center justify-content-between'>
        <h4 className='mt-4 mb-4'>{item.name + " " + item.seri}</h4>
        <div className='ml-5' onClick={handleAddCart}>
          <i className="fa-solid fa-bookmark text-warning h3 __"></i>
        </div>
      </div>
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
