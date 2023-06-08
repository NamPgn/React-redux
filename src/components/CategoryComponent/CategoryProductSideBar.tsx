import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loader } from '../Message/Loading';
const Divstyled = styled.div``;
const SpanStyled = styled.span``;
const Psyled = styled.p``;
const CategoryProductSidebar = ({ category, isLoading, isError }) => {
  const catedata = category ? category.slice(0, 4) : '';
  if (isLoading) {
    return <Loader />
  }
  return (
    <Divstyled className="nav navCate col-sm-3 des" >
      <Psyled style={{ color: "#fff" }}>See more</Psyled>
      {
        catedata ? catedata.map((item: any, index: any) => <Divstyled className='d-flex categoryContent col-md-12' key={index}>
          <Divstyled style={{ maxWidth: "50px", height: "55px" }} className='col-md-2'>
            <Link
              key={index}
              to={'/q/' + item._id + `?n=${item.name}`}>
              <img
                style={{ width: "100%", objectFit: "cover", height: '100%', borderRadius: "8px", boxShadow: "0 0 3px #000" }}
                src={item.linkImg} alt=""
              />
            </Link>
          </Divstyled>
          <Divstyled className='col-md-10'>
            <Link key={index}
              style={{ textDecoration: "none", color: "#999", fontSize: "11px" }} to={'/q/' + item._id + `?n=${item.name}`}>{item.name}
            </Link>
          </Divstyled>
        </Divstyled>
        ) : ""}
    </Divstyled>
  )
}

export default CategoryProductSidebar