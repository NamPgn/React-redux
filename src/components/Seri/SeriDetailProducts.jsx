import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SeriDetailProducts = ({seriProduct}) => {
  const { id } = useParams();
  return (
    <div className='product_seri_item_deltail justify-items-center '>
      {
        seriProduct.map((item) => {
          return <div key={item._id} className='mt-2'>
            <Link to={'/detail/' + item._id + `?category=${item.category}` + `?name=${item.name}/tập/${item.seri}`} >
              {
                item._id == id ? <button className='btnMovieSeri d-flex text-dark bg-light' >
                  <span>Tập {item.seri}</span>
                </button> : <button className='btnMovieSeri'>Tập {item.seri}</button>
              }
            </Link>
          </div>
        })
      }
    </div>
  )
}

export default SeriDetailProducts
