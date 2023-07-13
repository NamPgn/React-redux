import React, { useState } from 'react'
import { message, Popconfirm, Button } from 'antd';
import styled from 'styled-components';
import { deleteCartSlice } from '../../redux/slice/cart/thunk/cart';
import { useAppDispatch } from '../../hook';

const BtnClickDeleteCartById = styled.div`
font-size: 14px;
&:hover >i{
cursor:pointer;
}
`;

export const StyledBtnClickDeleteCartById = ({ id, userId, setReset }: any) => {
  const text = "Bạn có muốn xóa không?";
  const description = "Bạn sẽ không được hoàn tác?";
  const [state, setState] = useState({
    id: id,
    userId: userId
  });
  const dispatch = useAppDispatch();
  const confirm = (id:string) => {
    message.success({
      type: 'error',
      content: "Đã xóa!",
    });
    dispatch(deleteCartSlice(state))
    setReset((reset: boolean) => !reset)
  };
  const cancel = () => {
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
      title={text}
      onConfirm={() => confirm(id)}
      onCancel={cancel}
      okText="Có"
      cancelText="Khum!"
    >
      <Button style={{ color: "#fff" }}>Xóa</Button>
    </Popconfirm>
  </BtnClickDeleteCartById>
}