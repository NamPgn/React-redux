import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllProductsByCategory$, } from '../../redux/selectors';
import { getAllProductDataByCategorySlice } from '../../redux/slice/product/ThunkProduct/product';
const SeriNumberMovie = () => {
  const { id } = useParams();
  const productByCategory = useSelector(getAllProductsByCategory$);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAllProductDataByCategorySlice(id));
  }, [id]);
  const data = [...productByCategory].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1);

  return (
    <div>
      {
        data.length > 0 ? <div className='product_seri_item'>
          {
            data.map((item, index) => {
              return <div style={{ textAlign: "center", }} key={index}>
                <Link to={'/detail/' + item._id + `?category=${item.category}` + "?name=" + `${item.name + " " + item.seri} `}>
                  {item.trailer ? <button type="button" className="btn  d-flex  btn-dark " style={{ padding: "8px 9px", fontSize: "14px" }}>
                    <span>
                      {item.seri}
                    </span>
                    <span >
                      Raw
                    </span>
                  </button>
                    : <button type="button" className="btn btn-dark" style={{ padding: "6px 20px", boxShadow: "0 0 2px #999" }}>{item.seri}</button>
                  }
                </Link>
              </div>
            })
          }
        </div> : <div className='des'>
          <p style={{ padding: "5px", border: "1px solid #999" }}>Will be updated soon!!!</p>
        </div>
      }
      {/* <DetailProduct sumSeri={state.sumSeri} /> */}
    </div>
  )
}

export default SeriNumberMovie
