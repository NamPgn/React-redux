import React from 'react'
import ProductAdmin from '..'
import { useAppSelector } from '../../../../hook';

const DataProduct = () => {
  const { product, length }: any = useAppSelector(state => state.product.value);
  const isLoading: any = useAppSelector(state => state.product.isLoading);
  return (
    <>
      <ProductAdmin
        product={product}
        isLoading={isLoading}
        length={length}
      />
    </>
  )
}

export default DataProduct