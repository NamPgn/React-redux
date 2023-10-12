import React, { useContext } from "react";
import styed from "styled-components";
import { Skeleton } from "antd";
import { MyContext } from "../../../context";
import { Spin } from "antd";
import MyProgress from "../../MV/Progress";
const LoadingStyled = styed.div`
height: 100vh;
`;

const LoadingErr = styed.div`
position: relative;
height: 100vh;
justify-content: center;
display: flex;
&>*{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
`;
export const Loading = () => {
  return <LoadingStyled />;
};

export const Loader = () => {
  const { state }: any = useContext(MyContext) ?? {};
  return (
    <Skeleton
      className={state ? "w-11/12" : "w-10/12"}
      active
      title={{ width: "20%" }}
      paragraph={{
        rows: 8,
        width: [300, 200, 400, 100],
      }}
      loading
      style={{ height: "100vh", padding: "0 30px" }}
    />
  );
};

export const MessageErr = () => {
  return (
    <LoadingErr>
      <div>Lỗi rồi kiểm tra lại mạng của bạn hoặc tải lại trang...</div>
    </LoadingErr>
  );
};

export const Spiner = ({ size, spinning, delay, children }) => (
  <LoadingErr className="w-full">
    <Spin spinning={spinning} delay={delay} size={size}>
      {children}
    </Spin>
  </LoadingErr>
);

export const NotUpdate = () => {
  return <div className="text-white">Chưa cập nhật</div>;
};

export const MVLoadingTopBar = ({ percent }) => {
  return (
    <div
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 999 }}
    >
      <MyProgress percent={percent} status="active" showInfo={false} />
    </div>
  );
};
