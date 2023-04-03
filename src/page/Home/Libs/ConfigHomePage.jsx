import React, { useEffect, Suspense } from 'react'
import Iframe from 'react-iframe'
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import { Loader } from '../../../components/Message/Loading';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../main';
import CategoryProductSidebar from '../../../components/CategoryComponent/CategoryProductSideBar';
const CategoryHomePage = React.lazy(() => import('../../../components/CategoryComponent/CategoryHomePage'));
const ConfigHomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  const { data: trailer, isLoading: LoadingTrailer, isError: ErrTrailer } = useSWRWithAxios(urlSwr + `/trailerUrl`);
  const { data: category, isLoading: LoadingCatetegory } = useSWRWithAxios(urlSwr + `/categorys`);

  return (
    <div>
      <div className=' d-flex'>
        <div className='col-md-9 ' >
          <div className="h-full" >
            {
              ErrTrailer === undefined ? LoadingTrailer === false ? trailer ? trailer.map((item, index) => (
                <div key={index}>
                  <Iframe src={`${item.url}?mute=1&autoplay=1`}
                    width='100%'
                    height=''
                    allowFullScreen='true'
                    allow='autoplay'
                  />
                </div>
              )) : <div style={{ color: "red" }}>Network Error</div> : "" : <Loader />
            }
          </div>
        </div>
        <CategoryProductSidebar category={category} isLoading={LoadingCatetegory} />
      </div>
      <ContactAdmin />
      <CategoryHomePage category={category} isLoading={LoadingCatetegory} />
    </div>
  )
}

export default ConfigHomePage
