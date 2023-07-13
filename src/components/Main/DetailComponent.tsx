import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProductDataByCategorySlice, getProduct, getProducts } from '../../redux/slice/product/ThunkProduct/product';
import { getAllProductsByCategory$, getOneProduct$ } from '../../redux/selectors';
import queryString from 'query-string';
import CommentProductsIndex from '../CommentProducts/CommentProductsIndex';
import ComentProductsLayout from '../CommentProducts/ComentProductsLayout';
import SeriDetailProducts from '../Seri/SeriDetailProducts';
import CartAddContent from '../Cart/CartAddContent';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import Content from './Content';
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
width:100%;
@media(max-width: 768px){
  display:none;
}
@media(min-width: 1024px){
  display:block;
}
`
const DivStyledContentText = styled.div`
font-size:13px;
@media(min-width: 1024px){
  font-size:15px;
}
`

const DivContainer = styled.div`
padding:5px;
@media(min-width: 1024px){
  padding: 15px;
}
`
const DivStyledDescription = styled.div`
display: none;
@media(min-width: 1024px){
  display:block;
}
`

const Movie = styled.div`
padding-bottom:62%;

@media(min-width: 768px){
  padding-bottom:52%;
}

@media(min-width: 1024px){
  padding-bottom:42%;
}


`

const DetailComponent = () => {
  const productByCategory = useAppSelector(getAllProductsByCategory$);
  const getOneProductDetail = useAppSelector(getOneProduct$);
  const [commentAdded, setCommentAdded] = useState(false); // tạo state
  const [link, setLink] = useState(getOneProductDetail.link);
  const { id } = useParams();
  const { c } = queryString.parse(window.location.href.split('?')[1]);//lấy data url
  const [activeLink, setActiveLink] = useState('link1');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getAllProductDataByCategorySlice(c));
    setLink(getOneProductDetail.link)
  }, [id, c, commentAdded, getOneProductDetail.link]); //nếu mà 2 thằng này có thay đổi thì rereder
  const seriProduct = [...productByCategory].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1); //sắp xếp
  return (
    <div>
      <div className='d-flex justify-content-center col-span-2 mt-4' style={{ gap: "10px", }}>
        <DivContainer className='detailProduct col-md-12'>
          {getOneProductDetail ? <div className=''>
            <Movie className='d-flex justify-content-center relative' >
              {getOneProductDetail.link ?
                <iframe title="vimeo-player" className='absolute' src={link} style={{ width: "100%", height: "100%" }} />
                : <iframe src={getOneProductDetail.trailer}
                />
              }
            </Movie>
            <div className='flex items-center justify-center'>
              <div className='text-white'>Chọn server:</div>
              <div className='md:text-sm lg:text-base text-sm flex items-center justify-center gap-4 px-4 py-3'>
                <div onClick={() => { setActiveLink('link1'); setLink(getOneProductDetail.link); }} className={` text-white rounded-lg cursor-pointer ${activeLink === 'link1' ? 'activeServer' : ''}`} aria-current="page">Link 1</div>

                <div onClick={() => { setActiveLink('server2'); setLink(getOneProductDetail.server2); }} aria-disabled={`${getOneProductDetail.server2 ? false : true}`} className={`${getOneProductDetail.server2 ? ' rounded-lg text-white cursor-pointer' : ''} ${activeLink === 'server2' ? 'activeServer' : ''}`}>Link 2</div>

                <div onClick={() => { setActiveLink('dailyMotion'); setLink(getOneProductDetail.dailyMotionServer); }} aria-disabled={`${getOneProductDetail.server2 ? false : true}`} className={`${getOneProductDetail.dailyMotionServer ? ' rounded-lg text-white cursor-pointer' : ''} ${activeLink === 'dailyMotion' ? 'activeServer' : ''}`}>Link 3</div>
              </div>
            </div>
            {/* chi tiết */}
            <DivStyledContent className='mt-2'>
              <DivStyledItem className='w-3/12'>
                {
                  getOneProductDetail.category ?
                    <DivStyledContentImage src={getOneProductDetail.category ? getOneProductDetail.category.linkImg : ""} /> :
                    <DivStyledContentImage src={getOneProductDetail.image ? getOneProductDetail.image : ""}
                    />
                }
              </DivStyledItem>
              <DivStyledContentText className='lg:w-9/12 md:w-full text-center lg:text-start'>
                {/* content */}
                <CartAddContent item={getOneProductDetail} id={id} categoryId={c} />
                <Content getOneProductDetail={getOneProductDetail} />

                {/* tập */}
                <SeriDetailProducts
                  seriProduct={seriProduct}
                />

                <DivStyledDescription className='des mt-2 mb-2'>
                  <h5>Mô tả: </h5>
                  <p>{getOneProductDetail.descriptions}</p>
                </DivStyledDescription>
              </DivStyledContentText>
            </DivStyledContent>

            {/* comment */}
            <div className='h6 text-white mt-4'>Bình luận</div>
            <CommentProductsIndex getOne={getOneProductDetail} />
            <ComentProductsLayout setCommentAdded={setCommentAdded} />
          </div> : ""}
        </DivContainer>
      </div>
    </div>
  )
}

export default DetailComponent
