import CategoryHomePage from "../../../components/Category/component/home";
import React, { Suspense, useContext } from "react";
import { Loader } from "../../../components/Message/Notification";
import { MyContext } from "../../../context";
import DetailComponent from "../../../components/Main";
const DetailProduct = () => {
  const { category, isLoading }: any = useContext(MyContext);
  return (
    <React.Fragment>
      <Suspense fallback={<Loader />}>
        <DetailComponent />
      </Suspense>
      <CategoryHomePage
        category={category.data}
        isLoading={isLoading}
        isError={undefined}
      />
    </React.Fragment>
  );
};

export default DetailProduct;
