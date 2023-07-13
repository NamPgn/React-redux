import React, { useEffect } from 'react';
import { Table, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { cart$ } from '../../../redux/selectors/Cart';
import { getAllCartSlice } from '../../../redux/slice/cart/thunk/cart';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { deleteCommentSlice } from '../../../redux/slice/comment/thunkComment/comment';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const index = () => {
  const cart = useAppSelector(cart$);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCartSlice());
  }, []);
  const columns = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'ProductName',
      dataIndex: 'ProductName',
      key: 'ProductName',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'Image',
    },
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }
  ];
  const data = cart ? cart.map((item: any, index: any) => {
    return {
      key: item._id,
      stt: item._id,
      ProductName: item.product ? item.product.name + " " + item.product.seri : "",
      user: item.user.username,
      image: <Image width={60} height={80} style={{ objectFit: "cover" }} src={item.product ? item.product.image : "https://i.pinimg.com/736x/0d/56/7a/0d567a768f35faab85b96f84691235d3.jpg"} />,
      permission: item.user.role == 0 ? "User" : "Admin",
      action: (
        <SpanStyled>
          <Link to={`/admin/trailerUrl/${item._id}`}>
            <Button style={{ background: "#1677ff" }} type="primary">
              Edit
            </Button>
          </Link>
          <Button onClick={() => dispatch(deleteCommentSlice(item._id))} style={{ background: "#dc3545" }} type="primary" className='ml-2'>
            Cút
          </Button>
        </SpanStyled>
      )
    }
  }) : "";
  return (
    <Divstyled>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}></Table>
    </Divstyled>
  )
}

export default index
