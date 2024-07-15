import CategoryHomePage from "../../../components/Category/component/home";
import React, { Suspense } from "react";
import { Loader } from "../../../components/Message/Notification";
import DetailComponent from "../../../components/Main";
import { useAppSelector } from "../../../hook";
import LazyLoadOtherComponents from "../../../components/LazyOtherComponents";
const DetailProduct = () => {

  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <DetailComponent />
      </Suspense>
      <LazyLoadOtherComponents>
        <CategoryHomePage
        />
      </LazyLoadOtherComponents>
    </React.Fragment>
  );
};

export default DetailProduct;
