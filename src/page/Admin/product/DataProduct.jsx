import React from 'react'
import { useSelector } from 'react-redux'
import ProductAdmin from './ProductAdmin'

const DataProduct = () => {
  const product = useSelector(state => state.product.value);
  return (
    <div>
      <ProductAdmin product={product} />
    </div>
  )
}

export default DataProduct