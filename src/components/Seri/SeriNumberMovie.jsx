import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { urlSwr } from '../../main';
import { useSWRWithAxios } from '../../hook/Swr';
const SeriNumberMovie = () => {
  //còn đây là khi vào danh mục để list tâp phim
  const { id } = useParams();
  const { data, error, isLoading } = useSWRWithAxios(urlSwr + `/category/products/${id}`)
  const datas = [...data ? data : ""].sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1);

  return (
    <div>
      {
        datas.length > 0 ? <div className='product_seri_item'>
          {
            datas ? datas.map((item, index) => {
              return <div style={{ textAlign: "center", }} key={index}>
                <Link to={
                  '/detail/' + item._id + `?category=${item.category}` + "?name=" + `${item.name + " " + item.seri} `
                }>
                  {item.trailer ? <button type="button" className="btn d-flex  btn-dark " style={{ padding: "8px 9px", fontSize: "14px" }}>
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
            }) : " Not found! "
          }
        </div> : <div className='des'>
          <p style={{ padding: "5px", border: "1px solid #999" }}>Loading...</p>
        </div>
      }
    </div>
  )
}

export default SeriNumberMovie
