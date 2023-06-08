import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SidebarApi from '../../page/Type/SidebarData'
import { Loader, MessageErr } from '../Message/Loading';
const Divstyled = styled.div``;
const DivstyOllMovie = styled.div``;
const DivstyledContainer = styled.div`
padding:20px;
`;
const DivstyledCateContent = styled.div`
width: 100%;
height:100%; 
`
const Psyled = styled.p``;
const ImageStyled = styled.img`
  width:100%;
  height:100%;
`;

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
      <DivstyledAllTitle className='text-light all_movie underline text-3xl font-extrabold dark:text-white'>Hh 3d</DivstyledAllTitle>
      <Divstyled className="categoryMovie">
        {category ? category.map((item: any, index: any) => {
          return <Divstyled className='movie_css' key={index}>
            <Divstyled >
              <DivstyledCateContent className="cateConten cateItem">
                <Link to={'/q/' + item._id + `?n=${item.name}`}>
                  <ImageStyled src={item.linkImg} alt="" />
                </Link>
                <Divstyled className="cateTitle text-light mt-1" >
                  <Link to={'/q/' + item._id + `?n=${item.name}`} >
                    <Psyled>{item.name}</Psyled>
                  </Link>
                </Divstyled>
                <Divstyled className='release_date mt-2 mb-2'>
                  <Divstyled style={{ fontWeight: "500" }}>{item.sumSeri} Tập</Divstyled>
                </Divstyled>
                <Divstyled className='des'>
                  <Psyled className='h6'>Full hđ/Vietsub</Psyled>
                </Divstyled>
                <Divstyled className='release_date'>
                  <Psyled>Thời gian 20/12 phút</Psyled>
                </Divstyled>
              </DivstyledCateContent>
            </Divstyled>
          </Divstyled>
        }) : ""}
      </Divstyled>
      <DivstyOllMovie>
        <DivstyledAllTitle style={{ color: "#fff" }} className='text-light all_movie underline text-3xl font-extrabold dark:text-white'>Phim lẻ</DivstyledAllTitle>
        <SidebarApi idProp={'643fb6b667a17cd6a2ee3ace'} />
      </DivstyOllMovie>
    </DivstyledContainer>
  )
}

export default CategoryHomePage
