import React, { useEffect } from 'react'
import styled from 'styled-components';
import { Loader } from '../../Message/Loading';
import { urlSwr } from '../../../function';
import { useSWRWithAxios } from '../../../hook/Swr';
import MVGridCategory from '../../Grid/component';
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
    <React.Fragment>
      <DivstyledTitle className='underline my-2'>Liên quan</DivstyledTitle>
      <MVGridCategory
        type="category"
        gutter={[16, 16]}
        child={categorys}
      />
    </React.Fragment>
  )
}

export default GetAllCategoryNotRequest
