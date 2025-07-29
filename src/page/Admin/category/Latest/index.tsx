import React from "react";
import { useState } from "react";
import { Table, Card, Typography, Pagination } from "antd";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { MyButton } from "../../../../components/MV/Button";
import { ArrowUpOutlined } from "@ant-design/icons";
import { changeLatest } from "../../../../sevices/category";
import { MVSuccess } from "../../../../components/Message";
import { mutate } from "swr";
import PageTitle from "../../../../components/PageTitle";

const { Text } = Typography;

const LatestAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const color = ["#eb2f96", "#52c41a", "#eba12f"];

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
      render: (text) => (
        <p className="text-gray-700 text-sm font-medium">{text}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <MyButton
          type="text"
          shape="circle"
          className="ml-2 hover:bg-gray-100 transition-all duration-300"
          onClick={() => handleClick(record.key)}
        >
          <ArrowUpOutlined
            style={{
              color: color[index % color.length],
              fontSize: "16px",
              transition: "all 0.3s ease",
            }}
            className="hover:scale-110 hover:rotate-12"
          />
        </MyButton>
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

  const content =
    data &&
    data.map((_, i) => {
      return {
        key: _._id,
        name: _.name,
      };
    });

  // Calculate pagination
  const paginatedData = content
    ? content.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle
          title="Latest Categories"
          subtitle="Manage your latest category rankings"
        />

        <Card
          className="rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            dataSource={paginatedData}
            className="latest-categories-table"
            pagination={false}
            rowClassName="hover:bg-gray-50 transition-colors duration-300"
            loading={!data}
          />

          {content && content.length > 0 && (
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <Text type="secondary">
                Showing {paginatedData.length} of {content.length} items
              </Text>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={content ? content.length : 0}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                size="small"
              />
            </div>
          )}
        </Card>
      </div>

      <style>{`
        .latest-categories-table .ant-table-thead > tr > th {
          background: #ffffff;
          color: #64748b;
          font-weight: 500;
          font-size: 0.875rem;
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .latest-categories-table .ant-table-tbody > tr > td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .latest-categories-table .ant-table-tbody > tr:hover > td {
          background: #f8fafc;
        }
        
        .latest-categories-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none;
        }

        .latest-categories-table .ant-table-tbody > tr > td:last-child {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default LatestAdmin;