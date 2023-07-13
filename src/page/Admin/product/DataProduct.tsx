import React from 'react'
import ProductAdmin from './ProductAdmin'
import { useAppSelector } from '../../../hook';

const DataProduct = () => {
  const { product, length }: any = useAppSelector(state => state.product.value);
  return (
    <>
      <ProductAdmin product={product} length={length} />
    </>
  )
}

export default DataProduct