import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProductDataByCategorySlice, getProduct } from '../../redux/slice/product/ThunkProduct/product';
import { getAllProductsByCategory$, getOneProduct$ } from '../../redux/selectors';
import queryString from 'query-string';
import CommentProductsIndex from '../Comment/CommentProductsIndex';
import ComentProductsLayout from '../Comment/ComentProductsLayout';
import SeriDetailProducts from '../Seri/SeriDetailProducts';
import CartAddContent from '../Cart/CartAddContent';
import { useAppDispatch, useAppSelector } from '../../hook';
import Content from './Content';
import { DivContainer, DivStyledContent, DivStyledContentImage, DivStyledContentText, DivStyledDescription, DivStyledItem, Movie, Server } from './styles';
import Dividers from '../Divider';
import { MyButton } from '../Button';

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
            <Server className=' mt-4 rounded'>
              <Dividers orientation={'center'} className='text-white md:text-sm lg:text-base text-sm underline'>Chọn server:</Dividers>
              <div className='md:text-sm lg:text-base text-sm flex items-center justify-center gap-4 px-4 py-3'>
                <MyButton onClick={() => { setActiveLink('link1'); setLink(getOneProductDetail.link); }}
                  className={` text-white cursor-pointer ${activeLink === 'link1' ? 'activeServer' : ''}`}
                  aria-current="page"
                >#FireBase</MyButton>

                <MyButton onClick={() => { setActiveLink('server2'); setLink(getOneProductDetail.server2); }}
                  disabled={getOneProductDetail.server2 ? false : true}
                  className={`${getOneProductDetail.server2 ? ' text-white cursor-pointer' : ''} ${activeLink === 'server2' ? 'activeServer' : ''}`}
                >#Drive</MyButton>

                <MyButton onClick={() => {
                  setActiveLink('dailyMotion');
                  setLink(getOneProductDetail.dailyMotionServer);
                }}
                  disabled={getOneProductDetail.server2 ? false : true}
                  className={`${getOneProductDetail.dailyMotionServer ? 'text-white cursor-pointer' : ''} ${activeLink === 'dailyMotion' ? 'activeServer' : ''}`}
                >#Daillymotion</MyButton>
              </div>
            </Server>
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
                  seriProduct={productByCategory}
                />

                <DivStyledDescription className='des mt-2 mb-2'>
                  <Dividers orientation="left">Mô tả: </Dividers>
                  <p>{getOneProductDetail.descriptions}</p>
                </DivStyledDescription>
              </DivStyledContentText>
            </DivStyledContent>

            {/* comment */}
            <Dividers orientation="left" className='h6 text-white mt-4 text:sm lg:text-lg md:text-md'>Bình luận:</Dividers>
            <CommentProductsIndex getOne={getOneProductDetail} />
            <ComentProductsLayout setCommentAdded={setCommentAdded} />
          </div> : ""}
        </DivContainer>
      </div>
    </div>
  )
}

export default DetailComponent
