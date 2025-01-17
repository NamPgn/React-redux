import React from "react";
import { Space, Table } from "antd";
import { useSWRWithAxios } from "../../../../hook/Swr";
import { urlSwr } from "../../../../function";
import { MyButton } from "../../../../components/MV/Button";
import MVLink from "../../../../components/Location/Link";
import { deleteCategoryType } from "../../../../sevices/catemain";
import { MVSuccess } from "../../../../components/Message";
import { mutate } from "swr";

const TypeCategory = () => {
  const { data: categorySelect } = useSWRWithAxios(
    urlSwr + "/bigcategory/content"
  );
  const handledelete = async (id) => {
    await deleteCategoryType(id);
    MVSuccess("Suscces");
    mutate(urlSwr + "/bigcategory/content");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record, index) => (
        <>
          <MVLink to={`/dashboard/week/edit/${record.key}`}>
            <MyButton type="primary">Edit</MyButton>
          </MVLink>
          <MyButton onClick={() => handledelete(record.key)} className="ml-1">
            Delete
          </MyButton>
        </>
      ),
    },
  ];
  const handleClick = async (id) => {};

  const content =
    categorySelect &&
    categorySelect.map((_, i) => {
      return {
        key: _._id,
        name: _.name,
      };
    });
  return (
    <>
      <MVLink to={`/dashboard/bigcategory/add`}>
        <MyButton type="primary">Add</MyButton>
      </MVLink>
      <Table columns={columns} dataSource={content} />
    </>
  );
};
export default TypeCategory;
