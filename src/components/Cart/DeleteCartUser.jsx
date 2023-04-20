import React, { useState } from 'react'
import { message, Popconfirm, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartSlice } from '../../redux/slice/cart/thunk/cart';


const BtnClickDeleteCartById = styled.div`
font-size: 14px;
&:hover >i{
cursor:pointer;
}
`;

export const StyledBtnClickDeleteCartById = ({ id, userId, setReset }) => {
  const [state, setState] = useState({
    id: id,
    userId: userId
  });
  const dispatch = useDispatch();
  const confirm = () => {
    message.success({
      type: 'error',
      content: "Đã cút!",
    });
    dispatch(deleteCartSlice(state))
    setReset(reset => !reset)
  };
  const cancel = (e) => {
    message.error({
      type: 'error',
      content: "Lỗi rồi",
      style: {
        position: "absolute",
        marginTop: "100px",
        right: "50px",
      }
    });
  };
  return <BtnClickDeleteCartById>
    <Popconfirm
      title="Bạn có muốn xóa không?"
      description="Bạn sẽ không được hoàn tác?"
      onConfirm={() => confirm(id)}
      onCancel={cancel}
      okText="Có"
      cancelText="Khum!"
    >
      <Button type='primary' >Xóa</Button>
    </Popconfirm>
  </BtnClickDeleteCartById>
}