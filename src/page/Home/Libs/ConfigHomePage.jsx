import React, { useEffect, Suspense } from 'react';
import Iframe from 'react-iframe';
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import { Loader } from '../../../components/Message/Loading';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import CategoryProductSidebar from '../../../components/CategoryComponent/CategoryProductSideBar';
import styled from 'styled-components';
import SliderComponent from '../../../components/Slider';
const CategoryHomePage = React.lazy(() => import('../../../components/CategoryComponent/CategoryHomePage'));
const Divstyled = styled.div``;
const ConfigHomePage = ({ category, isLoading, isError }) => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  const { data: trailer, isLoading: LoadingTrailer, isError: ErrTrailer } = useSWRWithAxios(urlSwr + `/trailerUrl`);
  return (
    <Divstyled>
      <Divstyled className=' d-flex'>
        <Divstyled className='col-md-9 ' >
          <Divstyled className="h-full" >
            {
              ErrTrailer === undefined ? LoadingTrailer === false ? trailer ? trailer.map((item, index) => (
                <Divstyled key={index}>
                  <Iframe src={`${item.url}?mute=1&autoplay=1`}
                    width='100%'
                    height=''
                    allowFullScreen='true'
                    allow='autoplay'
                  />
                </Divstyled>
              )) : <Divstyled style={{ color: "red" }}>Network Error</Divstyled> : "" : <Loader />
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
