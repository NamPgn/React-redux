import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { searCategory } from '../../../api/category';
import SearchResults from '../../../components/Search/SearchResults';
import ConfigHomePage from '../../Home/Libs/ConfigHomePage';
import { toast } from 'react-toastify'
import { isAuthentication } from '../../../auth/getToken';
import styled from 'styled-components';
import { MyContext } from '../../../components/Context';
const DivstyledConTent = styled.div`
padding: 20px 20px;
`;
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const HomePage = () => {
  const { category, isLoading, isError } = useContext(MyContext);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const Auth = isAuthentication();
  const naviagate = useNavigate();
  const handleSearch = async () => {
    const { data } = await searCategory(searchValue);
    setResults(data);
  }
  const handleCheckCart = () => {
    if (!Auth) {
      toast.error('Bạn cần đăng nhập!')
    } else {
      naviagate('/cart/user')
    }
  }
  return (
    <DivstyledConTent className='col-md-10'>
      <Divstyled className="form-outline searchHeader">
        <Divstyled className='d-flex align-items-center'>
          <Divstyled className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <InputStyled placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} type="search" className="inputSearch" />
          </Divstyled>
          <Divstyled>
            <BtnStyled className='btnSearch' onClick={handleSearch}>Tìm</BtnStyled>
          </Divstyled>
          <Divstyled className='ml-5' onClick={handleCheckCart}>
            <i className="fa-solid fa-bookmark text-warning h3 __"></i>
          </Divstyled>
          <a href={'https://github.com/NamPgn'}>
            <BtnStyled style={{ width: "210px" }} type="button" className="ml-5 text-white bg-[#1da1f2] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
              Github Của Tôi</BtnStyled>
          </a>
        </Divstyled>
      </Divstyled>
      {searchValue ? <SearchResults data={results} /> : <ConfigHomePage
        category={category}
        isLoading={isLoading}
        isError={isError} />}
    </DivstyledConTent>
  )
}

export default HomePage