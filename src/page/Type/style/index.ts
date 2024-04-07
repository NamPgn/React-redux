import styled from "styled-components";
export const DivStyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
  }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;
export const DivStyledContent = styled.div``;
export const DivStyledImage = styled.img`
  border-radius: 5px;
`;
export const Div = styled.div`
  width: 220px;
  height: 350px;
  @media (1024px) {
    width: 220px;
    height: 350px;
  }
  @media (768px) {
    width: 120px;
    height: 250px;
  }
`;
export const DivStyledTitle = styled.div`
  font-weight: 500;
  margin-top: 15px;
  font-size: 15px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1024px) {
    font-size: 25px;
  }
`;
export const DivStyledText = styled.div`
  font-size: 12px;
  color: #999;
  @media (min-width: 768px) {
    font-size: 13px;
  }
  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;
export const DivStyledTitleItem = styled.div`
  margin: 10px 0;
  font-weight: 500;
`;

export const DivStyledBtnItem = styled.div`
  padding: 20px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1024px) {
    font-size: 17px;
  }
`;
