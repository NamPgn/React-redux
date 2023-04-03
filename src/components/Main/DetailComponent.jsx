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
const DetailComponent = () => {
  const productByCategory = useSelector(getAllProductsByCategory$);
  const getOneProductDetail = useSelector(getOneProduct$);
  const [commentAdded, setCommentAdded] = useState(false); // tạo state
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = isAuthentication();
  const { category } = queryString.parse(window.location.href.split('?')[1]);//lấy data url
  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getProducts());
    dispatch(getAllProductDataByCategorySlice(category));
  }, [id, category, commentAdded]); //nếu mà 2 thằng này có thay đổi thì rereder
  const seriProduct = [...productByCategory].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1); //sắp xếp
  return (
    <div>
      <div className='d-flex justify-content-center' style={{ gap: "10px", background: '#00000037' }}>
        <div style={{ margin: "12px 5px" }} className='detailProduct col-md-10'>
          {getOneProductDetail ? <div className=''>
            <div className='d-flex justify-content-center' >
              {getOneProductDetail.link ?
                <video title="vimeo-player" controls autoPlay muted src={getOneProductDetail.link} style={{ width: "100%", height: "100%" }} frameBorder="0" allowFullScreen />
                : <iframe src={getOneProductDetail.trailer}
                />
              }
            </div>
            <div className="linkServer mt-3">
            </div>
            <div>
              <br />
            </div>
            <div className='des'>
              <p>Ngày đăng: {moment(getOneProductDetail.uploadDate).format('LTS DD-MM-YYYY')}</p>
            </div>
            <div style={{ color: "#fff", margin: "10px 0" }} className='des'>
              <p><i className="fa-solid fa-eye"></i>
                {getOneProductDetail.price} Lượt xem</p>
            </div>
            <CartAddContent item={getOneProductDetail} id={id} categoryId={category} />
            <h5>{getOneProductDetail.trailer ? 'Trailer ' + getOneProductDetail.seri : 'Tập ' + getOneProductDetail.seri} </h5>
            <SeriDetailProducts seriProduct={seriProduct} />



            {/* comment */}
            <div className='p-3 mt-3 mb-3 text-white rounded' style={{ background: "rgb(0 0 0 / 47%)" }}>
              Copyright video : <a href={getOneProductDetail.LinkCopyright} className='text-primary'>  {getOneProductDetail.copyright} </a>
            </div>



            <div className='des mt-5 mb-2'>
              <h5>Mô tả: </h5>
              <p>{getOneProductDetail.descriptions}</p>
              <h4 className=''>Bình luận</h4>


              <CommentProductsIndex getOne={getOneProductDetail} />
              <ComentProductsLayout setCommentAdded={setCommentAdded} />
            </div>
          </div> : ""}
        </div>
      </div>
    </div>
  )
}

export default DetailComponent
