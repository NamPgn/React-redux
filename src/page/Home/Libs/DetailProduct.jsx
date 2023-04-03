
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import CategoryHomePage from '../../../components/CategoryComponent/CategoryHomePage';
import React, { Suspense } from 'react';
import { Loader } from '../../../components/Message/Loading';
import { urlSwr } from '../../../main';
import { useSWRWithAxios } from '../../../hook/Swr';
const DetailProduct = () => {
  const DetailComponent = React.lazy(() => import('../../../components/Main/DetailComponent'));
  const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/categorys`);
  return (
    <>
      <React.Fragment>
        <ContactAdmin />
        <Suspense fallback={<Loader />}>
          <DetailComponent />
        </Suspense>
        <CategoryHomePage category={category} isLoading={isLoading} />
      </React.Fragment>
    </>
  )
}

export default DetailProduct