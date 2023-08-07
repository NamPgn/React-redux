import styled from 'styled-components'
export const BtnStyled = styled.button`
  border-radius: .25rem;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 400;
  padding-left: 25px;
  padding-right: 25px;
  color: #fff;
  -webkit-clip-path: polygon(0 0, 0 0, 100% 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 100%);
  clip-path: polygon(0 0, 0 0, 100% 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 100%);
  height: 30px;
  font-size: 0.7rem;
  line-height: 14px;
  letter-spacing: 1.2px;
  transition: .2s .1s;
  background-image: linear-gradient(90deg, #717171, #fb2071);
  border: 0 solid;
  overflow: hidden;
  @media (min-width:1024px){
    height: 40px;
  }

  &:hover{
    cursor: pointer;
    transition: all .3s ease-in;
    padding-right: 30px;
    padding-left: 30px;
  }
`;
export const InputStyled = styled.input`
  width: 100%;
  height: 30px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid transparent;
  outline: none;
  border-bottom-left-radius: 5px;
  background-color: #f3f3f4;
  color: #0d0c22;
  transition: .3s ease;
  border-top-left-radius: 5px;
  margin-left: 5px;
  @media (min-width:1024px){
    height: 40px;
  }

  &::placeholder{
    color: #9e9ea7;
  }
  &::forcus,hover{
    outline: none;
    border-color: rgba(234, 76, 137, 0.4);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(234 76 137 / 10%);
  }
`;