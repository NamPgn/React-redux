import React from "react";
import { useParams } from "react-router-dom";
import GetAllCategoryNotRequest from "../../../components/Category/component/other";
import CategoryPage from "../../../components/Category";
import LazyLoadOtherComponents from "../../../components/LazyOtherComponents";
const CategoryProduct = () => {
  const { id } = useParams();

  return (
    <>
      <CategoryPage />
      <LazyLoadOtherComponents>
        <GetAllCategoryNotRequest id={id} />
      </LazyLoadOtherComponents>
    </>
  );
};

export default CategoryProduct;
