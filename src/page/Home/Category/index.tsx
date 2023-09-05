import React from 'react'
import { useParams } from 'react-router-dom'
import GetAllCategoryNotRequest from '../../../components/Category/component/GetAllCategoryOther';
import CategoryProductComponent from '../../../components/Category';
const CategoryProduct = () => {
  const { id } = useParams();
  return (
    <div className={`lg:m-[20px] md:m-[18px] mx-[10px] my-[20px]`}>
      <div className='d-flex'>
        <CategoryProductComponent />
      </div>
      <GetAllCategoryNotRequest id={id} />
    </div>
  )
}

export default CategoryProduct
