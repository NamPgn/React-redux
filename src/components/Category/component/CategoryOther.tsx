import React, { useEffect } from "react";
import styled from "styled-components";
import { Loader } from "../../Message/Notification";
import { urlSwr } from "../../../function";
import { useSWRWithAxios } from "../../../hook/Swr";
import MVGridCategory from "../../Grid/component";
import MVTitle from "../../MV/Title";
const DivstyledTitle = styled.div`
  color: #fff;
`;
const GetAllCategoryNotRequest = ({ id }) => {
  const { data: categorys, isLoading } = useSWRWithAxios(
    urlSwr + "/category/getAllCategoryNotRequest/" + id
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <MVTitle
        level={3}
        strong
        underline
        style={{ color: "#fff" }}
        className="underline my-2"
      >
        Liên quan
      </MVTitle>
      <MVGridCategory type="category" gutter={[16, 16]} child={categorys} />
    </React.Fragment>
  );
};

export default GetAllCategoryNotRequest;
