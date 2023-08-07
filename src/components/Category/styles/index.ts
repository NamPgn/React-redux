import styled from 'styled-components';
export const Div = styled.div`
color: rgb(153, 153, 153);
padding: 118px 0;
text-align: center;
border-radius: 5px;
border: 2px solid;
`

export const DivstyledAllTitle = styled.div`
  margin: 40px 0px;
`

export const CategoryHomepage = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap:0 10px;
@media(min-width: 768px){
    grid-template-columns: repeat(3, 1fr);
  }
}
@media(min-width: 1024px){
  grid-template-columns: repeat(5, 1fr);
}
`