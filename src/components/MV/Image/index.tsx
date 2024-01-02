import { Image } from "antd";
import React from "react";
interface ImageInterFace {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  shadow?: any;
  isBlurred?: boolean;
  radius?: any;
  className?: string;
  children?: React.ReactNode;
  style?: any;
}
const MVImage = ({ src, alt, style, ...rest }: ImageInterFace) => {
  return (
    <img
      // placeholder={}
      // removeWrapper={true}
      loading="lazy"
      src={src}
      className="m-5 w-full h-[150px] md:h-[200px] lg:h-[300px]"
      style={style}
      alt={alt}
      {...rest}
    />
  );
};

export default MVImage;
