import styled from 'styled-components';
export const Divstyled = styled.div``;
export const BtnStyled = styled.button`
  background-color: rgb(0 0 0 / 24%);
  border-radius: .2rem;
  text-align: -webkit-center;
  text-align: center;
  color: #111827;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 600;
  padding: 0.5rem 0.5rem;
  text-align: center;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  @media (min-width: 768px){
    padding: .6rem .6rem;
    font-size: .675rem;
  }
  @media (min-width: 1024px){
    padding: .6rem .6rem;
    font-size: .785rem;
  }
`;

export const BtnStyledNumber = styled.button`
width: 100%;
padding: 6px 16px;
background: rgba(122, 122, 122, 0.32);
font-size: 12px;
border-radius: 3px;
  @media (min-width: 768px){
    font-size: 14px;
    padding: 8px 18px;
  }
  @media (min-width: 1024px){
    font-size: 15px;
    padding: 9px 20px;
  }
`;

export const DivstyledItem = styled.div < { $lengthData?: any } > `

display: ${props => props.data ? 'grid' : 'block'};
grid-template-columns: repeat(5, 1fr);
gap: 10px;
@media(min-width:768px){
  display: ${props => props.data ? 'grid' : 'block'};
  grid-template-columns: repeat(8, 1fr);
}
@media (min-width: 1024px){
  display: ${props => props.data ? 'grid' : 'block'};
  grid-template-columns: repeat(11, 1fr);
}
@media (min-width: 1440px){
  display: ${props => props.data ? 'grid' : 'block'};
  grid-template-columns: repeat(14, 1fr);
}
`

