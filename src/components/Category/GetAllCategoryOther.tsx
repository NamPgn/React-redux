import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Loader } from '../Message/Loading';
import CategoryContents from '../Content/Category';
import { CategoryHomepage } from './styles';
import { urlSwr } from '../../function';
import { useSWRWithAxios } from '../../hook/Swr';
const DivstyledTitle = styled.div`
  color:#fff;
`
const GetAllCategoryNotRequest = ({ id }) => {
  const { data: categorys, isLoading } = useSWRWithAxios(urlSwr + '/category/getAllCategoryNotRequest/' + id)
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [id]);
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      <DivstyledTitle className='underline'>Liên quan</DivstyledTitle>
      <CategoryHomepage className="categoryMovie mt-5 ">
        {categorys && (
          categorys.map((item: any, index: any) => (
            <CategoryContents key={index}
              title={item.name}
              link={'/q/' + item._id}
              image={item.linkImg}
              sumSeri={item.sumSeri}
              time='Thời gian 20/12 phút'
            />
          ))
        )}
      </CategoryHomepage>
    </div>
  )
}

export default GetAllCategoryNotRequest
