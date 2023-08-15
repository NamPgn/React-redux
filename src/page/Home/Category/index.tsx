import React, { Suspense, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GetAllCategoryNotRequest from '../../../components/Category/GetAllCategoryOther';
import CategoryProductComponent from '../../../components/Category/CategoryProduct';
import { ChangeContext } from '../../../context';
const CategoryProduct = () => {
  const { id } = useParams();
  const { state } = useContext(ChangeContext) || {};
  return (
    <div className={` lg:m-[20px] md:m-[18px] mx-[10px] my-[20px] ${state ? 'w-11/12 ' : 'w-10/12'}`}>
      <div className='d-flex'>
        <CategoryProductComponent />
      </div>
      <GetAllCategoryNotRequest id={id} />
    </div>
  )
}

export default CategoryProduct
