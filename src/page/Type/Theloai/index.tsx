import React from "react";
import { useParams } from "react-router-dom";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import {
  Loader,
  MessageErr,
  NotUpdate,
} from "../../../components/Message/Notification";
import MVTypeDisplay from "../component";
import MVGridCategory from "../../../components/Grid/component";

const ListType = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useSWRWithAxios(
    urlSwr + `/categorymain/${id}`
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <MessageErr />;
  }
  const datas =[...data.category,...data.products];
  return (
    <MVTypeDisplay
      data={data}
      children={
        datas.length ? (
          <MVGridCategory type="category" gutter={[16, 16]} child={datas} />
        ) : (
          <NotUpdate />
        )
      }
    />
  );
};

export default ListType;
