import React, { memo } from "react";
import MVLink from "../Location/Link";

interface CategoryContent {
  text?: string;
  title: string;
  link: any;
  image: string;
  sumSeri?: any;
  time: string;
  typecm?: string;
}
const CategoryContents = memo(
  ({ text, title, link, image, sumSeri, time, typecm }: CategoryContent) => {
    return (
      <div className="w-full">
        <MVLink to={link}>
          <img
            src={image}
            alt=""
            className="h-[200px] rounded md:h-[300px] lg:h-[400px] "
          />
        </MVLink>
        <div className="cateTitle text-white mt-1">
          <MVLink to={link}>
            <p className="lg:text-[16px] md:text-[14px] text-[13px]">{title}</p>
          </MVLink>
        </div>
        <div className="text-[11px] lg:text-[12px] md:text-[13px] text-[#999]">
          <div className="release_date mt-2 mb-2">
            <div style={{ fontWeight: "500" }}>
              {sumSeri ? sumSeri + " Tập" : ""}{" "}
            </div>
          </div>
          <div className="des">
            <p className="h6">Full hđ/Vietsub</p>
            <p>{typecm}</p>
          </div>
          <div className="release_date">
            <p>{time}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default CategoryContents;
