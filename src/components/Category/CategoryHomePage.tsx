import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, MessageErr } from '../Message/Loading';
import CategoryContents from '../Content/Category';
import { PlusOutlined } from '@ant-design/icons';
import { NotUpdate } from '../Message/Warning';
import { useSWRWithAxios } from '../../hook/Swr';
import { urlSwr } from '../../function';
import { CategoryHomepage, Div, DivstyledAllTitle } from './styles';
const Divstyled = styled.div``;
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
      <div className='d-flex justify-between items-center'>
        <DivstyledAllTitle className=' text-white all_movie underline text-3xl font-extrabold dark:text-white'>Hh 3d</DivstyledAllTitle>
      </div>
      <CategoryHomepage className="categoryMovie">
        {category ? category.map((item: any, index: any) => {
          return <Divstyled className='movie_css' key={index}>
            <CategoryContents
              title={item.name}
              link={'/q/' + item._id + `?n=${item.name}`}
              image={item.linkImg}
              time='Thời gian 20/12 phút'
              sumSeri={item.sumSeri}
            />
          </Divstyled>
        }) : ""}
        <Link to={'/loadmore'}>
          <Div className='flex justify-center gap-2 items-center'>
            <PlusOutlined />
            <div style={{ color: '#999' }}>Load more</div>
          </Div>
        </Link>
      </CategoryHomepage>
      <DivstyOllMovie >
        <DivstyledAllTitle className='text-light  all_movie underline text-3xl font-extrabold text-white '>{phim ? phim.name : ''}</DivstyledAllTitle>
        <CategoryHomepage className="categoryMovie">
          {phim && phim.products.length ? phim.products.map((item: any, index: any) => {
            return <Divstyled className='movie_css' key={index}>
              <CategoryContents
                title={item.name}
                link={'/d/' + item._id + `?c=${item.typeId}`}
                image={item.image}
                time='Thời gian 20/12 phút'
                sumSeri={item.sumSeri}
              />
            </Divstyled>
          }) : <NotUpdate />}
        </CategoryHomepage>
      </DivstyOllMovie>
    </DivstyledContainer>
  )
}

export default CategoryHomePage
