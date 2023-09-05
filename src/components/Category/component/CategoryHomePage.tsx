import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, MessageErr } from '../../Message/Loading';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { DivstyledAllTitle } from '../styles';
import MVGrid from '../../Grid/component';
const DivstyOllMovie = styled.div``;
const DivstyledContainer = styled.div`
`;

type CategoryProp = {
  category: any,
  isLoading: boolean,
  isError: any,
  phim?: any,
  loading?: boolean
}

const CategoryHomePage = ({ category, isLoading, isError }: CategoryProp) => {
  const { data: phim, isLoading: loading } = useSWRWithAxios(urlSwr + '/type/movie');
  if (isLoading && loading) {
    return <Loader />;
  }
  if (isError) {
    return <MessageErr />
  }
  return (
    <DivstyledContainer >
      <div className='flex justify-between items-center'>
        <DivstyledAllTitle className='text-white all_movie underline text-3xl font-extrabold dark:text-white'>Hh 3d</DivstyledAllTitle>\
        <Link to={'/loadmore'}>
          <div className='underline lg:text-[15px] md:text[14px] text-[13px] text-[#999]'>Xem tất cả</div>
        </Link>
      </div>
      <MVGrid
        type="category"
        gutter={[16, 16]}
        child={category}
      />
      <DivstyOllMovie >
        <DivstyledAllTitle className='text-light all_movie underline text-3xl font-extrabold text-white '>{phim ? phim.name : ''}</DivstyledAllTitle>
        <MVGrid
          type="types"
          gutter={phim && phim.products.length ? [16, 16] : 0}
          child={phim.products}
        />
      </DivstyOllMovie>
    </DivstyledContainer>
  )
}

export default CategoryHomePage
