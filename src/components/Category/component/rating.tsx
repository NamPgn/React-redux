import React, { memo } from "react";
import { ratingCategory } from "../../../sevices/category";
import { Rate } from "antd";

const Rating = memo(({ id,averageRating,totalRatings }: any) => {
  const handleRatingChange = async (rating) => {
    const data: any = {
      rating: rating,
    };
    try {
      await ratingCategory(id, data);
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };
  return (
    <span className="text-white flex items-center gap-2">
      <Rate className="mt-2 mb-2" value={averageRating} onChange={handleRatingChange} />
      {totalRatings > 0 ? (
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                Vip {averageRating.toFixed(2)}/{totalRatings * 115 } Tổng số lượt đánh giá
              </span>
            </div>
          </div>
          {/* <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-pink-200">
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
          </div> */}
        </div>
      ) : (
        ""
      )}
    </span>
  );
});

export default Rating;
