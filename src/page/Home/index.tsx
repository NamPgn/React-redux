import React from "react";
import ConfigHomePage from "./Container/Config";
import PageMeta from "../../lib/pageMeta";
import { handleImage } from "../../lib/handleImage";
const HomePage = () => {
  return (
    <>
      <PageMeta
        ogTitle="Hoạt Hình Trung Quốc"
        description="Đấu Phá Thương Khung Phần 5"
        imageUrl={handleImage(
          200,
          "https://res.cloudinary.com/daz3lejjo/image/upload/w_100/v1721825684/category/category_1689076028777-a6e7592292d5428b1bc4.jpg.jpg"
        )}
        title={"Hoạt Hình 3D"}
      />
      <ConfigHomePage />
    </>
  );
};

export default HomePage;
