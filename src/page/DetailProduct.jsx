import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import CategoryProductDm from '../components/CategoryProduct';
import { getProduct, getProducts } from '../redux/slice/productSlice';

import ContactAdmin from '../components/ContactAdmin';
import { decodeUser } from '../auth/getToken';
import { getOneProduct$, product$ } from '../redux/selectors';
const DetailProduct = () => {
  const product = useSelector(product$);
  const getOneProductDetail = useSelector(getOneProduct$)
  const dispath = useDispatch();
  const { id } = useParams();
  useEffect(() => {

    dispath(getProduct(id));

    dispath(getProducts());
  }, [id])
  return (
    <>
      <React.Fragment>
        <ContactAdmin />
        <div className='d-flex'>
          <div className={'col-sm-9'}>
            <div style={{ margin: "12px 5px" }} >
              {getOneProductDetail ? <div>
                <video width="100%" src={getOneProductDetail.linkVideo} controls muted autoPlay={true} style={{ borderRadius: "10px" }}>
                </video>
                <div style={{color:"#fff",margin:"10px 10px",textAlign:"end"}}>
                <i className="fa-solid fa-eye"></i> 
                  {getOneProductDetail.price} View</div>
                <h4 className='mt-4 mb-4'>{getOneProductDetail.name + " " + getOneProductDetail.seri}</h4>
                <h5>Tập số {getOneProductDetail.seri + " / " + "40"} </h5>
                <div className='d-flex'>
                  {
                    product.map(item => {
                      if (item.category == getOneProductDetail.category) {
                        return <div key={item._id}>
                          <Link to={'/detail/' + item._id}>
                            {
                              item._id == id ? <button className='btnMovieSeri'>Tập {item.seri}</button> : <button className='btnMovieSeri'>Tập {item.seri}</button>
                            }
                          </Link>
                        </div>
                      }
                    })
                  }
                </div>
                <div className='p-3 mt-3 mb-3 text-white rounded' style={{ background: "rgb(0 0 0 / 47%)" }}>
                  Bản quyền video thuộc : <a href={getOneProductDetail.LinkCopyright}>  {getOneProductDetail.copyright} </a>
                </div>
                <div className='des mt-5 mb-5'>
                  <h5>Nội dung Phim: </h5>
                  <p>{getOneProductDetail.descriptions}</p>
                  <h4 className='mt-5'>Bình luận</h4>
                  <section >
                    <div className="container py-5">
                      <div className="row">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                          <div className="card " style={{ background: "#fff", textAlign: "start" }}>
                            <div className="card-body">
                              <div className="d-flex flex-start align-items-center">
                                <img className="rounded-circle shadow-1-strong me-3 " style={{ objectFit: "cover" }}
                                  src={decodeUser.image} alt="avatar" width="60"
                                  height="60" />
                                <div>
                                  <h6 className="fw-bold text-dark mb-1">Lily Coleman</h6>
                                  <p className="  text-dark small mb-0">
                                    Shared publicly - Jan 2020
                                  </p>
                                </div>
                              </div>
                              <p className="mt-3 mb-4 pb-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                              </p>

                              <div className="small d-flex justify-content-start">
                                <a href="#!" className="d-flex align-items-center me-3">
                                  <i className="far fa-thumbs-up me-2 text-dark"></i>
                                  <p className="mb-0">Like</p>
                                </a>
                                <a href="#!" className="d-flex align-items-center me-3">
                                  <i className="far fa-comment-dots me-2 text-dark"></i>
                                  <p className="mb-0">Comment</p>
                                </a>
                                <a href="#!" className="d-flex align-items-center me-3">
                                  <i className="fas fa-share me-2 text-dark"></i>
                                  <p className="mb-0">Share</p>
                                </a>
                              </div>
                            </div>
                            <div className="card-footer py-3 border-0" style={{ background: "#f8f9fa" }}>
                              <div className="d-flex flex-start w-100">
                                <img className="rounded-circle shadow-1-strong me-3"
                                  src={decodeUser.image} style={{ objectFit: "cover" }} alt="avatar" width="40"
                                  height="40" />
                                <div className="form-outline w-100">
                                  <textarea className="form-control" id="textAreaExample" rows="4"
                                    style={{ background: "background: #fff" }}></textarea>
                                  <label className="form-label" htmlFor="textAreaExample">Message</label>
                                </div>
                              </div>
                              <div className="float-end mt-2 pt-1">
                                <button type="button" className="btn btn-primary btn-sm">Post comment</button>
                                <button type="button" className="btn btn-outline-primary btn-sm">Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div> : ""}
            </div>
          </div>
          <CategoryProductDm />
        </div>
      </React.Fragment>
    </>
  )
}

export default DetailProduct