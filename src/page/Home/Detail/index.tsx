
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import CategoryHomePage from '../../../components/Category/component/CategoryHomePage';
import React, { Suspense, useContext } from 'react';
import { Loader } from '../../../components/Message/Loading';
import { MyContext } from '../../../context';
import DetailComponent from '../../../components/Main';
const DetailProduct = () => {
  const { category, isLoading }: any = useContext(MyContext);
  return (
    <React.Fragment>
      <ContactAdmin />
      <Suspense fallback={<Loader />}>
        <DetailComponent />
      </Suspense>
      <CategoryHomePage category={category.data}
        isLoading={isLoading}
        isError={undefined}
      />
    </React.Fragment>
  )
}

export default DetailProduct