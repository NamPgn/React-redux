import styled from 'styled-components';

export const DivstySideBar = styled.div`
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

export const SibarImage = styled.img`
  object-fit:cover;
  @media(max-width: 768px){
    pading:5px;
  }
`;


export const SideBarText = styled.div`
@media(max-width:768px){
  display:none;
}
`;

export const DivStyled = styled.div`

`;

export const DivStyledSearchBarStyle = styled.input`
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

export const Title = styled.div`
font-weight:500;
font-size:14px;
margin-bottom:5px;
`;

export const Text = styled.div`
font-size:11px;
font-weight:400;
`;

export const DivstyledContent = styled.div`
padding:7px;
position:fixed;
left: 0;
bottom: 0; 
top: 0;
background-color: rgba(0, 0, 0, 0.37);
bottom: 0;
z-index: 9;

  @media(min-width:768px){
    padding:15px;
  }
  @media(min-width:1024px){
    padding:20px;
  }
`
export const DivStyledTitle = styled.div`
width:50px;
display:flex;
gap:0 5px;
align-items: center;
justify-content: space-between;
`;

export const RouterLink = styled.div`
  
`
//props styled
export const DivStyledRouter = styled.div`
display:flex;
align-items: center;
padding: 10px  15px ;
margin:10px 0;
justify-content: ${props => props.state ? 'center' : 'start'};
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

export const RouterIcon = styled.div`
color: #D9D9D9;
font-size:11px;
  @media(min-width: 768px){
    font-size:13px;
  }
  @media(min-width: 1024px){
    font-size:14px;
  }
`


export const RouterText = styled.div`
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
export const Icon = styled.div`
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