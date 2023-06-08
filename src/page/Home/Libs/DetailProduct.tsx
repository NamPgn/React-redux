
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import CategoryHomePage from '../../../components/CategoryComponent/CategoryHomePage';
import React, { Suspense, useContext } from 'react';
import { Loader } from '../../../components/Message/Loading';
import { MyContext } from '../../../context';

const DetailProduct = () => {
  const DetailComponent = React.lazy(() => import('../../../components/Main/DetailComponent'));
  const { category, isLoading }: any = useContext(MyContext);
  return (
    <>
      <React.Fragment>
        <div className='col-md-10' style={{ background: '#00000037' }}>
          <ContactAdmin />
          <Suspense fallback={<Loader />}>
            <DetailComponent />
          </Suspense>
          <CategoryHomePage category={category} isLoading={isLoading} isError={undefined} />
        </div>
      </React.Fragment>
    </>
  )
}

export default DetailProduct