import React, { useEffect, useState, Suspense } from 'react'
import Iframe from 'react-iframe'
import CategoryProductDm from '../components/CategoryComponent/CategoryProductSideBar';
import ContactAdmin from '../components/ContactAdmin';
import { Loader } from '../components/Loading';
import { getTrailerUrls } from '../api/trailer';
const CategoryHomePage = React.lazy(() => import('../components/CategoryComponent/CategoryHomePage'));

const ConfigHomePage = () => {
  const [state, Setstate] = useState([]);
  useEffect(() => {
    const getUrlTrailer = async () => {
      const { data } = await getTrailerUrls();
      Setstate(data);
    }
    getUrlTrailer();
    document.title = "Home Page";
  }, []);
  return (
    <div>
      <div className=' d-flex'>
        <div className='col-md-9 ' >
          <div className="h-full" >
            {
              state ? state.map((item, index) => (
                <div key={index}>
                  <Iframe src={`${item.url}?mute=1&autoplay=1`}
                    width='100%'
                    height=''
                    allowFullScreen='true'
                    allow='autoplay'
                  />
                </div>
              )) : <Loader />
            }
          </div>
        </div>
        <CategoryProductDm />
      </div>
      <ContactAdmin />
      <Suspense fallback={<Loader />}>
        <CategoryHomePage />
      </Suspense>

    </div>
  )
}

export default ConfigHomePage
