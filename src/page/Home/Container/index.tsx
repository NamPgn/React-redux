
import React, { useContext, useState } from 'react'
import SearchResults from '../../../components/Search/SearchResults';
import ConfigHomePage from './ConfigHomePage';
import styled from 'styled-components';
import { ChangeContext, MyContext } from '../../../context';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { BtnStyled, InputStyled } from './styles';
import { Spiner } from '../../../components/Message/Loading';
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
    <React.Fragment>
      {!isLoading ? <>
        <Divstyled className="">
          <Divstyled className='d-flex items-center'>
            <div className=' w-full flex items-center'>
              <Divstyled className="group w-full">
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
        />}
      </> : <Spiner delay={0.5} size='large' children={undefined} spinning={undefined} />}
    </React.Fragment>
  )
}

export default HomePage