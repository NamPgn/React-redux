import React from 'react'
import { Link } from 'react-router-dom';
import { Loader } from '../../Message/Loading';
import stylded from 'styled-components';

const Container = stylded.div`
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius:10px;
}
::-webkit-scrollbar {
  width: 2px;
}
`

const CategorySideBarStyles = stylded.div`
gap: 0px 18px;
padding: 10px;
background: rgb(28, 28, 30);
border-radius: 10px;
margin: 5px 0px;
`
const CategoryProductSidebar = ({ category, isLoading }) => {
  const catedata = category ? category.slice(0, 9) : '';
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="nav navCate col-sm-3 des w-3/12 relative overflow-hidden lg:block md:hidden hidden" >
      <div className='p-2 text-white text-sm'>See more</div>
      <Container className='absolute h-full w-full px-2 overflow-scroll'>
        {
          catedata && (
            catedata.map((item: any, index: any) => <CategorySideBarStyles className='d-flex col-md-12  my-2' key={index}>
              <div style={{ maxWidth: "50px", height: "55px" }} className='w-3/12'>
                <Link
                  key={index}
                  to={'/q/' + item._id}>
                  <img
                    style={{ width: "100%", objectFit: "cover", height: '100%', borderRadius: "8px", boxShadow: "0 0 3px #000" }}
                    src={item.linkImg} alt=""
                  />
                </Link>
              </div>
              <div className='w-9/12'>
                <Link key={index}
                  style={{ textDecoration: "none", color: "#999", fontSize: "13px" }} to={'/q/' + item._id}>{item.name}
                </Link>
                <div className='text-[12px] text-[#999] mt-2'>
                  {item.sumSeri + ' Tập'}
                </div>
              </div>
            </CategorySideBarStyles>
            )
          )
        }
      </Container>
    </div>
  )
}

export default CategoryProductSidebar