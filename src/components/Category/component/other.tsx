import React, { useEffect } from "react";
import { Spiner } from "../../Message/Notification";
import { urlSwr } from "../../../function";
import { useSWRWithAxios } from "../../../hook/Swr";
import MVGridCategory from "../../Grid/component";
import MVTitle from "../../MV/Title";
import { useLocation } from "react-router-dom";
const GetAllCategoryNotRequest = ({ id }) => {
  const { data: categorys, isLoading } = useSWRWithAxios(
    urlSwr + "/category/getAllCategoryNotRequest/" + id
  );
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  if (isLoading) {
    return <Spiner size={undefined} children={undefined} />;
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
