import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Loading } from '../Message/Loading';
import { MyContext } from '../../context';
import SeriNumberMovie from '../Seri/SeriNumberMovie';
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
  const { category, isLoading }: any = useContext(MyContext);
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
                  <DivstyledTitle style={{textTransform: 'capitalize'}}>{item.name}</DivstyledTitle>
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
