import React, { Suspense } from 'react'
import Iframe from 'react-iframe'
import CategoryProductDm from '../components/CategoryProduct';
import ContactAdmin from '../components/ContactAdmin';
import { Loader } from '../components/Loading';

const CategoryHomePage = React.lazy(() => import('../components/CategoryHomePage'));
const HomePage = () => {
  return (
    <div >
      <div className=' d-flex'>
        <div className='col-md-9 ' >
          <div className="h-full" >
            <Iframe src='https://www.youtube.com/embed/DHhuZI_U31U?mute=1&autoplay=1'
              width='100%'
              height='300px'
              allowFullScreen='true'
              allow='autoplay'
            />
            <ContactAdmin />
          </div>
        </div>
        <CategoryProductDm />
      </div>
      <Suspense fallback={<Loader />}>
        <CategoryHomePage />
      </Suspense>
    </div>
  )
}

export default HomePage