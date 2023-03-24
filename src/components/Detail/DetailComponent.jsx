import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllProductDataByCategorySlice, getProduct, getProducts } from '../../redux/slice/product/ThunkProduct/product';
import { getAllProductsByCategory$, getOneProduct$ } from '../../redux/selectors';
import { isAuthentication } from '../../auth/getToken';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import moment from 'moment';
import CommentProductsIndex from '../CommentProducts/CommentProductsIndex';
import ComentProductsLayout from '../CommentProducts/ComentProductsLayout';
import SeriDetailProducts from '../Seri/SeriDetailProducts';
const DetailComponent = () => {
  const productByCategory = useSelector(getAllProductsByCategory$);
  const getOneProductDetail = useSelector(getOneProduct$);
  const [commentAdded, setCommentAdded] = useState(false); // tạo state
  const dispath = useDispatch();
  const { id } = useParams();
  const data = isAuthentication();
  const { category } = queryString.parse(window.location.href.split('?')[1]);//lấy data url
  useEffect(() => {
    dispath(getProduct(id));
    dispath(getProducts());
    dispath(getAllProductDataByCategorySlice(category));
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
              {/* <ul className="flex flex-col sm:flex-row justify-content-center">
                <li className="inline-flex items-center gap-x-2.5 py-2 px-3 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                  #Link1
                </li>
                <li className="inline-flex items-center gap-x-2.5 py-2 px-3 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                  #Link2
                </li>
                <li className="inline-flex items-center gap-x-2.5 py-2 px-3 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg sm:-ml-px sm:mt-0 sm:first:rounded-tr-none sm:first:rounded-bl-lg sm:last:rounded-bl-none sm:last:rounded-tr-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                  </svg>
                  #Link3
                </li>
              </ul> */}
              
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
            <h4 className='mt-4 mb-4'>{getOneProductDetail.name + " " + getOneProductDetail.seri}</h4>
            <h5>{getOneProductDetail.trailer ? 'Trailer ' + getOneProductDetail.seri : 'Tập ' + getOneProductDetail.seri} </h5>
            <SeriDetailProducts seriProduct={seriProduct} />
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
