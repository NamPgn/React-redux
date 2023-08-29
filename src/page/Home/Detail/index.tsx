
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import CategoryHomePage from '../../../components/Category/CategoryHomePage';
import React, { Suspense, useContext } from 'react';
import { Loader } from '../../../components/Message/Loading';
import { MyContext } from '../../../context';
import DetailComponent from '../../../components/Main';
const DetailProduct = () => {
  const { category, isLoading }: any = useContext(MyContext);
  return (
    <>
      <div
        className={'lg:px-5 md:px-3'}>
        <ContactAdmin />
        <Suspense fallback={<Loader />}>
          <DetailComponent />
        </Suspense>
        <CategoryHomePage category={category.data}
          isLoading={isLoading}
          isError={undefined}
        />
      </div>
    </>
  )
}

export default DetailProduct