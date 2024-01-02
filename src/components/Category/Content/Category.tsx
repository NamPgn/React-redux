import React, { memo } from "react";
import MVText from "../../MV/Text";
import MVLink from "../../Location/Link";
import MVImage from "../../MV/Image";
import MVTitle from "../../MV/Title";
import { PlayCircleOutlined } from "@ant-design/icons";

interface CategoryContent {
  text?: string;
  title: string;
  link: any;
  image: string;
  sumSeri?: any;
  time: string;
  typecm?: string;
  year?:string;
}
const CategoryContents = memo(
  ({ text, title, link, image, sumSeri, time, typecm,year }: CategoryContent) => {
    
    return (
      <div className="w-full">
        <div className="w-full">
          <MVLink to={link} className="relative group">
            <MVImage
              src={image}
              alt={title}
              className="h-[200px] md:h-[300px] lg:h-[400px] transition-opacity duration-300 group-hover:opacity-40"
            />
            <PlayCircleOutlined className="absolute opacity-0 text-[30px] text-[#fff] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-opacity duration-300" />
          </MVLink>
        </div>
        <div className="cateTitle text-white mt-1">
          <MVLink to={link}>
            <MVTitle
              level={5}
              style={{
                color: "#fff",
              }}
              className="lg:text-[16px] md:text-[14px] text-[13px] "
            >
              {title}
            </MVTitle>
          </MVLink>
        </div>
        <div className="text-[11px] lg:text-[12px] md:text-[13px] text-[#999]">
          <div className="mt-2 mb-2">
            <div style={{ fontWeight: "500" }}>
              {sumSeri ? sumSeri + " Tập" : ""}{" "}
            </div>
          </div>
          <div className="des">
            <MVText className="text-[#999]">Full hđ/Vietsub</MVText>
            <MVText className="text-[#999]">{typecm}</MVText>
          </div>
          <MVText className="text-[#999]">{time}</MVText>
        </div>
      </div>
    );
  }
);

export default CategoryContents;
