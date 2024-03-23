import React, { useEffect } from 'react';
import { Image } from 'antd';
import { cart$ } from '../../../redux/selectors/Cart';
import { deleteCartSlice, getAllCartSlice } from '../../../redux/slice/cart/thunk/cart';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { deleteCommentSlice } from '../../../redux/slice/comment/thunk/comment';
import MVTable from '../../../components/MV/Table';
import { MyButton } from '../../../components/MV/Button';
import { columsCart } from '../../../constant';
import MVLink from '../../../components/Location/Link';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;

const index = () => {
  const cart = useAppSelector(cart$);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCartSlice());
  }, []);
  const data = cart && (
    cart.filter(item => item.user !== null).map((item: any, index: any) => {
      return {
        key: item._id,
        stt: item._id,
        ProductName: item.product ? item.product.name + " " + item.product.seri : "",
        user: item.user.username,
        image: <Image width={60} height={80} style={{ objectFit: "cover" }} src={item.product ? item.product.image : "https://i.pinimg.com/736x/0d/56/7a/0d567a768f35faab85b96f84691235d3.jpg"} />,
        permission: item.user.role == 0 ? "User" : "Admin",
        action: (
          <SpanStyled>
            <MVLink to={`/dashboard/trailerUrl/${item._id}`}>
              <MyButton danger>
                Edit
              </MyButton>
            </MVLink>
            <MyButton onClick={() => dispatch(deleteCartSlice(item._id))} className='ml-2'>
              Del
            </MyButton>
          </SpanStyled>
        )
      }
    })
  );
  return (
    <Divstyled>
      <MVTable
        columns={columsCart}
        dataSource={data}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
      />
    </Divstyled>
  )
}

export default index
