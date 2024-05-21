import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSWRWithAxios } from "../../../hook/Swr";
import { urlSwr } from "../../../function";
import { DivStyledBtnItem, DivStyledGrid } from "../style";
import {
  Loader,
  MessageErr,
  NotUpdate,
  Spiner,
} from "../../../components/Message/Notification";
import PaginationCustoms from "../../../components/MV/Pagination";
import MVGridCategory from "../../../components/Grid/component";
import { backgrounds } from "../../../constant";
import MVTypeDisplay from "../component";
import MVLink from "../../../components/Location/Link";

const SidebarApi = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const {
    data: { data, length },
    isLoading,
    isError,
  } = useSWRWithAxios(urlSwr + `/type/${id}?page=${page}`);
  if (isLoading) {
    return <Spiner />;
  }
  if (isError) {
    return <MessageErr />;
  }
  let dt = [...data.category,...data.products];
  return (
    <React.Fragment>
      <MVTypeDisplay
        data={data}
        children={
          data.products.length == 0 &&
          data.category.length == 0 &&
          data.categorymain.length == 0 ? (
            <NotUpdate />
          ) : data.categorymain.length <= 0 ? (
            <MVGridCategory type="category" gutter={[16, 16]} child={dt} />
          ) : (
            data.categorymain.length > 0 &&
            data.products.length <= 0 &&
            data.category.length <= 0 && (
              <DivStyledGrid>
                {data.categorymain.map((item: any, index: any) => (
                  <MVLink to={`/types/h/${item.cates._id}`} key={index}>
                    <DivStyledBtnItem
                      className="text-center text-gray text-[#fff]"
                      style={backgrounds[index]}
                    >
                      {item.cates.name}
                    </DivStyledBtnItem>
                  </MVLink>
                ))}
              </DivStyledGrid>
            )
          )
        }
      />
      <PaginationCustoms
        className="text-end mt-12"
        currentPage={page}
        defaultCurrent={1}
        totalItems={length}
        pageSize={10}
        onChange={(value) => setPage(value)}
      />
    </React.Fragment>
  );
};

export default SidebarApi;
