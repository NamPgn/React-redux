import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllProductDataByCategorySlice, getProduct, getProducts } from '../../redux/slice/product/ThunkProduct/product';
import { getAllProductsByCategory$, getOneProduct$ } from '../../redux/selectors';
import { isAuthentication } from '../../auth/getToken';
import queryString from 'query-string';
import moment from 'moment';
import CommentProductsIndex from '../CommentProducts/CommentProductsIndex';
import ComentProductsLayout from '../CommentProducts/ComentProductsLayout';
import SeriDetailProducts from '../Seri/SeriDetailProducts';
import CartAddContent from '../Cart/CartAddContent';
import styled from 'styled-components';
import { useSWRWithAxios } from '../../hook/Swr';
import { urlSwr } from '../../function';

const Divstyled = styled.div``;
const Psyled = styled.p``;

const DivStyledContent = styled.div`
display:flex;
gap:0 10px;

@media(max-width:768px){
  display:block;
}
@media(min-width:1024px){
  display:flex;
}
`

const DivStyledItem = styled.div`
  width: 250px;
`

const DivStyledContentImage = styled.img`
border-radius:5px;
@media(max-width: 768px){
  display:none;
}
@media(min-width: 1024px){
  display:block;
}
`
const DivStyledContentText = styled.div``

const DetailComponent = () => {
  const productByCategory = useSelector(getAllProductsByCategory$);
  const getOneProductDetail = useSelector(getOneProduct$);
  const [commentAdded, setCommentAdded] = useState(false); // tạo state
  const dispatch = useDispatch();
  const { id } = useParams();
  const { c } = queryString.parse(window.location.href.split('?')[1]);//lấy data url
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProducts());
    dispatch(getAllProductDataByCategorySlice(c));
  }, [id, c, commentAdded]); //nếu mà 2 thằng này có thay đổi thì rereder
  const { data: typeSeri, isError } = useSWRWithAxios(urlSwr + `/type/${c}`);
  const { data: dataSeriCateMain, isError: err } = useSWRWithAxios(urlSwr + `/categorymain/${c}`);
  const seriProduct = [...productByCategory].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1); //sắp xếp
  
  return (
    <Divstyled>
      <Divstyled className='d-flex justify-content-center' style={{ gap: "10px", }}>
        <Divstyled style={{ margin: "12px 5px", padding: "0 35px" }} className='detailProduct col-md-12'>
          {getOneProductDetail ? <Divstyled className=''>
            <Divstyled className='d-flex justify-content-center' >
              {getOneProductDetail.link ?
                <video title="vimeo-player" controls muted src={getOneProductDetail.link} style={{ width: "100%", height: "100%" }} frameBorder="0" allowFullScreen />
                : <iframe src={getOneProductDetail.trailer}
                />
              }
            </Divstyled>
            <Divstyled className="linkServer mt-3">
            </Divstyled>
            <Divstyled>
              <br />
            </Divstyled>

            <Divstyled style={{ color: "#fff", margin: "10px 0 35px 0px" }}>Server khác: Đang cập nhật!...</Divstyled>

            {/* chi tiết */}
            <DivStyledContent>
              <DivStyledItem className='col-md-3'>
                {getOneProductDetail.category ? <DivStyledContentImage src={
                  getOneProductDetail.category ? getOneProductDetail.category.linkImg : ""
                } /> : <DivStyledContentImage src={
                  getOneProductDetail.image ? getOneProductDetail.image : ""
                } />}
              </DivStyledItem>
              <DivStyledContentText className='col-md-9'>
                <CartAddContent item={getOneProductDetail} id={id} categoryId={c} />
                <Divstyled style={{ color: "#fff", margin: "10px 0" }}>{getOneProductDetail.trailer ? 'Trailer ' + getOneProductDetail.seri : 'Tập ' + getOneProductDetail.seri} </Divstyled>
                <Divstyled className='des'>
                  <Psyled>Ngày đăng: {moment(getOneProductDetail.uploadDate).format('LTS DD-MM-YYYY')}</Psyled>
                </Divstyled>
                <Divstyled style={{ color: "#fff", margin: "10px 0" }} className='des'>
                  <Psyled>
                    <i className="fa-solid fa-eye mr-1"></i>
                    {getOneProductDetail.price} Lượt xem
                  </Psyled>
                </Divstyled>


                <SeriDetailProducts
                  seriProduct={seriProduct}
                  typeProduct={typeSeri ? typeSeri.products : ""}
                  cateMainProduct={dataSeriCateMain ? dataSeriCateMain.products : ""}
                />


                <Divstyled className='p-3 mt-3 mb-3 text-white rounded' style={{ background: "rgb(0 0 0 / 47%)" }}>
                  Copyright video : <a href={getOneProductDetail.LinkCopyright} className='text-primary'>  {getOneProductDetail.copyright} </a>
                </Divstyled>
                <Divstyled className='des mt-2 mb-2'>
                  <h5>Mô tả: </h5>
                  <Psyled>{getOneProductDetail.descriptions}</Psyled>
                </Divstyled>
              </DivStyledContentText>
            </DivStyledContent>

            {/* comment */}
            <Divstyled className='h6 text-light mt-4'>Bình luận</Divstyled>
            <CommentProductsIndex getOne={getOneProductDetail} />
            <ComentProductsLayout setCommentAdded={setCommentAdded} />
          </Divstyled> : ""}
        </Divstyled>
      </Divstyled>
    </Divstyled>
  )
}

export default DetailComponent
