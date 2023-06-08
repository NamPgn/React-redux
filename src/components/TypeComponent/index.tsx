import React from 'react'
import styled from 'styled-components';
import { useSWRWithAxios } from '../../hook/Swr';
import { urlSwr } from '../../function';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Loader } from '../Message/Loading';
import { MessageErr } from '../Message/Loading';


const DivStyled = styled.div``;
export const DivStyledTitle = styled.div`
font-weight:500;
margin-top:15px;
font-size:25px;
`;
export const DivStyledText = styled.div`
font-size:15px;
color:#999;
`;

const DivStyledBtn = styled.div`
padding:15px;
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 15px;
text-align: center;
margin-top: 50px;


`;

const DivStyledBtnItem = styled.div`
padding:20px;
border-radius:5px;
font-size:18px;
font-weight:500;
&:hover{
  cursor:pointer;
}
`;


const backgrounds = [
  {
    background: "#101010"
  },
  {
    background: "#dbc100"
  },
  {
    background: "#3040b3"
  },
  {
    background: "#1dc3ed"
  },
  {
    background: "#101010"
  },
  {
    background: "#368c27"
  },
  {
    background: "#d11b1b"
  },
  {
    background: "#101010"
  },
  {
    background: "#101010"
  }
]
const DivStyledContent = styled.div``;
const DivStyledItem = styled.div``;
const Series = () => {
  const { id } = useParams();
  const { data: { categorymain }, isLoading, isError } = useSWRWithAxios(urlSwr + `/type/${id}`);
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }

  return (
    <DivStyled>
      <DivStyledContent>
        <DivStyledItem>
          <DivStyledText>Trang chủ - thể loại</DivStyledText>
          <DivStyledTitle>Thể loại</DivStyledTitle>
          <DivStyledText className='mt-3 mb-4'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
          <DivStyledBtn>
            {categorymain ? categorymain.map((item:any, index:any) => (
              <Link to={`/types/h/${item.cates._id}`} key={index}>
                <DivStyledBtnItem style={backgrounds[index]}>{item.cates.name}</DivStyledBtnItem>
              </Link>
            )) : ""}
          </DivStyledBtn>
        </DivStyledItem>
      </DivStyledContent>
    </DivStyled>
  )
}

export default Series