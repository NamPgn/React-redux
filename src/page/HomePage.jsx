import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllcategory } from '../api/categoty';
import CategoryProduct from '../components/CategoryProduct';
import ContactAdmin from '../components/ContactAdmin';
import { getProducts } from '../slice/productSlice';
const HomePage = () => {
  const [category, setCategory] = useState([]);
  const product = useSelector(state => state.product.value);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getProducts());

    const category = async () => {
      const { data } = await getAllcategory();
      setCategory(data);
    }
    category();
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
        <CategoryProduct />
      </div>
      <div className="categoryMovie">
        {category.map((cate, index) => {
          return <div className='movie_css' key={index}>
            <h5 className='text-light text_product'>{index + 1 + ". " + " " + cate.name}</h5>
            <div style={{ position: "relative" }}>
              <div className="cateConten d-flex" style={{ width: "100%",  }} >
                {product.map((item) => {
                  
                  if (item.category == cate._id) {
                    return <div className='mt-3' >
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
                })}
              </div>

            </div>
          </div>
        })}
      </div>

    </div>
  )
}

export default HomePage