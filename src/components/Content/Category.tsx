import React from 'react'
import { Link } from 'react-router-dom'

interface CategoryContent {
  text?: string,
  title: string,
  link: any,
  image: string,
  sumSeri?: any,
  time: string,
  typecm?: string
}
const CategoryContents = ({ text, title, link, image, sumSeri, time, typecm }: CategoryContent) => {
  return (
    <div className="cateConten cateItem w-full">
      <Link to={link}>
        <img src={image} alt="" />
      </Link>
      <div className="cateTitle text-white mt-1" >
        <Link to={link} >
          <p>{title}</p>
        </Link>
      </div>
      <div className='release_date mt-2 mb-2'>
        <div style={{ fontWeight: "500" }}>{sumSeri ? sumSeri + ' Tập' : ''} </div>
      </div>
      <div className='des'>
        <p className='h6'>Full hđ/Vietsub</p>
        <p>{typecm}</p>
      </div>
      <div className='release_date'>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default CategoryContents