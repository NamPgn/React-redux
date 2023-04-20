import React from 'react';
import { TypeStyled } from '../TypesMovie';
import { DivStyledText, DivStyledTitle } from '../../../components/TypeComponent';
import { Link, useParams } from 'react-router-dom';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { Div, DivStyled, DivStyledContent, DivStyledImage, DivStyledItem, DivStyledTitleItem } from '../TypesMovie/ListProduct';
import { Loader } from '../../../components/Message/Loading';

const SidebarApi = ({ idProp }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSWRWithAxios(urlSwr + `/type/${id ? id : idProp}`);

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return 'Lỗi rồi'
  }

  const styles = {
    display: id ? 'block' : 'none'
  }
  return (
    <TypeStyled className='col-md-10'>
      <div style={styles}>
        <DivStyledText>Trang chủ - {data ? data.name : ""}</DivStyledText>
        <DivStyledTitle>{data ? data.name : ""}</DivStyledTitle>
        <DivStyledText className='mt-3 mb-5'>Tuyển chọn Phim hay nhất chất lượng cao, Phim Chiếu Rạp 2022 chọn lọc có thuyết minh và việt sub.</DivStyledText>
      </div>

      {data ? <DivStyled>
        {data.products && data.products.length ? data.products.map((item, index) => (
          <DivStyledContent key={index}>
            <DivStyledItem>
              <Link to={'/d/' + item._id + `?c=${item.typeId}` + "?n=" + `${item.name + " " + item.seri} `}>
                <Div>
                  <DivStyledImage src={item.image}></DivStyledImage>
                </Div>
              </Link>
              <DivStyledTitleItem>{item.name}</DivStyledTitleItem>
              <DivStyledText>{data.name}</DivStyledText>
            </DivStyledItem>
          </DivStyledContent>
        )) : 'Chưa cập nhật!'}
      </DivStyled> : ""}
    </TypeStyled>
  )
}

export default SidebarApi
