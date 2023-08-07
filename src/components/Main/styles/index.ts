import styled from 'styled-components';


export const DivStyledContent = styled.div`
display:flex;
gap:0 10px;

@media(max-width:768px){
  display:block;
}
@media(min-width:1024px){
  display:flex;
}
`

export const DivStyledItem = styled.div`
`

export const DivStyledContentImage = styled.img`
border-radius:5px;
width:100%;
height:100%;
@media(max-width: 768px){
  display:none;
}
@media(min-width: 1024px){
  display:block;
}
`
export const DivStyledContentText = styled.div`
font-size:13px;
@media(min-width: 1024px){
  font-size:15px;
}
`

export const DivContainer = styled.div`
padding:5px;
@media(min-width: 1024px){
  padding: 15px;
}
`
export const DivStyledDescription = styled.div`
display: none;
@media(min-width: 1024px){
  display:block;
}
`

export const Movie = styled.div`
padding-bottom:62%;

@media(min-width: 768px){
  padding-bottom:52%;
}

@media(min-width: 1024px){
  padding-bottom:42%;
}
`

export const Server=styled.div`
 
`