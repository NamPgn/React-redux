import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCateProduct } from '../main';
import { NavLink } from 'react-router-dom';
import { filterCate, Cate } from '../main';
const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const [state, setState] = useState([]);
  useEffect(() => {
    const getDataAll = async () => {
      const data = await getCateProduct();
      setState(data);
    }
    getDataAll();
    const getDta = async () => setCategory(await Cate());
    getDta();
  }, []);
  return (
    <>
      {state.filter(({ category: { _id } }) => {
        return _id == id;
      }).map((item, index) => {
        return <div className="col mb-5 col-md-3" style={{ height: "100%" }} key={index}>
          <div className="card rounded bg-white " style={{ boxShadow: "0 0 13px #555" }}>
            <img className="card-img-top" src={item.image} style={{ width: "100%" }} alt="..." />
            <div className="card-body p-4">
              <div className="text-center">
                <h5 className="fw-bolder">{item.name}</h5>
                Price : ${item.price}
                <p>Categoty : {`[ ${filterCate(category, item.category._id)} ]`}</p>
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

      })}
    </>
  )
}

export default CategoryProduct
