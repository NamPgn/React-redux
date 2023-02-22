import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryProductDm from '../components/CategoryProduct';
import { category$ } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate } from '../redux/slice/categorySlice';
import GetAllCategoryNotRequest from '../components/GetAllCategoryNotRequest';
const SeriNumberMovie = React.lazy(() => import('../components/SeriNumberMovie.jsx'))
import { Loading } from '../components/Loading';
const CategoryProduct = () => {
  const { id } = useParams();
  const category = useSelector(category$);
  const dispath = useDispatch();
  useEffect(() => {
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
                    <div className="data_img">
                      <img src={item.linkImg} style={{ width: "100%", height: "100%", borderRadius: "3px" }} alt="" />
                    </div>
                    <div>
                      <div className="category">
                        <h5>{item.name}</h5>
                      </div>
                      <div className="loai des">
                        <p>Thể loại : Kiếm hiệp, truyện</p>
                      </div>
                      <div>Số tập :</div>
                      <br />
                      <Suspense fallback={<Loading />}>
                        <SeriNumberMovie />
                      </Suspense>
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
