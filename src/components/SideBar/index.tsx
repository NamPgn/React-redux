import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { MyContext } from '../../context';
import parse from 'html-react-parser';
import { Loader } from '../Message/Loading';
const DivstySideBar = styled.div`
display: none;

@media(max-width:768px){
  width:20%;
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
padding:30px 20px 30px 20px;
position:fixed;
left: 0;
bottom: 0; 
top: 0;
background-color: rgba(0, 0, 0, 0.37);
bottom: 0;
z-index: 9;
  @media(max-width:768px){
    top:50%;
    transform: translateY(-50%);
    margin: 0 0 0 17px;
    
    border-radius:10px;
  }

`
const DivStyledTitle = styled.div`
width:50px;
display:flex;
gap:0 5px;


`;

const RouterLink = styled.div`
  
`

const DivStyledRouter = styled.div`
display:flex;
align-items: center;
padding: 10px 10px 15px 10px;
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

const LogoutStyled = styled.div`
margin-top:20px;
display:flex;
align-items: center;
gap:10px;
margin:10px;
font-size:14px;
@media(min-width:768px){
  display:none;
}

@media(min-width:1024px){
  display:flex ;
}
@media(max-width:768px){
  display:none;
}

&:hover {
  cursor:pointer;
  color:#999;
}
`

const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(MyContext);
  return (
    <DivstySideBar className='col-md-2'>
      <DivstyledContent className='col-md-2'>
        <DivStyledTitle>
          <Link to={'/'} style={{ display: 'contents' }}>
            <SibarImage src='/img/logo.png' />
          </Link>
          <SideBarText>
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
        </DivStyledTitle>
        <DivStyled>
          <DivStyledSearchBarStyle placeholder='Search...' />
          {loadingSeri == false ? <RouterLink>
            {seri ? seri.map((item: any, index: any) => (
              <NavLink
                to={item.path == '/' ? item.path : item.path + '/' + `${item._id}`}
                key={index}
              >
                <DivStyledRouter >
                  <RouterIcon>{parse(`${item.icon}`)}</RouterIcon>
                  <RouterText>{item.name}</RouterText>
                </DivStyledRouter>
              </NavLink>
            )) : ""}
          </RouterLink> : <Loader />}
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