import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { isAuthentication } from '../auth/getToken';
import CategoryProduct from '../components/CategoryProduct';
import { getProduct } from '../slice/productSlice';
import jwtDecode from 'jwt-decode';
import ContactAdmin from '../components/ContactAdmin';
const DetailProduct = () => {
  const dispath = useDispatch();
  const [state, setProduct] = useState();
  const { id } = useParams();
  useEffect(() => {
    const detail = async () => {
      const data = await dispath(getProduct(id));
      setProduct(data.payload);
    };
    detail();
  }, [])
  const { data: { token } } = isAuthentication();
  const decodeUser = jwtDecode(token);
  return (
    <>
      <React.Fragment>
        <ContactAdmin />
        <div className='d-flex'>
          <div className={'col-sm-9'}>
            <div style={{ margin: "12px 5px" }} >
              {state ? <div>
                {state.linkVideo ? <video width="100%" controls autoPlay={true} muted style={{ borderRadius: "10px" }}>
                  <source src={state.linkVideo}  />
                </video> : " Will be updated soon... "}
                <h4 className='mt-4 mb-4'>{state.name + " " + state.seri}</h4>
                <div className='p-3 mt-3 mb-3 text-white rounded' style={{ background: "rgb(0 0 0 / 47%)" }}>
                  Bản quyền video thuộc : <a href={state.LinkCopyright}>  {state.copyright} </a>
                </div>
                <div className='des mt-5 mb-5'>
                  <h5>Nội dung Phim: </h5>
                  <p>{state.descriptions}</p>
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
          <CategoryProduct />
        </div>
      </React.Fragment>
    </>
  )
}

export default DetailProduct