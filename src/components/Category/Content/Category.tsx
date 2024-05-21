import React, { memo } from "react";
import MVText from "../../MV/Text";
import MVLink from "../../Location/Link";
import MVImage from "../../MV/Image";
import MVTitle from "../../MV/Title";
import { PlayCircleOutlined } from "@ant-design/icons";
import { NotFoundContent } from "../../Message/Notification";

interface CategoryContent {
  text?: string;
  title: string;
  link: any;
  image: string;
  sumSeri?: any;
  time: string;
  typecm?: string;
  year?: string;
  products?: [];
}



const CategoryContents = memo(
  ({
    title,
    link,
    image,
    sumSeri,
    time,
    typecm,
    year,
    products,
  }: CategoryContent) => {
    const lastItem: any = products ? products[products.length - 1] : "";
    return (
      <div className="w-full">
        <div className="relative group">
          <MVLink to={link} className="block">
            <MVImage
              src={image}
              alt={title}
              className="h-[200px] md:h-[300px] lg:h-[400px] object-cover transition-opacity duration-300 group-hover:opacity-40 rounded-lg"
            />
            <div
              style={{
                background: "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
              }}
              className="absolute top-2 left-2  text-white text-xs rounded-[4px] px-2 py-1 font-medium"
            >
              {lastItem ? `Tập ${lastItem.seri}` : <NotFoundContent />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircleOutlined className="text-white text-5xl" />
            </div>
          </MVLink>
        </div>
        <div className="mt-4">
          <MVLink to={link}>
            <MVTitle
              level={5}
              style={{ color: "#fff" }}
              className="text-xl md:text-2xl lg:text-3xl font-bold"
            >
              {title}
            </MVTitle>
          </MVLink>
        </div>
        <div className="text-sm text-gray-400 mt-2">
          <div className="font-semibold">{sumSeri ? `${sumSeri} Tập` : ""}</div>
          <div className="flex items-center mt-1 justify-between">
            <MVText className="mr-2 text-gray-300">Full HD/Vietsub</MVText>
            <MVText className="mr-2 text-gray-300">{typecm}</MVText>
            <MVText className="text-gray-400 text-sm">({time})</MVText>
          </div>
          <div className="font-semibold mt-2">{year ? `${year}` : ""}</div>
        </div>
      </div>
    );
  }
);

export default CategoryContents;
