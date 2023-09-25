import React, { useEffect } from 'react'
import { Image } from 'antd';
import { deleteCommentSlice, getAllCommentSlice } from '../../../redux/slice/comment/thunkComment/comment';
import { comment$ } from '../../../redux/selectors/comment';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../hook';
import MVTable from '../../../components/MV/Table';
import { columnsComment } from '../../../constant';
import { MyButton } from '../../../components/MV/Button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MVConfirm from '../../../components/MV/Confirm';
import { toast } from 'react-toastify';
import MVLink from '../../../components/Location/Link';

const CommentAdmin = () => {
  const comment = useAppSelector(comment$);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCommentSlice());
  }, []);

  const confirm = async (id) => {
    const response = await dispatch(deleteCommentSlice(id));
    if (response.payload.success) {
      toast.success('Delete product successfully');
    } else {
      toast.error('Error deleting product');
    }
  };

  const data = comment && (comment.filter((item) => item.user !== null).map((item: any, index: any) => {
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
          <MVLink to={`/dashboard/comment/${item._id}`}>
            <MyButton danger shape="circle"><EditOutlined /></MyButton>
          </MVLink>
          <MVConfirm
            title="Delete the product"
            onConfirm={() => confirm(item._id)}
            okText="Yes"
            cancelText="No"
          >
            <MyButton shape="circle" className="ml-2">
              <DeleteOutlined />
            </MyButton>
          </MVConfirm>
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