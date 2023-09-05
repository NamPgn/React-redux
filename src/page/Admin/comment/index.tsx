import React, { useEffect } from 'react'
import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { deleteCommentSlice, getAllCommentSlice } from '../../../redux/slice/comment/thunkComment/comment';
import { comment$ } from '../../../redux/selectors/comment';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hook';
import MVTable from '../../../components/Table';
import { columnsComment } from '../../../constant';
import { MyButton } from '../../../components/Button';

const CommentAdmin = () => {
  const comment = useAppSelector(comment$);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCommentSlice());
  }, []);
  const data = comment && (
    comment.map((item: any, index: any) => {
      return {
        key: item._id,
        stt: index + 1,
        name: item.commentContent,
        user: item.user.username + " Tập: ",
        image: <Image width={60} height={80} style={{ objectFit: "cover" }} src={item.user.image} />,
        product: "product",
        permission: item.role == 0 ? "User" : "Admin",
        Time: moment(item.createdAt).format('LTS DD-MM-YYYY'),
        action: (
          <span>
            <Link to={`/dashboard/trailerUrl/${item._id}`}>
              <MyButton style={{ background: "#1677ff" }}>
                Edit
              </MyButton>
            </Link>
            <MyButton onClick={() => dispatch(deleteCommentSlice(item._id))} style={{ background: "#dc3545" }} className='ml-2'>
              Cút
            </MyButton>
          </span>
        )
      }
    })
  );
  return (
    <>
      <MVTable
        columns={columnsComment}
        dataSource={data}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
      />
    </>
  )
}

export default CommentAdmin