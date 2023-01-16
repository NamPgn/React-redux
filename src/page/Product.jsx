import React, { useEffect, useState } from 'react'
import { getProducts } from '../slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { filterCate, Cate } from '../main';
const Product = () => {
  const product = useSelector((state) => state.product.value);
  const dispath = useDispatch();
  const [category, setCategory] = useState([]);
  const [state, setstate] = useState("");
  useEffect(() => {
    dispath(getProducts());
    const getDta = async () => setCategory(await Cate());
    getDta();
  }, []);
  return (
    <>
      <div className="nav-scroller py-1 mb-2 mt-5 " >
      </div>
      <section className="py-5" id="features" style={{ color: "#fff" }}>
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0">A better way to start building.</h2></div>
            <div className="col-lg-8">
              <div className="row gx-5 row-cols-1 row-cols-md-2">
                <div className="col mb-5 h-100">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection"></i></div>
                  <h2 className="h5">Featured title</h2>
                  <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                </div>
                <div className="col mb-5 h-100">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building"></i></div>
                  <h2 className="h5">Featured title</h2>
                  <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                </div>
                <div className="col mb-5 mb-md-0 h-100">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                  <h2 className="h5">Featured title</h2>
                  <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                </div>
                <div className="col h-100">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2"></i></div>
                  <h2 className="h5">Featured title</h2>
                  <p className="mb-0">Paragraph of text beneath the heading to explain the heading. Here is just a bit more text.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <select className="selectpicker" style={{ display: "flex", justifyContent: "end", margin: "20px 20px" }} onChange={e => {
        SetSelect(e.target.value);
      }}>
        <option value={'all'}>All</option>
        <option value={'nam'}>Nam</option>
        <option value={'nu'}>Nữ</option>
      </select>

      <div className="input-group" style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" placeholder='Search..' onChange={e => {
            setstate(e.target.value);
          }} />
        </div>
        <button type="button" className="btn btn-primary" >
          Tìm kiếm
        </button>
      </div>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {
              product.filter((item) => {
                if (state == "") {
                  return item;
                } else if (item.name.toLowerCase().includes(state.toLowerCase())) {
                  return item;
                }
              }).map((item, index) => {
                return <div className="col mb-5 " style={{ height: "100%" }} key={index}>
                  <div className="card rounded bg-white" style={{ boxShadow: "0 0 13px #555" }}>
                    <img className="card-img-top" src={item.image} style={{ width: "100%" }} alt="..." />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{item.name}</h5>
                        Price : ${item.price}
                        <p>Categoty : {`[ ${filterCate(category, item.category) == undefined ? "Not Updated" : filterCate(category, item.category)} ]`}</p>
                        <p>Description : {item.descriptions}</p>
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <NavLink to={'/detail/' + item._id}>
                          <a className="btn btn-outline-dark mt-auto" >View Product</a>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Product
