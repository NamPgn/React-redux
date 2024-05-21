import React, { memo } from "react";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import { ratingCategory } from "../../../sevices/category";
import { Rate } from "antd";
import { mutate } from "swr";

const Rating = memo(({ id }: any) => {
  const { data } = useSWRWithAxios(urlSwr + `/rate/${id}`);
  const backgrounds = [
    "linear-gradient(62deg, #FBAB7E 37%, #F7CE68 100%)",
    "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)",
  ];
  const handleRatingChange = async (rating) => {
    const data: any = {
      rating: rating,
    };
    try {
      await ratingCategory(id, data);
      mutate(urlSwr + `/rate/${id}`);
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };
  return (
    <span className="text-white">
      <Rate className="mt-2 mb-2" value={data?.averageRating} onChange={handleRatingChange} />
      {data.totalRatings > 0 ? (
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs  font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                Vip {data?.averageRating.toFixed(2)}/{data?.totalRatings * 115 } Tổng số lượt đánh giá
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-pink-200">
            {data.percentages.map((percentage, index) =>
              <div
                key={index}
                style={{
                  width: percentage + "%",
                  background:backgrounds[index]
                }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center text-[10px] md:text-[12px] lg:text-[14px]`}
              >
                {`(${index + 1})*  ${percentage.toFixed(2) + "%"}`}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </span>
  );
});

export default Rating;
