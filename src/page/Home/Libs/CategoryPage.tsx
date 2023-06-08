import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import GetAllCategoryNotRequest from '../../../components/CategoryComponent/GetAllCategoryNotRequest';
import CategoryProductComponent from '../../../components/CategoryComponent/CategoryProductDesCriptionComponent';
const CategoryProduct = () => {
  const { id } = useParams();
  return (
    <div>
      <div className='d-flex'>
        <CategoryProductComponent />
      </div>
      <GetAllCategoryNotRequest id={id} />
    </div>
  )
}

export default CategoryProduct
