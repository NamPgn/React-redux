
import React, { useEffect, Suspense } from 'react';
import Iframe from 'react-iframe';
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import { Loader, MessageErr } from '../../../components/Message/Loading';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import CategoryProductSidebar from '../../../components/CategoryComponent/CategoryProductSideBar';
import styled from 'styled-components';
const CategoryHomePage = React.lazy(() => import('../../../components/CategoryComponent/CategoryHomePage'));
const Divstyled = styled.div``;
const ConfigHomePage = ({ category, isLoading, isError }) => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  const { data: trailer, isLoading: LoadingTrailer, isError: ErrTrailer }: any = useSWRWithAxios(urlSwr + `/trailerUrl`);
  if (LoadingTrailer) {
    return <Loader />
  }
  if (ErrTrailer) {
    return <MessageErr />
  }
  return (
    <Divstyled>
      <Divstyled className=' d-flex'>
        <Divstyled className='col-md-9 ' >
          <Divstyled className="h-full" >
            {
              trailer ? trailer.map((item: any, index: any) => (
                <Divstyled key={index}>
                  <Iframe url={`${item.url}?mute=1&autoplay=1`}
                    width='100%'
                    allow='autoplay'
                    allowFullScreen
                  />
                </Divstyled>
              )) : ""
            }
          </Divstyled>
        </Divstyled>
        <CategoryProductSidebar
          category={category}
          isLoading={isLoading}
          isError={isError}
        />
      </Divstyled>
      <ContactAdmin />
      <CategoryHomePage
        category={category}
        isLoading={isLoading}
        isError={isError}
      />
    </Divstyled>
  )
}

export default ConfigHomePage
