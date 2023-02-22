import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getCateProduct } from '../main';

const SeriNumberMovie = () => {
  const [state, setState] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getDataAll = async () => {
      const data = await getCateProduct();
      setState(data);
    }
    getDataAll();
  }, [])
  return (
    <div>
      {
        state ? <div className='product_seri_item'>
          {
            state.filter(({ category: { _id } }) => {
              return _id == id;
            }).sort((a, b) => Number(a.seri) < Number(b.seri) ? 1 : -1).map((item, index) => {
              return <div style={{ border: "1px solid #fff", textAlign: "center", }} key={item._id}>
                <Link to={'/detail/' + item._id + "?name=" + `${item.name + " " + item.seri} `}>
                  {item ? <button type="button" className="btn btn-dark" style={{ padding: "6px 20px" }}>{item.seri}</button> : ""}
                </Link>
              </div>
            })
          }
        </div> : "Loading..."
      }
    </div>
  )
}

export default SeriNumberMovie
