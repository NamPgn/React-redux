import React, { useContext, useState } from "react";
import { Loader } from "../Message/Notification";
import PaginationCustoms from "../MV/Pagination";
import MVGridCategory from "../Grid/component";
import { MyContext } from "../../context";
export default function Index() {
  const { category, isLoading, setPage, page } = useContext(MyContext);
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="lg:pb-16 md:pd-12 xs:pd-5">
        <div className="flex justify-center items-center">
          <div className="2xl:mx-auto 2xl:container p-2 ">
            <div className="flex flex-col jusitfy-center items-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800 lg:mb-[40px] md:mb-[30px] mb-[10px]">
                  Danh mục
                </h1>
              </div>
              {
                <MVGridCategory
                  type="category"
                  gutter={[16, 16]}
                  child={category && category.data}
                />
              }
            </div>
          </div>
        </div>
        <PaginationCustoms
          className="text-center"
          currentPage={page}
          defaultCurrent={1}
          totalItems={category.length}
          pageSize={20}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
}
