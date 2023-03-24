
import ContactAdmin from '../components/ContactAdmin';
import CategoryHomePage from '../components/CategoryComponent/CategoryHomePage';
import React, { Suspense } from 'react';
import { Loader } from '../components/Loading';
const DetailProduct = () => {
  const DetailComponent = React.lazy(() => import('../components/Detail/DetailComponent'))
  return (
    <>
      <React.Fragment>
        <ContactAdmin />
        <Suspense fallback={<Loader />}>
          <DetailComponent />
        </Suspense>
        <CategoryHomePage />
      </React.Fragment>
    </>
  )
}

export default DetailProduct