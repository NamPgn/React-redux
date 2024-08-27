import React, { useMemo } from "react";
import ProductAdmin from ".";
import { useAppSelector } from "../../../hook";

const DataProduct = () => {
  const data: any = useAppSelector(
    (state) => state.product.value
  );
  const isLoading: any = useAppSelector((state) => state.product.isLoading);
  const memoizedProduct = useMemo(() => data, [data]);
  const memoizedIsLoading = useMemo(() => isLoading, [isLoading]);
  return (
    <>
      <ProductAdmin products={memoizedProduct} isLoading={memoizedIsLoading} />
    </>
  );
};

export default DataProduct;
