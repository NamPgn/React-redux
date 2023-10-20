import React from "react";
import styled from "styled-components";
import {MessageErr, Spiner } from "../../Message/Notification";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import MVGridCategory from "../../Grid/component";
import MVLink from "../../Location/Link";
import MVTitle from "../../MV/Title";
const DivstyOllMovie = styled.div``;
const DivstyledContainer = styled.div``;

type CategoryProp = {
  category: any;
  isLoading: boolean;
  isError: any;
  phim?: any;
  loading?: boolean;
};

const CategoryHomePage = ({ category, isLoading, isError }: CategoryProp) => {
  const { data: phim, isLoading: loading } = useSWRWithAxios(
    urlSwr + "/type/movie?key=Phim lẻ"
  );
  if (isLoading && loading) {
    return (
      <Spiner
        size={undefined}
        children={undefined}
      />
    );
  }
  if (isError) {
    return <MessageErr />;
  }
  return (
    <DivstyledContainer>
      <div className="flex justify-between items-center">
        <MVTitle level={2} underline style={{ color: "#fff" }} strong>
          Hh 3d
        </MVTitle>
        <MVLink to={"/loadmore"}>
          <div className="underline lg:text-[15px] md:text[14px] text-[13px] text-[#999]">
            Xem tất cả
          </div>
        </MVLink>
      </div>
      <MVGridCategory type="category" gutter={[16, 16]} child={category} />
      <DivstyOllMovie>
        <MVTitle level={2} underline style={{ color: "#fff" }} strong>
          {phim?.name}
        </MVTitle>
        <MVGridCategory
          type="types"
          gutter={phim && phim.products.length ? [16, 16] : 0}
          child={phim.products}
        />
      </DivstyOllMovie>
    </DivstyledContainer>
  );
};

export default CategoryHomePage;
