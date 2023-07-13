import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SidebarApi from '../../page/Type/SidebarData'
import { Loader, MessageErr } from '../Message/Loading';
import CategoryContents from '../Content/Category';
import { PlusOutlined } from '@ant-design/icons';
const Divstyled = styled.div``;
const DivstyOllMovie = styled.div``;
const DivstyledContainer = styled.div`
`;
const Div = styled.div`
color: rgb(153, 153, 153);
padding: 118px 0;
text-align: center;
border-radius: 5px;
border: 2px solid;
`

const DivstyledAllTitle = styled.div`
  margin: 40px 0px;
`
type CategoryProp = {
  category: any,
  isLoading: boolean,
  isError: any
}

const CategoryHomePage = ({ category, isLoading, isError }: CategoryProp) => {
  if (isLoading) {
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
      <Divstyled className="categoryMovie">
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
      </Divstyled>
      <DivstyOllMovie className="pl">
        <DivstyledAllTitle style={{ color: "#fff" }} className='text-light all_movie underline text-3xl font-extrabold dark:text-white '>Phim lẻ</DivstyledAllTitle>
        {/* <SidebarApi  /> */}
      </DivstyOllMovie>
    </DivstyledContainer>
  )
}

export default CategoryHomePage
