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
      <div className="col-md-9">
        {category.map((item, index) => {
          if (item._id == id) {
            return <div style={{ margin: "20px" }} >
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
                        return <div style={{ border: "1px solid #fff", width: "50px", textAlign: "center", }}>
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
                  <p>{item.descriptions}</p>
                </div>
              </div>
            </div>
          }
        })}

      </div>
    </>
  )
}

export default CategoryProduct
