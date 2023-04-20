import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allCategoryNotReq$ } from '../../redux/selectors';
import { isPendingCategory$ } from '../../redux/selectors/category';
import { getAllCategoryNotReqSlice } from '../../redux/slice/category/ThunkCategory/category';
import styled from 'styled-components';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const Psyled = styled.p``;
const DivstyledTitle = styled.div`
  font-size:18px;
  color:#fff;
  margin:0 20px;
`
const GetAllCategoryNotRequest = ({ id }) => {
  const category = useSelector(allCategoryNotReq$);
  const dispatch = useDispatch();
  const isPendingCategory = useSelector(isPendingCategory$);
  useEffect(() => {
    dispatch(getAllCategoryNotReqSlice(id));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [id]);
  return (
    <Divstyled>
      <DivstyledTitle className='underline text-3xl font-extrabold dark:text-white'>Liên quan</DivstyledTitle>
      <Divstyled className="categoryMovie px-3 mt-5">
        {category ? category.map((item, index) => (
          <Divstyled className='movie_css' key={index}>
            <Divstyled >
              <Divstyled className="cateConten cateItem" style={{ width: "100%", }} >
                <Link to={'/q/' + item._id + `?category=${item.name}`} >
                  <img style={{ width: "100%" }} src={item.linkImg} alt="" />
                </Link>
                <Divstyled className="cateTitle text-light mt-1">
                  <Link to={'/q/' + item._id + `?category=${item.name}`}>
                    <Psyled>{item.name}</Psyled>
                  </Link>
                </Divstyled>
                <Divstyled className='release_date'>
                  <Psyled>Tổng {item.sumSeri} tập</Psyled>
                </Divstyled>
                <Divstyled className='release_date'>
                  <Psyled>Thời gian 20/12 phút</Psyled>
                </Divstyled>
              </Divstyled>
            </Divstyled>
          </Divstyled>
        )) : "Trống!"}
      </Divstyled>
    </Divstyled>
  )
}

export default GetAllCategoryNotRequest
