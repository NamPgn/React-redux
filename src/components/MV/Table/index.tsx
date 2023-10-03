import { Table } from "antd";
import React, { memo } from "react";

const MVTable = memo(({ columns, dataSource, ...rest }: any) => {
  return <Table columns={columns} dataSource={dataSource} {...rest}></Table>;
});

export default MVTable;
