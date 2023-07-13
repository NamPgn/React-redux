import React from 'react'
import { Link } from 'react-router-dom';
import { Loader, MessageErr } from '../Message/Loading';
const SearchResults = ({ data: { doc, isError, isLoading } }:any) => {
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }
  return (
    <div style={{ height: '100%' }}>
      <div className='container'>
        {doc ? doc.map((item: any, index: any) => (
          <div style={{ padding: "20px 0" }} key={index}>
            <div className='searhValue' key={index}>
              <Link to={'/q/' + item._id + `?n=${item.name}`}>
                <div className='searchValueImg'><img src={item.linkImg} style={{ borderRadius: "5px" }} alt="" /></div>
              </Link>
              <Link to={'/q/' + item._id + `?n=${item.name}`}>
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
        )) : <div style={{ color: "#fff", textAlign: "center",height:'100vh' }}>Not Found</div>
        }
      </div>
    </div>
  )
}

export default SearchResults
