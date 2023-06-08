import React from 'react'
import ProductAdmin from './ProductAdmin'
import { useAppSelector } from '../../../hook';

const DataProduct = () => {
  const product = useAppSelector(state => state.product.value);
  return (
    <>
      <ProductAdmin product={product} />
    </>
  )
}

export default DataProduct