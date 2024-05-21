import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import React from "react";
const Content = ({ getOneProductDetail }) => {
  return (
    <>
      <div style={{ color: "#fff", margin: "10px 0" }}>
        {getOneProductDetail.seri
          ? getOneProductDetail.trailer
            ? "Trailer " + getOneProductDetail.seri
            : "Tập " + getOneProductDetail.seri
          : ""}
      </div>
      <div className="des text-[#999]">
        <p>
          Ngày đăng:{" "}
          {moment(getOneProductDetail.uploadDate).format("LTS DD-MM-YYYY")}
        </p>
      </div>
      <div style={{ color: "#fff", margin: "10px 0" }} className="des">
        <div className="text-[#999] flex items-center gap-2 lg:justify-start @screen justify-center">
          <EyeOutlined />
          {getOneProductDetail.view * 36} Lượt xem
        </div>
      </div>
      <div
        className="p-3 mt-3 mb-3 text-white rounded  flex items-center lg:justify-start @screen justify-center"
        style={{ background: "rgb(0 0 0 / 47%)" }}
      >
        Copyright video:
        <div className="text-slate-400">
          {" " + getOneProductDetail.copyright}
        </div>
      </div>
    </>
  );
};

export default Content;
