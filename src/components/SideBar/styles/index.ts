import styled from "styled-components";

export const DivstySideBar = styled.div`
  display: block;
  @media (max-width: 768px) {
    background-color: none;
  }
  @media (min-width: 1024px) {
    color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
  }
`;

export const SibarImage = styled.img`
  object-fit: cover;
  @media (max-width: 768px) {
    pading: 5px;
  }
`;

export const SideBarText = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;


export const DivStyledSearchBarStyle = styled.input`
  padding: 10px;
  color:#fff;
  width:100%;
  background-color: #1f1f22;
  border-radius: 10px;
  font-size: 14px;
  @media (min-width: 768px) {
    display: block;
  }

  @media (min-width: 1024px) {
    display: block;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Text = styled.div`
  font-size: 11px;
  font-weight: 400;
`;

export const DivstyledContent = styled.div`
  padding: 7px;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.37);
  bottom: 0;
  z-index: 9;
  @media (min-width: 768px) {
    padding: 15px;
  }
  @media (min-width: 1024px) {
    padding: 20px;
  }
`;
export const DivStyledTitle = styled.div`
  display: flex;
  gap: 0 5px;
  align-items: center;
  justify-content: ${(prop) => prop.justify};
`;

export const RouterLink = styled.div``;
//props styled
export const DivStyledRouter = styled.div`
  display: flex;
  padding: 10px 15px;
  margin: 10px 0;
  align-items: end;
  justify-content: ${(props:any) => (props.state ? "center" : "start")};
  gap: 0 10px;
  &:hover {
    background-color: #1f1f22;
    border-radius: 5px;
    cursor: pointer;
    color: #ffffff;
  }
  & > a:hover {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const RouterIcon = styled.div`
  color: #d9d9d9;
  font-size: 11px;
  @media (min-width: 768px) {
    font-size: 13px;
  }
  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const RouterText = styled.div`
  font-size: 13px;
  margin-top: 4px;

  @media (min-width: 768px) {
    display: none;
  }

  @media (min-width: 1024px) {
    display: block;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
export const Icon = styled.div`
  display: block;
  cursor: pointer;
  color: #fff;
  @media (max-width: 768px) {
    display: none;
  }
`;
