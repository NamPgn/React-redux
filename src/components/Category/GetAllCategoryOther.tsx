import React, { useEffect } from 'react'
import { allCategoryNotReq$ } from '../../redux/selectors';
import { isPendingCategory$ } from '../../redux/selectors/category';
import { getAllCategoryNotReqSlice } from '../../redux/slice/category/ThunkCategory/category';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Loader } from '../Message/Loading';
import CategoryContents from '../Content/Category';
import { CategoryHomepage } from './styles';
const DivstyledTitle = styled.div`
  color:#fff;
`
const GetAllCategoryNotRequest = ({ id }) => {
  const category = useAppSelector(allCategoryNotReq$);
  const dispatch = useAppDispatch();
  const isPendingCategory = useAppSelector(isPendingCategory$);
  useEffect(() => {
    dispatch(getAllCategoryNotReqSlice(id));
    window.scrollTo({
      top: 0,
    })
  }, [id]);
  if (isPendingCategory) {
    return <Loader />
  }
  return (
    <div>
      <DivstyledTitle className='underline'>Liên quan</DivstyledTitle>
      <CategoryHomepage className="categoryMovie mt-5 ">
        {category ? category.map((item: any, index: any) => (
          <CategoryContents key={index}
            title={item.name}
            link={'/q/' + item._id + `?n=${item.name}`}
            image={item.linkImg}
            sumSeri={item.sumSeri}
            time='Thời gian 20/12 phút'
          />
        )) : "Trống!"}
      </CategoryHomepage>
    </div>
  )
}

export default GetAllCategoryNotRequest
