import React, { useEffect } from 'react'
import { Table, Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { deleteCommentSlice, getAllCommentSlice } from '../../../redux/slice/comment/thunkComment/comment';
import { comment$ } from '../../../redux/selectors/comment';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hook';
const columns = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
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
const CommentAdmin = () => {
  const comment = useAppSelector(comment$);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCommentSlice());
  }, []);
  const data = comment ? comment.map((item:any, index:any) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.commentContent,
      user: item.user.username + " Tập: " ,
      image: <Image width={60} height={80} style={{ objectFit: "cover" }} src={item.user.image} />,
      product:"product",
      permission: item.role == 0 ? "User" : "Admin",
      Time: moment(item.createdAt).format('LTS DD-MM-YYYY'),
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
    <>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}></Table>
    </>
  )
}

export default CommentAdmin
