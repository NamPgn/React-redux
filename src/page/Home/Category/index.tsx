import React from "react";
import { useParams } from "react-router-dom";
import CategoryPage from "../../../components/Category";
const CategoryProduct = () => {
  return (
    <>
      <CategoryPage />
      {/* <LazyLoadOtherComponents>
        <GetAllCategoryNotRequest id={id} />
      </LazyLoadOtherComponents> */}
    </>
  );
};

export default CategoryProduct;
