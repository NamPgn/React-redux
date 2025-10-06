import React, { memo } from "react";
import BaseProductAdmin from "./components/baseProductAdmin";
import { PRODUCT_CONFIGS } from "./types";

const ProductAdmin2D = memo(() => {
  return (
    <BaseProductAdmin
      version="2d"
      config={PRODUCT_CONFIGS['2d']}
    />
  );
});

ProductAdmin2D.displayName = 'ProductAdmin2D';

export default ProductAdmin2D;
