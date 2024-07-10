import CategoryHomePage from "../../../components/Category/component/home";
import React, { Suspense } from "react";
import { Loader } from "../../../components/Message/Notification";
import DetailComponent from "../../../components/Main";
import { useAppSelector } from "../../../hook";
import LazyLoadOtherComponents from "../../../components/LazyOtherComponents";
const DetailProduct = () => {
  const { data } = useAppSelector((state) => state.category.category);
  const isLoading = useAppSelector((state) => state.category.isLoading);
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <DetailComponent />
      </Suspense>
      <LazyLoadOtherComponents>
        <CategoryHomePage
          category={data}
          isLoading={isLoading}
          isError={undefined}
        />
      </LazyLoadOtherComponents>
    </React.Fragment>
  );
};

export default DetailProduct;
