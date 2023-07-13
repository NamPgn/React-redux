import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { DoubleLeftOutlined, DoubleRightOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { ChangeContext, MyContext } from '../../context';
import parse from 'html-react-parser';
import { Loader } from '../Message/Loading';
import { Skeleton } from 'antd';
const DivstySideBar = styled.div`
display: block;

@media(max-width:768px){
  background-color: none;
}
@media(min-width:1024px){
  color:#fff;
display:flex;
justify-content:center;
position: relative;
}
`;

const SibarImage = styled.img`
  object-fit:cover;
  @media(max-width: 768px){
    pading:5px;
  }
`;


const SideBarText = styled.div`


@media(max-width:768px){
  display:none;
}
`;

const DivStyled = styled.div`

`;

const DivStyledSearchBarStyle = styled.input`
margin:40px 0px 10px 0px;
padding:10px;
width:100%;
background-color:#1F1F22;
border-radius: 10px;
font-size:14px;
  @media(min-width:768px){
    display:none ;
  }

  @media(min-width:1024px){
    display:block ;
  }
  @media(max-width:768px){
    display:none ;
  }
`;

const Title = styled.div`
font-weight:500;
font-size:14px;
margin-bottom:5px;
`;

const Text = styled.div`
font-size:11px;
font-weight:400;
`;

const DivstyledContent = styled.div`
padding:20px;
position:fixed;
left: 0;
bottom: 0; 
top: 0;
background-color: rgba(0, 0, 0, 0.37);
bottom: 0;
z-index: 9;
`
const DivStyledTitle = styled.div`
width:50px;
display:flex;
gap:0 5px;
align-items: center;
`;

const RouterLink = styled.div`
  
`

const DivStyledRouter = styled.div`
display:flex;
align-items: center;
padding: 10px  15px ;
margin:10px 0;
justify-content: start;
gap:0 10px;

  &:hover {
    background-color:#1F1F22;
    border-radius:5px;
    cursor:pointer;
    color:#FFFFFF;
  }

  &>a:hover{
    color:#FFFFFF;
  }

  @media (max-width: 768px){
    justify-content: center;
  }
`

const RouterIcon = styled.div`
color: #D9D9D9;
`


const RouterText = styled.div`
font-size:13px;
margin-top:4px;

  @media(min-width:768px){
    display:none ;
  }

  @media(min-width:1024px){
    display:block ;
  }

  @media(max-width:768px){
    display:none;
  }
`
const Icon = styled.div`
display: block;
@media(max-width:768px){
  display: none;
}
`

// const LogoutStyled = styled.div`
// margin-top:20px;
// display:flex;
// align-items: center;
// gap:10px;
// margin:10px;
// font-size:14px;
// @media(min-width:768px){
//   display:none;
// }

// @media(min-width:1024px){
//   display:flex ;
// }
// @media(max-width:768px){
//   display:none;
// }

// &:hover {
//   cursor:pointer;
//   color:#999;
// }
// `

const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(MyContext);
  const { state, handleClick } = useContext(ChangeContext);
  if (loadingSeri) {
    return <Skeleton style={{ padding: "20px", width: '0' }}
      active
      loading
      title={{ width: 200 }}
      paragraph={{ rows: 6, width: [50, 60, 30, 20, 10, 70] }}
    />
  }

  return (
    <DivstySideBar className={state ? 'w-1/12' : 'w-2/12'} >
      <DivstyledContent className={state ? 'w-1/12' : 'w-2/12'} >
        <DivStyledTitle>
          <Link to={'/'} style={{ display: 'contents' }}>
            <SibarImage src='/img/zyro-image.png' />
          </Link>
          <SideBarText className={state ? 'hiddenn' : 'block'}>
            <Link to={'/'}>
              <Title>
                Hhtrungquoc.tv
              </Title>
            </Link>
            <Link to={'/'}>
              <Text>
                hhtq.netify.app
              </Text>
            </Link>
          </SideBarText>
          <Icon onClick={handleClick} style={{ cursor: "pointer" }}>
            {state ? <DoubleRightOutlined /> : <DoubleLeftOutlined className='ml-4' />}
          </Icon>
        </DivStyledTitle>
        <DivStyled>
          {state ? <SearchOutlined style={{
            textAlign: "center",
            padding: "10px 15px",
            margin: "25px 0 0 0"
          }} /> : <DivStyledSearchBarStyle placeholder='Search...' />}
          <RouterLink className='sideBarActive'>
            {seri ? seri.map((item: any, index: any) => (
              <NavLink
                style={
                  { width: state ? '70%' : 'auto' }
                }
                to={item.path == '/' ? item.path : item.path + '/' + `${item._id}`}
                key={index}
              >
                <DivStyledRouter >
                  <RouterIcon>{parse(`${item.icon}`)}</RouterIcon>
                  <RouterText className={state ? 'hiddenn' : 'block'}>{item.name}</RouterText>
                </DivStyledRouter>
              </NavLink>
            )) : ""}
          </RouterLink>
        </DivStyled>

        {/* <DivStyled>
          <LogoutStyled >
            <LogoutOutlined />
            Logout
          </LogoutStyled>
        </DivStyled> */}
      </DivstyledContent>
    </DivstySideBar >
  )
}

export default SideBar