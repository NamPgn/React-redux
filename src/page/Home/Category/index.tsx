import React from "react";
import { useParams } from "react-router-dom";
import GetAllCategoryNotRequest from "../../../components/Category/component/other";
import CategoryProductComponent from "../../../components/Category";
const CategoryProduct = () => {
  const { id } = useParams();
  return (
    <div >
      <CategoryProductComponent />
      <GetAllCategoryNotRequest id={id} />
    </div>
  );
};

export default CategoryProduct;
