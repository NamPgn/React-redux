import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { allCategoryNotReq$ } from '../../redux/selectors';
import { isPendingCategory$ } from '../../redux/selectors/category';
import { getAllCategoryNotReqSlice } from '../../redux/slice/category/ThunkCategory/category';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { Loader } from '../Message/Loading';
import CategoryContents from '../Content/Category';
const Divstyledsss = styled.div`
@media (mix-width:768px){
  width:250px;
}
`;
const Psyled = styled.p``;
const DivstyledTitle = styled.div`
  font-size:18px;
  color:#fff;
  margin:0 20px;
`
const GetAllCategoryNotRequest = ({ id }) => {
  const category = useAppSelector(allCategoryNotReq$);
  const dispatch = useAppDispatch();
  const isPendingCategory = useAppSelector(isPendingCategory$);
  useEffect(() => {
    dispatch(getAllCategoryNotReqSlice(id));
  }, [id]);
  if (isPendingCategory) {
    return <Loader />
  }
  return (
    <div>
      <DivstyledTitle className='underline text-3xl'>Liên quan</DivstyledTitle>
      <div className="categoryMovie px-3 mt-5">
        {category ? category.map((item: any, index: any) => (
          <CategoryContents key={index}
            title={item.name}
            link={'/q/' + item._id + `?n=${item.name}`}
            image={item.linkImg}
            sumSeri={item.sumSeri}
            time='Thời gian 20/12 phút'
          />
        )) : "Trống!"}
      </div>
    </div>
  )
}

export default GetAllCategoryNotRequest
