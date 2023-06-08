import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loader, MessageErr } from '../Message/Loading';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const PStyled = styled.p``;
const SearchResults = ({ data: { doc, isError, isLoading } }:any) => {
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <MessageErr />
  }
  return (
    <Divstyled style={{ height: '100%' }}>
      <Divstyled className='container'>
        {doc ? doc.map((item: any, index: any) => (
          <Divstyled style={{ padding: "20px 0" }} key={index}>
            <Divstyled className='searhValue' key={index}>
              <Link to={'/q/' + item._id + `?n=${item.name}`}>
                <Divstyled className='searchValueImg'><img src={item.linkImg} style={{ borderRadius: "5px" }} alt="" /></Divstyled>
              </Link>
              <Link to={'/q/' + item._id + `?n=${item.name}`}>
                <Divstyled className='des'>{item.name}
                  <PStyled>
                    {item.updatedAt}
                  </PStyled>
                  <PStyled>
                    {item.sumSeri}
                  </PStyled>
                </Divstyled>
              </Link>
            </Divstyled>
          </Divstyled>
        )) : <Divstyled style={{ color: "#fff", textAlign: "center",height:'100vh' }}>Not Found</Divstyled>
        }
      </Divstyled>
    </Divstyled>
  )
}

export default SearchResults
