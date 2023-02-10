import React, { useEffect, useState } from 'react'
import { getProducts } from '../slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { filterCate, Cate } from '../main';
import CategoryProduct from '../components/CategoryProduct';
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
    <div className='container d-flex'>
      <div className='col-md-9'>
        <div className="input-group" style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
          <div className="form-outline">
            <input type="search" id="form1" className="form-control" placeholder='Search..' onChange={e => {
              setstate(e.target.value);
            }} />
          </div>
        </div>
        <div className="">
          {/* <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
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
          </div> */}
        </div>
      </div>
      <CategoryProduct/>
    </div>
  );
}

export default Product
