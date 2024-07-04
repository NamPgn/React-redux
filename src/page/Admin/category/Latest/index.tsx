import React from "react";
import { Space, Table } from "antd";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { MyButton } from "../../../../components/MV/Button";
import { ArrowUpOutlined } from "@ant-design/icons";
import { changeLatest } from "../../../../sevices/category";
import { MVSuccess } from "../../../../components/Message";
import { mutate } from "swr";

const LatestAdmin = () => {
  const color=[
    "#eb2f96",
    "#52c41a",
    "#eba12f"
  ]
  const {
    data: { data },
  } = useSWRWithAxios(urlSwr + "/category/latest");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record,index) => (
        <MyButton
          type="text"
          shape="circle"
          className="ml-2"
          onClick={() => handleClick(record.key)}
        >
          <ArrowUpOutlined type="success" style={{color:color[index]}} />
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
      mutate(urlSwr + "/category/latest");
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
  return <Table columns={columns} dataSource={content} />;
};
export default LatestAdmin;
