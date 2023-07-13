
import React, { useEffect } from 'react';
import ContactAdmin from '../../../components/Contact/ContactAdmin';
import { MessageErr } from '../../../components/Message/Loading';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import CategoryProductSidebar from '../../../components/CategoryComponent/CategoryProductSideBar';
import WeekComponent from '../../../components/Week';
import CategoryHomePage from '../../../components/CategoryComponent/CategoryHomePage';
import styled from 'styled-components';

const Video = styled.video`
`

const VideoContainer = styled.div`
padding-bottom:60%;
@media(min-width:768px){
  padding-bottom:50%;
}
@media(min-width:1024px){
  padding-bottom:45%;
}
`
const ConfigHomePage = ({ category, isLoading, isError, state }) => {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  const { data: trailer, isLoading: LoadingTrailer, isError: ErrTrailer }: any = useSWRWithAxios(urlSwr + `/trailer`);
  if (ErrTrailer) {
    return <MessageErr />
  }
  return (
    <div className={state ? 'p-3' : 'mt-3'}>
      <div className='d-flex'>
        <div className='lg:w-9/12 md:w-12/12 sm:w-full tl'>
          <div className="h-full" >
            <VideoContainer className='relative md:mx-2 '>
              <Video className='h-full absolute bg-black rounded' width="100%" loop muted autoPlay controls src={trailer.url} />
            </VideoContainer>
          </div>
        </div>
        <CategoryProductSidebar
          category={category}
          isLoading={isLoading}
        />
      </div>
      <ContactAdmin />
      <WeekComponent />
      <CategoryHomePage
        category={category}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  )
}

export default ConfigHomePage
