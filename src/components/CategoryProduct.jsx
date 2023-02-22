import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Cate } from '../main';
const CategoryProductDm = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getDta = async () => {
      setCategory(await Cate());
    }
    getDta();
  }, []);
  const catedata = category.slice(0, 4);
  return (
    <nav className="nav navCate col-sm-3" style={{ height: "100%" }}>
      <div style={{ color: "#fff" }}>Xếp hạng</div>
      {catedata.map((item, index) => {
        return <div className='d-flex categoryContent col-md-12' key={index}>
          <div style={{ maxWidth: "50px", height: "55px" }} className='col-md-2'>
            <Link
              key={index}
              to={'/product/category/' + item._id + `?category=${item.name}`}>
              <img
                style={{ width: "100%", objectFit: "cover", height: '100%', borderRadius: "8px", boxShadow: "0 0 3px #fff" }}
                src={item.linkImg} alt=""
              />
            </Link>
          </div>
          <div className='col-md-10'>
            <Link key={index}
              style={{ textDecoration: "none", color: "#999", fontSize: "12px" }} to={'/product/category/' + item._id + `?category=${item.name}`}>{item.name}
            </Link>
          </div>
        </div>
      })}
    </nav>
  )
}

export default CategoryProductDm