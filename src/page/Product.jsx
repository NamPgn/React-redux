import React, { useEffect, useState } from 'react'
import { getProducts } from '../slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const Product = () => {
  const product = useSelector((state) => state.product.value);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getProducts())
  }, []);
  const [state, setstate] = useState("");
  const [filter, SetSelect] = useState("");
  console.log(filter);
  return (
    <>
      <select class="selectpicker" style={{ display: "flex", justifyContent: "end", margin: "20px 20px" }} onChange={e => {
        SetSelect(e.target.value);
      }}>
        <option value={'all'}>All</option>
        <option value={'nam'}>Nam</option>
        <option value={'nu'}>Nữ</option>
      </select>

      <div class="input-group" style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
        <div class="form-outline">
          <input type="search" id="form1" class="form-control" placeholder='Search..' onChange={e => {
            setstate(e.target.value);
          }} />
        </div>
        <button type="button" class="btn btn-primary" >
          Tìm kiếm
        </button>
      </div>
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {
              product.filter((item) => {
                if (state == "") {
                  return item;
                } else if (item.name.toLowerCase().includes(state.toLowerCase())) {
                  return item;
                }
                console.log(item.category)
                filter == "all" ? item : filter == 'nam' ? item.category == "nam" : filter == 'nu' ? item.category == 'nu' : item
              }).map((item, index) => (
                
                <div class="col mb-5" key={index}>
                  <div class="card ">
                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" style={{ width: "100%" }} alt="..." />
                    <div class="card-body p-4">
                      <div class="text-center">
                        <h5 class="fw-bolder">{item.name}</h5>
                        Price : ${item.price}
                        <p>Categoty : {`[ ${item.category} ]`}</p>
                        <p>Description : {item.descriptions}</p>
                      </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div class="text-center">
                        <NavLink to={'/detail/' + item._id}>
                          <a class="btn btn-outline-dark mt-auto" >View Product</a>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default Product
