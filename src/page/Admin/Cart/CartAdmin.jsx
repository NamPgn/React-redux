import React, { useEffect } from 'react';
import { Table, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { cart$ } from '../../../redux/selectors/Cart';
import { getAllCartSlice } from '../../../redux/slice/cart/thunk/cart';
import {  useGetAllcartQuery } from '../../../redux/slice/cart';
const index = () => {
  // const cart = useSelector(cart$);
  // const dispatch = useDispatch();
  const { data: cart = [], error, isLoading } = useGetAllcartQuery();
  // useEffect(() => {
  //   dispatch(getAllCartSlice())
  // }, []);
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
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }
  ];
  const data = cart ? cart.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      ProductName: item.product.name + " " + item.product.seri,
      user: item.user.username,
      image: <Image width={60} height={80} style={{ objectFit: "cover" }} src={item.product.image ? item.product.image : "https://i.pinimg.com/736x/0d/56/7a/0d567a768f35faab85b96f84691235d3.jpg"} />,
      permission: item.user.role == 0 ? "User" : "Admin",
      Time: moment(item.updatedAt).format('LTS DD-MM-YYYY'),
      action: (
        <span>
          <Link to={`/admin/trailerUrl/${item._id}`}>
            <Button style={{ background: "#1677ff" }} type="primary">
              Edit
            </Button>
          </Link>
          <Button onClick={() => dispatch(deleteCommentSlice(item._id))} style={{ background: "#dc3545" }} type="primary" className='ml-2'>
            Cút
          </Button>
        </span>
      )
    }
  }) : "";
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}></Table>
    </div>
  )
}

export default index
