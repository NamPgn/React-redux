import React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { getCategory } from '../../api/category';
import { category$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate } from '../../redux/slice/category/ThunkCategory/category';
import { useParams } from 'react-router-dom'
import { Loading } from '../Loading';
const SeriNumberMovie = React.lazy(() => import('../seri/SeriNumberMovie.jsx'))
const CategoryProductComponent = () => {
  const { id } = useParams();
  const category = useSelector(category$); //getAllcategory
  const dispath = useDispatch();
  const [state, setSate] = useState([]); //getone category
  useEffect(() => {
    dispath(getAllcate());
    const getOne = async () => {
      const { data } = await getCategory(id);
      setSate(data);
    }
    getOne();
  }, [id]);
  return (
    <div className="">
      {category.map((item) => {
        if (item._id == id) {
          return <div style={{ margin: "20px" }} key={item._id}>
            <div style={{ color: "#fff" }}>
              <div className='d-flex detail_video'>
                <div className="data_img mb-5">
                  <img src={item.linkImg} style={{ width: "100%", height: "100%", borderRadius: "3px" }} alt="" />
                </div>
                <div>
                  <div className="category">
                    <h5>{item.name}</h5>
                  </div>
                  <div className="loai des">
                    <p>Thể loại : Kiếm hiệp, truyện</p>
                    <p>Tổng Số tập: {state.sumSeri}</p>
                    <p>Thời gian: 15-20 phút </p>
                    <p>Năm phát hành : 2023</p>
                    <p></p>
                  </div>
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
  )
}

export default CategoryProductComponent
