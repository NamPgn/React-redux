import React, { useContext, useEffect } from "react";
import ConfigHomePage from "./Container/Config";
import { MyContext } from "../../context";
import { Spiner } from "../../components/Message/Notification";
import MVRow from "../../components/MV/Grid";
import { notification } from "antd";
const HomePage = () => {
  const { category, isLoading, isError, state }: any =
    useContext(MyContext) ?? {};
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        api.open({
          message: "Admin xin thông báo!",
          description:
            "Xin lỗi, server phim hiện đang quá tải do lượng truy cập lớn. Vui lòng chờ đợi trong 1-2 phút để tiếp tục xem. Chúng tôi đang nỗ lực để cải thiện tình hình và xin thành thật xin lỗi vì sự bất tiện này. Xin cảm ơn sự kiên nhẫn của bạn!",
          className: "custom-class",
      
          duration: 10,
        });
      }
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      {contextHolder}
      {!isLoading ? (
        <React.Fragment>
          <MVRow align="middle"></MVRow>
          <ConfigHomePage
            category={category?.data}
            isLoading={isLoading}
            isError={isError}
            state={state}
          />
        </React.Fragment>
      ) : (
        <Spiner size="large" children={undefined} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
