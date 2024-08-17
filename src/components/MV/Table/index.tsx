import { Table } from "antd";
import React, { memo } from "react";
import styled from "styled-components";
import './style/index.css';
const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    color: #333;
    font-weight: 600;
    padding: 16px;
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    background-color: #ffffff;
    padding: 16px;
    text-align: center;
  }

  .ant-table-row:hover {
    background-color: #e6f7ff;
  }

  .ant-table-tbody > tr.ant-table-row {
    transition: background-color 0.3s ease;
  }

  .ant-pagination {
    margin: 16px 0;
    text-align: center;
  }
`;
const MVTable = memo(({ columns, dataSource, ...rest }: any) => {
  return (
    <StyledTable
      columns={columns}
      dataSource={dataSource}
      {...rest}
      bordered
      size="middle"
    />
  );
});

export default MVTable;
