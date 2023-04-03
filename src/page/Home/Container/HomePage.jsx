import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { searCategory } from '../../../api/category';
import SearchResults from '../../../components/Search/SearchResults';
import ConfigHomePage from '../../Home/Libs/ConfigHomePage';
import { toast } from 'react-toastify'
import { isAuthentication } from '../../../auth/getToken';

const HomePage = () => {
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
    <div >
      <div className=''>
        <div className="form-outline searchHeader">
          <div className='d-flex align-items-center'>
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} type="search" className="inputSearch" />
            </div>
            <div>
              <button className='btnSearch' onClick={handleSearch}>Search</button>
            </div>
            <div className='ml-5' onClick={handleCheckCart}>
              <i className="fa-solid fa-bookmark text-warning h3 __"></i>
            </div>
            <a href={'https://github.com/NamPgn'}>
              <div >
                <i className="fa-brands fa-github h3 ml-5 text-light"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
      {searchValue ? <SearchResults data={results} /> : <ConfigHomePage />}
    </div>
  )
}

export default HomePage