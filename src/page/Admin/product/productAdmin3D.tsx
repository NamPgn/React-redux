import React, { memo } from "react";
import BaseProductAdmin from "./components/baseProductAdmin";
import { PRODUCT_CONFIGS } from "./types";

const ProductAdmin3D = memo(() => {
  return (
    <BaseProductAdmin
      version="3d"
      config={PRODUCT_CONFIGS['3d']}
    />
  );
});

ProductAdmin3D.displayName = 'ProductAdmin3D';

export default ProductAdmin3D;
