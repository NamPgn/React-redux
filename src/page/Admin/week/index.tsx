import React, { useContext } from "react";
import { MyButton } from "../../../components/MV/Button";
import { MyContext } from "../../../context";
import MVTable from "../../../components/MV/Table";
import { columnsWeeks } from "../../../constant";
import { useForm } from "react-hook-form";
import { addWeeks, removeWeeks } from "../../../sevices/week";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVInput from "../../../components/MV/Input";
import MVLink from "../../../components/Location/Link";
const Weeks = () => {
  const { weeks } = useContext(MyContext);
  const { handleSubmit, control } = useForm();
  const onAdd = async (data) => {
    await addWeeks(data);
  };
  const handledelete = async (id) => {
    await removeWeeks(id);
  };
  const data =
    weeks &&
    weeks.map((v, i) => ({
      key: v._id,
      name: v.name,
      action: (
        <React.Fragment>
          <MVLink to={`/dashboard/week/edit/${v._id}`}>
            <MyButton type="primary">Edit</MyButton>
          </MVLink>
          <MyButton
            onClick={() => handledelete(v._id)}
            handleDelete
            className="ml-1"
          >
            Xóa
          </MyButton>
        </React.Fragment>
      ),
    }));
  return (
    <React.Fragment>
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
      <MVTable columns={columnsWeeks} dataSource={data} />
    </React.Fragment>
  );
};

export default Weeks;
