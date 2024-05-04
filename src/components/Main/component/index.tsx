import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useState } from "react";
import { Rate } from "antd";
import MyProgress from "../../MV/Progress";
const Content = ({ getOneProductDetail }) => {
  const desc = ["Rất Tệ", "Tệ", "Xem Được", "Hay", "Rấc Hay"];
  const [value, setValue] = useState(3);
  console.log(Math.floor(Math.random() * (51 - 36)) + 36)
  return (
    <>
      <span className="text-white">
        <Rate
          className="mt-2 mb-2"
          tooltips={desc}
          onChange={setValue}
          value={value}
        />
        {value && (
          <span className="ml-2">
            <span className="ant-rate-text text-white">{desc[value - 1]}</span>
            <MyProgress
              className="text-white mt-2 pr-3"
              size={"default"}
              strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
              percent={value * 13.9}
            />
          </span>
        )}
      </span>
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
          <EyeOutlined />{getOneProductDetail.view * 36} Lượt xem
        </div>
      </div>
      <div
        className="p-3 mt-3 mb-3 text-white rounded  flex items-center lg:justify-start @screen justify-center"
        style={{ background: "rgb(0 0 0 / 47%)" }}
      >
        Copyright video: 
        <div className="text-slate-400">{" " + getOneProductDetail.copyright}</div>
      </div>
    </>
  );
};

export default Content;
