import React, { useState } from "react";
import { Table, Card, Button, Space } from "antd";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { ArrowUpOutlined } from "@ant-design/icons";
import { changeLatest } from "../../../../sevices/category";
import { MVSuccess } from "../../../../components/Message";
import { mutate } from "swr";

const LatestAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: response } = useSWRWithAxios(
    `${urlSwr}/category/latest?page=${currentPage}&limit=${pageSize}`,
    {
      revalidateOnFocus: true,
      dedupingInterval: 300000,
    }
  );

  const data = response?.data || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<ArrowUpOutlined />}
          onClick={() => handleClick(record.key)}
        />
      ),
    },
  ];

  const handleClick = async (id) => {
    const body = {
      id: id,
    };
    const { data } = await changeLatest(body);
    if (data.success === true) {
      MVSuccess("Success");
      mutate(`${urlSwr}/category/latest?page=${currentPage}&limit=${pageSize}`);
    }
  };

  const content = data?.map((item) => ({
    key: item._id,
    name: item.name,
  })) || [];

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div>
      <Card title="Latest Categories">
        <Table
          columns={columns}
          dataSource={content}
          loading={!data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: content.length,
            onChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default LatestAdmin;