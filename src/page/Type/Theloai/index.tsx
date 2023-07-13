import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { Loader, MessageErr } from '../../../components/Message/Loading';
import { Div, DivStyled, DivStyledContent, DivStyledImage, DivStyledItem, DivStyledText, DivStyledTitle, DivStyledTitleItem } from '../../../components/Styled/Type';
import { NotUpdate } from '../../../components/Message/Warning';

const ListType = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSWRWithAxios(urlSwr + `/categorymain/${id}`);

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }

  return (
    <div className='col-md-10'>
      <div className="p-3">
        <DivStyledText>Trang chủ - {data.name}</DivStyledText>
        <DivStyledTitle className="text-white">{data.name}</DivStyledTitle>
        <DivStyledText className='mt-3'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
        <DivStyled className='mt-4'>
          {data.products && data.products.length ? data.products.map((item: any, index: number) => (
            <DivStyledContent key={index}>
              <DivStyledItem>
                <Link to={'/d/' + item._id + `?c=${item.categorymain}` + "?n=" + `${item.name + " " + item.seri} `}>
                  <Div>
                    <DivStyledImage src={item.image}></DivStyledImage>
                  </Div>
                </Link>
                <DivStyledTitleItem>{item.name}</DivStyledTitleItem>
                <DivStyledText>{data.name}</DivStyledText>
              </DivStyledItem>
            </DivStyledContent>
          )) : <NotUpdate/>}
        </DivStyled>
      </div>
    </div>
  )
}

export default ListType