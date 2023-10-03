import { Pagination } from "antd";
import React, { memo } from "react";
interface Pagination {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onChange: any;
  className: any;
  defaultCurrent: number;
}
const index = memo(
  ({
    totalItems,
    pageSize,
    currentPage,
    onChange,
    className,
    defaultCurrent,
  }: Pagination) => {
    return (
      <Pagination
        simple
        className={className}
        total={totalItems}
        current={currentPage}
        onChange={onChange}
        pageSize={pageSize}
        defaultCurrent={defaultCurrent}
      />
    );
  }
);

export default index;
