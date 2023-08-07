import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Loading } from '../Message/Loading';
import { MyContext } from '../../context';
import SeriNumberMovie from '../Seri/SeriNumberMovie';
const Divstyled = styled.div``;
const Psyled = styled.p``;
const DivstyledTitle = styled.div`
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
  const { category, isLoading }: any = useContext(MyContext);
  if (isLoading) {
    return <Loading />
  }
  return (
    <Divstyled>
      {category ? category.data.map((item, index) => (
        // cách 3
        item._id == id ? <Divstyled key={index}>
          <Divstyled style={{ color: "#fff" }}>
            <Divstyled className='md:flex lg:flex block gap-2 '>
              <Divstyled className="data_img mb-5 lg:w-3/12 md:w-3/12 md:h-full h-52 ">
                <ImageStyled src={item.linkImg} alt="" />
              </Divstyled>
              <Divstyled className="lg:w-9/12 md:w-9/12">
                <Divstyled className="category">
                  <DivstyledTitle className="md:text-[14px] " style={{ textTransform: 'capitalize' }}>{item.name}</DivstyledTitle>
                </Divstyled>
                <Divstyled className="loai des text-[12px] md:text-[13px] lg:text-[14px]" >
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
            <Divstyled className='des mt-4'>
              <Divstyled className='lg:text-[15px] md:text-[14px] text-[13px]'>Nội dung phim: </Divstyled>
              <Psyled className="lg:text-[14px] md:text-[13px] text-[12px] text-[#999] mt-4 p-2 rounded bg-[#99999924]">{item.des ? item.des : 'Trống!'}</Psyled>
            </Divstyled>
          </Divstyled>
        </Divstyled> : ""
      )) : ""}
    </Divstyled>
  )
}

export default CategoryProductComponent
