import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCateProduct } from '../main';
import { NavLink } from 'react-router-dom';
import { Cate } from '../main';
import CategoryProductDm from '../components/CategoryProduct';
import { category$ } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate } from '../redux/slice/categorySlice';
import GetAllCategoryNotRequest from '../components/GetAllCategoryNotRequest';
const CategoryProduct = () => {
  const { id } = useParams();
  const [state, setState] = useState([]);
  const category = useSelector(category$);
  const dispath = useDispatch();
  useEffect(() => {
    const getDataAll = async () => {
      const data = await getCateProduct();
      setState(data);
    }
    getDataAll();
    dispath(getAllcate());
  }, []);
  return (
    <div>
      <div className='d-flex'>
        <div className="col-md-9">
          {category.map((item) => {
            if (item._id == id) {
              return <div style={{ margin: "20px" }} key={item._id}>
                <div style={{ color: "#fff" }}>
                  <div className='d-flex detail_video'>
                    <div style={{ maxWidth: "200px" }} className="data_img">
                      <img src={item.linkImg} style={{ width: "100%", borderRadius: "3px" }} alt="" />
                    </div>
                    <div>
                      <div className="category">
                        <p>{item.name}</p>
                      </div>
                      <div className="loai">
                        <p>Thể loại : Kiếm hiệp, truyện</p>
                      </div>
                      <div>Số tập :</div>
                      <br />
                      <div className='d-flex' style={{ gap: "0 10px" }}>
                        {state.filter(({ category: { _id } }) => {
                          return _id == id;
                        }).map((item, index) => {
                          return <div style={{ border: "1px solid #fff", width: "50px", textAlign: "center", }} key={item._id}>
                            <NavLink to={'/detail/' + item._id}>
                              <button type="button" className="btn btn-dark">{item.seri}</button>
                            </NavLink>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className='des'>
                    <h5>Nội dung Phim: </h5>
                    <p>{item.des}</p>
                  </div>
                </div>
              </div>
            }
          })}
        </div>
        <CategoryProductDm />
      </div>
      <GetAllCategoryNotRequest id={id} />
    </div>
  )
}

export default CategoryProduct
