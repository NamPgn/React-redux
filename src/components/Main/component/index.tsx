import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { Rate } from "antd";
import { ratingProduct } from "../../../sevices/product";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import { MVSuccess } from "../../Message";
const Content = ({ getOneProductDetail }) => {
  const { data } = useSWRWithAxios(
    urlSwr + `/product/rate/${getOneProductDetail._id}`
  );
  const handleRatingChange = async (rating) => {
    const productId = getOneProductDetail._id;
    const data: any = {
      rating: rating,
    };
    try {
      await ratingProduct(productId, data);
      MVSuccess("Cảm ơn bạn đã gửi đánh giá!");
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };
  return (
    <>
      <span className="text-white ">
        <Rate className="mt-2 mb-2" onChange={handleRatingChange} />
        {data && (
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                  Star in progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-pink-600">
                 {data.percentages[4]?.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
              <div
                style={{ width: data.percentages[0]+"%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
              ></div>
              <div
                style={{ width: data.percentages[1]+"%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
              ></div>
              <div
                style={{ width: data.percentages[2]+"%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
              ></div>
              <div
                style={{ width: data.percentages[3]+"%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
              <div
                style={{ width: data.percentages[4]+"%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-200"
              ></div>
            </div>
          </div>
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
