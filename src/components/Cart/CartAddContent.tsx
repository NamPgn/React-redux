import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { addCartSlice } from '../../redux/slice/cart/thunk/cart';
import { useAppDispatch } from '../../hook';
import Error from '../Message/Error';
import Success from '../Message/Success';
import { Warning } from '../Message/Warning';
import { MyContext } from '../../context';
import { LikeOutlined } from '@ant-design/icons';
import { MyButton } from '../MV/Button';

const CartAddItem = styled.div`
  color: #fff;
  font-size: 14px;
  padding: 5px;
  text-align: center;
  border: 1px solid;
  &:hover{
    cursor:pointer;
    opacity:1;
  }
  
`

const DivStyled = styled.div`
`;
interface Istate {
  user: string;
  product: string;
}
const CartAddContent = ({ item, id, categoryId }) => {
  const dispatch = useAppDispatch();
  const { Auth, user, isLoggedInState } = useContext(MyContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const state: Istate = {
    user: Auth ? Auth.user._id : '',
    product: id,
  };
  useEffect(() => {
    const favoriteItem = user?.cart?.find((item) => item.product._id === id);
    setIsFavorited(favoriteItem?.product?._id === id);
  }, [user.cart, id]); //2 thằng này thay đổi rerender
  const handleAddCart = () => {
    if (!Auth && isLoggedInState == false) {
      // Nếu người dùng chưa đăng nhập, hiển thị tin nhắn đăng nhập
      Error("Bạn cần đăng nhập!");
    } else {
      // Nếu người dùng đã đăng nhập, kiểm tra sản phẩm trong cart
      if (isFavorited) {
        // Nếu phim đã có trong giỏ hàng, hiển thị tin nhắn trùng lặp
        Warning('Đã tồn tại trong yêu thích!');
      } else {
        // Nếu phim chưa có trong giỏ hàng, thêm vào giỏ hàng
        dispatch(addCartSlice(state));
        setIsFavorited(true);
        Success('Thêm vào danh sách yêu thích thành công!');
      }
    }
  }

  return (
    <div className='lg:flex md:flex-row items-center @screen md:justify-between flex flex-col'>
      <DivStyled style={{ color: "#fff", margin: "10px 0px" }}>{item.name}</DivStyled>
      <MyButton style={{ color: "#fff" }} icon={<LikeOutlined />}
        disabled={isFavorited}
        className="flex items-center justify-center"
        onClick={() => handleAddCart()}>
        {isFavorited ? "Đã yêu thích" : "Thêm vào yêu thích"}
      </MyButton>
    </div>
  )
}

export default CartAddContent
