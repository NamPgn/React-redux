import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CategoryProductDm from '../components/CategoryProduct';
import ContactAdmin from '../components/ContactAdmin';
import { category$ } from '../redux/selectors';
import { getAllcate } from '../redux/slice/categorySlice';
import { getProducts } from '../redux/slice/productSlice';
const HomePage = () => {
  const dispath = useDispatch();
  const cate = useSelector(category$);
  useEffect(() => {
    dispath(getProducts());
    dispath(getAllcate());
  }, [])
  return (
    <div >
      <div className=' d-flex'>
        <div className='col-md-9 ' >
          <div className="h-full" >
            <Iframe src='https://www.youtube.com/embed/DHhuZI_U31U?mute=1&autoplay=1'
              width='100%'
              height='300px'
              allowFullScreen='true'
              allow='autoplay'

            />
            <ContactAdmin />
          </div>
        </div>
        <CategoryProductDm />
      </div>
      <div className='text-light'>All Movie</div>
      <div className="categoryMovie">
        {cate.map((item, index) => {
          return <div className='movie_css' key={index}>
            <div >
              <div className="cateConten cateItem" style={{ width: "100%", }} >
                <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                  <img style={{ width: "100%" }} src={item.linkImg} alt="" />
                </Link>
                <div className="cateTitle text-light mt-1">
                  <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                    <p>{item.name}</p>
                  </Link>
                </div>
                <div className='release_date'>
                  <p>Thời gian 20/12 phút</p>
                </div>
                {/* {product.map((item) => {
                  if (item.category == cate._id) {
                    return <div className='mt-3' key={item._id}>
                      <div className="cateItem">
                        <Link to={'/detail/' + item._id}>
                          <img style={{ width: "100%" }} src={item.image} alt="" />
                        </Link>
                      </div>
                      <div className="cateTitle text-light mt-1">
                        <p>{item.name + " " + item.seri}</p>
                      </div>
                      <div className='release_date'>
                        <p>2021</p>
                      </div>
                    </div>
                  }
                  if (item.length >= 6) {
                    return <>
                      <div className="left text-light position-absolute">
                        <i className="fa-solid fa-angle-left __"></i>
                      </div>
                      <div className="right text-light position-absolute">
                        <i className="fa-solid fa-angle-right __"></i>
                      </div>
                    </>
                  }
                })} */}
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default HomePage