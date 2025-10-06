import React, { memo } from "react";
import ProductAdmin3D from "./productAdmin3D";

const ProductAdmin = memo(() => {
  // Default to 3D version for backward compatibility
  return <ProductAdmin3D />;
});

ProductAdmin.displayName = 'ProductAdmin';

export default ProductAdmin;