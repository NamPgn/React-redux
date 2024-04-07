import React, { useContext } from "react";
import ConfigHomePage from "./Container/Config";
import { ChangeContext, MyContext } from "../../context";
import { BtnStyled, InputStyled } from "./Container/styles";
import { Spiner } from "../../components/Message/Notification";
import MVRow from "../../components/MV/Grid";
import MVCol from "../../components/MV/Grid/Col";

const HomePage = () => {
  const { category, isLoading, isError }: any = useContext(MyContext) ?? {};
  const { state } = useContext(ChangeContext) || {};

  // const {
  //   data,
  //   isLoading: l,
  //   error: e,
  // }: any = useSWRWithAxios(urlSwr + `/categorys/search?value=${searchValue}`);
  
  return (
    <React.Fragment>
      {!isLoading ? (
        <React.Fragment>
          <MVRow align="middle">
            {/* <MVCol xl={22} lg={21} md={20} sm={19} xs={18}>
              <InputStyled
                placeholder="Search"
                onChange={(e) => handleChange(e.target.value)}
                type="search"
              />
            </MVCol>
            <MVCol xl={2} lg={3} md={4} sm={5} xs={6}>
              <BtnStyled
                className="btnSearch"
                style={{
                  width: "100%",
                }}
                onClick={handleSearch}
              >
                Tìm
              </BtnStyled>
            </MVCol> */}
          </MVRow>

          <ConfigHomePage
            category={category?.data}
            isLoading={isLoading}
            isError={isError}
            state={state}
          />
        </React.Fragment>
      ) : (
        <Spiner size="large" children={undefined} />
      )}
    </React.Fragment>
  );
};

export default HomePage;
