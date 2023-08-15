
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import CategoryHomePage from '../../../components/Category/CategoryHomePage';
import React, { Suspense, useContext } from 'react';
import { Loader } from '../../../components/Message/Loading';
import { ChangeContext, MyContext } from '../../../context';
import DetailComponent from '../../../components/Main';
const DetailProduct = () => {
  const { category, isLoading }: any = useContext(MyContext);
  const { state } = useContext(ChangeContext) || {};
  return (
    <>
      <div
        className={state ? 'w-11/12 px-5' : 'w-10/12 lg:px-5 md:px-3'} >
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