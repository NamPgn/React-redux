import React, { useContext } from "react";
import { MyButton } from "../../../components/MV/Button";
import MVTable from "../../../components/MV/Table";
import { columnsWeeks } from "../../../constant";
import { useForm } from "react-hook-form";
import {
  addWeeks,
  deleteCategoryByWeek,
  removeWeeks,
} from "../../../sevices/week";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
import MVConfirm from "../../../components/MV/Confirm";
import { DeleteOutlined } from "@ant-design/icons";
import { MVError, MVSuccess } from "../../../components/Message";
import { ApiContext } from "../../../context/api";
const Weeks = () => {
  const { weeks } = useContext(ApiContext);
  const { handleSubmit, control } = useForm();
  const handleDeleteCategoryByWeek = async (weeksId, categoryId) => {
    const _ = {
      categoryId: categoryId,
    };
    try {
      const response = await deleteCategoryByWeek(weeksId, _);
      if (response.data) {
        MVSuccess("Delete Success");
      }
    } catch (error) {
      MVError("Delete Failure");
    }
  };
  const onAdd = async (data) => {
    await addWeeks(data);
  };
  const handledelete = async (id) => {
    await removeWeeks(id);
  };
  const expandedRowRender = (record) => {
    const columns = [
      { title: "ID", dataIndex: "_id", key: "_id" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Action",
        key: "operation",
        render: (text, category) => (
          <>
            <MVConfirm
              title="Delete the category"
              onConfirm={() =>
                handleDeleteCategoryByWeek(record.key, category._id)
              }
              okText="Yes"
              cancelText="No"
            >
              <MyButton type="text" shape="circle" className="ml-2">
                <DeleteOutlined />
              </MyButton>
            </MVConfirm>
          </>
        ),
      },
    ];

    // Lấy danh sách category theo id của bảng cha
    const dataCategorys =
      weeks.find((week) => week._id === record.key)?.category || [];
    return (
      <MVTable
        columns={columns}
        dataSource={dataCategorys}
        pagination={false}
      />
    );
  };
  const data =
    weeks &&
    weeks.map((v, i) => {
      return {
        key: v._id,
        name: v.name,
        action: (
          <>
            <MVLink to={`/dashboard/week/edit/${v._id}`}>
              <MyButton type="primary">Edit</MyButton>
            </MVLink>
            <MyButton onClick={() => handledelete(v._id)} className="ml-1">
              Delete
            </MyButton>
          </>
        ),
      };
    });
  return (
    <>
      <form onSubmit={handleSubmit(onAdd)}>
        <MVRow gutter={4} align={"middle"} justify={"center"}>
          <MVCol span={22}>
            <MVInput
              name={"name"}
              label={"Theo tuần"}
              control={control}
              rules={undefined}
            />
          </MVCol>
          <MVCol span={2}>
            <MyButton htmlType="submit" className="mt-3" type="primary">
              Thêm
            </MyButton>
          </MVCol>
        </MVRow>
      </form>
      <MVTable
        columns={columnsWeeks}
        dataSource={data}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
      />
    </>
  );
};

export default Weeks;
