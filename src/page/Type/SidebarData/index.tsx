import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { DivStyled, DivStyledText, DivStyledTitle } from '../../../components/Styled/Type';
import { Loader, MessageErr } from '../../../components/Message/Loading';
import { motion } from "framer-motion";
import PaginationCustoms from '../../../components/Pagination';
import CategoryContents from '../../../components/Content/Category';
import { ChangeContext } from '../../../context';
import styled from 'styled-components';
import { NotUpdate } from '../../../components/Message/Warning';


const DivStyledBtnItem = styled.div`
padding:20px;
border-radius:5px;
font-size:13px;
font-weight:500;
&:hover{
  cursor:pointer;
}
@media (min-width: 768px){
  font-size:16px;
}
@media (min-width: 1024px){
  font-size:17px;
}
`;

const backgrounds = [
  {
    background: "#101010",
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

const SidebarApi = () => {
  const [page, setPage] = useState(1);
  const { state } = useContext(ChangeContext);
  const { id } = useParams();
  const { data: { data, length }, isLoading, isError } = useSWRWithAxios(urlSwr + `/type/${id}?page=${page}`);
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }
  return (
    <motion.div
      className={state ? "w-11/12" : "w-10/12"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='p-2'>
        <div>
          <DivStyledText><Link to={'/'}>Trang chủ</Link> - {data ? data.name : ""}</DivStyledText>
          <DivStyledTitle className="text-white">{data ? data.name : ""}</DivStyledTitle>
          <DivStyledText className='mt-3 mb-5'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
        </div>
        {data.products.length == 0 && data.category.length == 0 && data.categorymain.length == 0 ? <NotUpdate /> : <DivStyled>
          {data.products.length <= 0 && data.categorymain.length <= 0 ? data.category.map((item: any, index: any) => (
            <div key={index}>
              <CategoryContents
                title={item.name}
                link={'/q/' + item._id + `?n=${item.name}`}
                image={item.linkImg}
                time={'Thời gian 15/20 phút'}
                typecm={data.name}
              />
            </div>
          )) : data.category.length <= 0 && data.categorymain.length <= 0 ? data.products.map((item: any, index: number) => (
            <div key={index}>
              <CategoryContents
                title={item.name}
                link={'/d/' + item._id + `?c=${item.typeId}` + "?n=" + `${item.name + " " + item.seri} `}
                image={item.image}
                time={'Thời gian 1h/2h'}
                typecm={data.name}
              />
            </div>
          )) : data.categorymain.length > 0 && data.products.length <= 0 && data.category.length <= 0 ? data.categorymain.map((item: any, index: any) => (
            <Link to={`/types/h/${item.cates._id}`} key={index}>
              <DivStyledBtnItem className="text-center text-gray text-[#fff]" style={backgrounds[index]}>{item.cates.name}</DivStyledBtnItem>
            </Link>
          )) : '123'
          }
        </DivStyled>}
        <PaginationCustoms
          className='text-end mt-12'
          currentPage={page}
          defaultCurrent={1}
          totalItems={length}
          pageSize={10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </motion.div >
  )
}

export default SidebarApi
