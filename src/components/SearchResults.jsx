import React from 'react'
import { Link } from 'react-router-dom'
const SearchResults = ({ data }) => {

  return (
    <div >
      <div className='container'>
        {data ? data.map((item, index) => (
          <div style={{ padding: "20px 0" }} key={index}>
            <div className='searhValue' key={index}>
              <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                <div className='searchValueImg'><img src={item.linkImg} style={{ borderRadius: "5px" }} alt="" /></div>
              </Link>
              <Link to={'/product/category/' + item._id + `?category=${item.name}`}>
                <div className='des'>{item.name}
                  <p>
                    {item.updatedAt}
                  </p>
                  <p>
                    {item.sumSeri}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )) : <div style={{ color: "#fff", textAlign: "center" }}>Not Found</div>
        }
      </div>
    </div>
  )
}

export default SearchResults
