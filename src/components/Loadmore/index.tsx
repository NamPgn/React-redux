import React, { useContext, useState } from "react";
import { Spiner } from "../Message/Notification";
import PaginationCustoms from "../MV/Pagination";
import MVGridCategory from "../Grid/component";
import { MyContext } from "../../context";
import MVTypeDisplay from "../../page/Type/component";
export default function Index() {
  const { category, isLoading, setPage, page } = useContext(MyContext);
  if (isLoading) return <Spiner />;
  const data = {
    name: "Category",
  };
  return (
    <>
      <MVTypeDisplay data={data}>
        <MVGridCategory
          type="category"
          gutter={[16, 16]}
          child={category && category.data}
        />
        <PaginationCustoms
          className="text-center"
          currentPage={page}
          defaultCurrent={1}
          totalItems={category.length}
          pageSize={20}
          onChange={(value) => setPage(value)}
        />
      </MVTypeDisplay>
    </>
  );
}
