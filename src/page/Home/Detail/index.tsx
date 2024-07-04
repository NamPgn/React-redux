import CategoryHomePage from "../../../components/Category/component/home";
import React, { Suspense, useContext } from "react";
import { Loader } from "../../../components/Message/Notification";
import DetailComponent from "../../../components/Main";
import { useAppSelector } from "../../../hook";
const DetailProduct = () => {
  const { data } = useAppSelector((state) => state.category.category);
  const isLoading = useAppSelector((state) => state.category.isLoading);
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <DetailComponent />
      </Suspense>
      <CategoryHomePage
        category={data}
        isLoading={isLoading}
        isError={undefined}
      />
    </React.Fragment>
  );
};

export default DetailProduct;
