import { Table } from "antd";
import React, { memo } from "react";
import styled from "styled-components";
import './style/index.css';

const MVTable = memo(({ columns, dataSource, ...rest }: any) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      {...rest}
      bordered
      size="middle"
    />
  );
});

export default MVTable;
