import React from "react";
import Slider from "react-slick";

const SliderComponent = ({ content, settings }: any) => {
  return <Slider {...settings}>{content}</Slider>;
};

export default SliderComponent;
