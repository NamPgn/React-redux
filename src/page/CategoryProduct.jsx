import React, { Suspense } from 'react'
import { Loading } from '../components/Loading';
import { useParams } from 'react-router-dom'
import GetAllCategoryNotRequest from '../components/CategoryComponent/GetAllCategoryNotRequest';
const CategoryProductsComponent = React.lazy(() => import('../components/CategoryComponent/CategoryProductDesCriptionComponent'));
const CategoryProduct = () => {
  const { id } = useParams();
  return (
    <div>
      <div className='d-flex'>
        <Suspense fallback={<Loading />}>
          <CategoryProductsComponent />
        </Suspense>
      </div>
      <GetAllCategoryNotRequest id={id} />
    </div>
  )
}

export default CategoryProduct
