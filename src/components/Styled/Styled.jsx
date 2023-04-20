import styled from 'styled-components';
// import { useDeleteCartMutation } from '../../redux/slice/cart';




const NotFoundItem = styled.div`
font-size: 14px;
color:#fff;
text-align: center;
`;



const CartAddContent = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;




const TitleFavoritesCart = styled.div`
color: #fff;
`;

const TitleCart = styled.h1``



export const StyledMessageErrText = ({ text }) => <NotFoundItem>{text}</NotFoundItem>;

export const StyledCartAddContent = ({ children }) => <CartAddContent >{children}</CartAddContent>

export const StyledTitleFavorite = ({ name, seri }) => <TitleFavoritesCart className='mt-4 mb-4 text-light'>{name + " " + seri}</TitleFavoritesCart>

export const StyledTitleCart = () => <TitleCart className='mb-4 text-3xl font-extrabold  dark:text-white md:text-5xl lg:text-6xl'>
  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span>Scalable AI.
</TitleCart>

