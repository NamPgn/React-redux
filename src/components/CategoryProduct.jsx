import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Cate } from '../main';
const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getDta = async () => {
      setCategory(await Cate());
    }
    getDta();
  }, []);
  return (
    <nav className="nav navCate col-sm-3" style={{height:"100%"}}>
      <div style={{color:"#fff"}}>Seri</div>
      {category.map((item, index) => {
        return <div className='d-flex categoryContent col-md-12' key={index}>
          <div style={{ maxWidth: "50px" }} className='col-md-2'>
            <img style={{ width: "100%", objectFit: "cover", height:'100%' ,borderRadius:"8px", boxShadow:"0 0 3px #fff"}} src={item.linkImg} alt="" />
          </div>
          <div className='col-md-10'>
            <Link className={"p-2"} key={index}
              style={{ textDecoration: "none", color: "#fff", }} to={'/product/category/' + item._id + `?category=${item.name}`}>{item.name}
            </Link>
          </div>
        </div>
      })}
    </nav>
  )
}

export default CategoryProduct