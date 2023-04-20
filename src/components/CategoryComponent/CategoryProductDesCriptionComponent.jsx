import React, { useContext } from 'react'
import { Suspense, useEffect, useState } from 'react'
import { getCategory } from '../../api/category';
import { category$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate, getCateSlice } from '../../redux/slice/category/ThunkCategory/category';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import SeriNumberMovie from '../seri/SeriNumberMovie.jsx';
import { getOneById$ } from '../../redux/selectors/category';
import { useSWRWithAxios } from '../../hook/Swr';
import { urlSwr } from '../../function';
import { Loading } from '../Message/Loading';
import { MyContext } from '../Context';
const Divstyled = styled.div``;
const Psyled = styled.p``;
const DivstyledTitle = styled.div`
  font-size:20px;
  margin-bottom:10px;
`;

const ImageStyled = styled.img`
  width:100%;
  height:100%;
  object-fit: cover;
  border-radius:3px;
`

const CategoryProductComponent = () => {
  const { id } = useParams();
  // const category = useSelector(getOneById$); //getAllcategory
  // const { data: category, isLoading } = useSWRWithAxios(urlSwr + `/category/${id}`); cách 2
  // const dispatch = useDispatch();
  // useEffect(() => { //cách 1
  //    dispatch(getCateSlice(id));
  // }, [id]);
  const { category, isLoading } = useContext(MyContext);
  if (isLoading) {
    return <Loading />
  }
  return (
    <Divstyled>
      {category ? category.map((item, index) => (
        // cách 3
        item._id == id ? <Divstyled style={{ margin: "20px" }} key={index}> 
          <Divstyled style={{ color: "#fff" }}>
            <Divstyled className='d-flex detail_video'>
              <Divstyled className="data_img mb-5">
                <ImageStyled src={item.linkImg} alt="" />
              </Divstyled>
              <Divstyled>
                <Divstyled className="category">
                  <DivstyledTitle>{item.name}</DivstyledTitle>
                </Divstyled>
                <Divstyled className="loai des">
                  <Psyled>Thể loại : Kiếm hiệp, truyện</Psyled>
                  <Psyled>Tổng Số tập: {item._id == id ? item.sumSeri : ""}</Psyled>
                  <Psyled>Thời gian: 15-20 phút </Psyled>
                  <Psyled>Năm phát hành : 2023</Psyled>
                  <Psyled>Kiểu: Thuyết minh</Psyled>
                </Divstyled>
                <br />
                <SeriNumberMovie />
              </Divstyled>
            </Divstyled>
            <Divstyled className='des'>
              <Divstyled className='h6'>Nội dung Phim: </Divstyled>
              <Psyled>{item.des}</Psyled>
            </Divstyled>
          </Divstyled>
        </Divstyled> : ""
      )) : ""}
    </Divstyled>
  )
}

export default CategoryProductComponent
