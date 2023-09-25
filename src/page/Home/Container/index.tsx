
import React, { useContext, useState } from 'react'
import SearchResults from '../../../components/Search';
import ConfigHomePage from './ConfigHomePage';
import styled from 'styled-components';
import { ChangeContext, MyContext } from '../../../context';
import { useSWRWithAxios } from '../../../hook/Swr';
import { urlSwr } from '../../../function';
import { BtnStyled, InputStyled } from './styles';
import { Spiner } from '../../../components/Message/Loading';
import MVRow from '../../../components/MV/Grid';
import MVCol from '../../../components/MV/Grid/Col';
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
      {!isLoading ? <React.Fragment>
        <MVRow
          align="middle"
        >
          <MVCol
            xl={22}
            lg={21}
            md={20}
            sm={19}
            xs={18}
          >
            <InputStyled
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
            />
          </MVCol>
          <MVCol
            xl={2}
            lg={3}
            md={4}
            sm={5}
            xs={6}
          >
            <BtnStyled
              className='btnSearch'
              style={{
                width: '100%'
              }}
              onClick={handleSearch}
            >Tìm</BtnStyled>
          </MVCol>
        </MVRow>
        {
          searchValue
            ?
            <SearchResults data={results} />
            : <ConfigHomePage
              category={category?.data}
              isLoading={isLoading}
              isError={isError}
              state={state}
            />
        }
      </React.Fragment> : <Spiner
        delay={0.5}
        size='large'
        children={undefined}
        spinning={undefined}
      />}
    </React.Fragment>
  )
}

export default HomePage