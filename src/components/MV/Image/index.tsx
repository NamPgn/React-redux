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
      loading="lazy"
      src={src}
      className="m-5 w-full h-full"
      style={style}
      alt={alt}
      {...rest}
    />
  );
};

export default MVImage;
