import React from "react";
// import { Image } from "antd";
import { Image } from "@nextui-org/react";
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
    <Image
      // placeholder={}
      // removeWrapper={true}
      isBlurred={true}
      shadow="sm"
      loading="lazy"
      src={src}
      radius={"sm"}
      fallbackSrc={src}
      className="m-5"
      classNames={{
        wrapper: "h-full",
      }}
      style={style}
      alt={alt}
      {...rest}
    />
  );
};

export default MVImage;
