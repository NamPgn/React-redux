import React from "react";
import { message } from "antd";
import styled from "styled-components";
import { deleteCartSlice } from "../../../redux/slice/cart/thunk/cart";
import { useAppDispatch } from "../../../hook";
import MVConfirm from "../../MV/Confirm";
import { MyButton } from "../../MV/Button";
import { MVSuccess } from "../../Message";

const BtnClickDeleteCartById = styled.div`
  font-size: 14px;
  &:hover > i {
    cursor: pointer;
  }
`;

export const StyledBtnClickDeleteCartById = ({
  id,
  userId,
  setReset,
}: any) => {
  const text = "Bạn có muốn xóa không?";
  const state = {
    id: id,
    userId: userId,
  };
  const dispatch = useAppDispatch();
  const confirm = async (id: string) => {
    const response = await dispatch(deleteCartSlice(state));
    if (response.payload.success) {
      MVSuccess("Đã xóa!");
      setReset((reset) => !reset);
    }
  };

  return (
    <BtnClickDeleteCartById>
      <MVConfirm
        title={text}
        onConfirm={() => confirm(id)}
        okText="Có"
        cancelText="Khum!"
      >
        <MyButton className="text-[#fff]">Xóa</MyButton>
      </MVConfirm>
    </BtnClickDeleteCartById>
  );
};
