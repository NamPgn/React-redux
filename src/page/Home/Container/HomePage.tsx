
import React, { useContext, useState } from 'react'
import SearchResults from '../../../components/Search/SearchResults';
import ConfigHomePage from '../Libs/ConfigHomePage';
import styled from 'styled-components';
import { ChangeContext, MyContext } from '../../../context';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { BtnStyled, InputStyled } from './styles';

const Divstyled = styled.div``;

const HomePage = () => {
  const { category, isLoading, isError }: any = useContext(MyContext) ?? {};
  const { state } = useContext(ChangeContext) || {};
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState({});
  const { data, isLoading: l, error: e }: any = useSWRWithAxios(urlSwr + `/products/search?value=${searchValue}`)
  const handleSearch = () => {
    setResults({ doc: data, isError: e, isLoading: l });
  }
  return (
    <div className={`w-10/12  p-2 @screen md:${state ? "w-11/12" : "w-10/12"}`}>
      <Divstyled className={state ? "form-outline p-2" : "form-outline"}>
        <Divstyled className='d-flex items-center'>
          <div className=' w-full flex items-center'>
            <Divstyled className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <InputStyled placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} type="search" />
            </Divstyled>
            <Divstyled>
              <BtnStyled className='btnSearch' onClick={handleSearch}>Tìm</BtnStyled>
            </Divstyled>
          </div>
        </Divstyled>
      </Divstyled>
      {searchValue ? <SearchResults data={results} /> : <ConfigHomePage
        category={category?.data}
        isLoading={isLoading}
        isError={isError}
        state={state}
      />
      }
      
    </div>
  )
}

export default HomePage