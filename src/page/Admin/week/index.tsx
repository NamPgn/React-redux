import React, { useContext, useState } from "react";
import { MyButton } from "../../../components/MV/Button";
import MVTable from "../../../components/MV/Table";
import { columnsWeeks } from "../../../constant";
import { useForm } from "react-hook-form";
import {
  addWeeks,
  removeWeeks,
} from "../../../sevices/week";
import MVRow from "../../../components/MV/Grid";
import MVCol from "../../../components/MV/Grid/Col";
import MVInput from "../../../components/MV/Input";
import { MVError, MVSuccess } from "../../../components/Message";
import { ApiContext } from "../../../context/api";
import { mutate } from "swr";
import { urlSwr } from "../../../function";
import EditWeekModal from "./components/editModal";
import { toast } from "react-toastify";

const Weeks = () => {
  const { weeks } = useContext(ApiContext);
  const { handleSubmit, control, reset } = useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<{ id: string; name: string } | null>(null);
  const onAdd = async (data) => {
    try {
      await addWeeks(data);
      mutate(urlSwr + "/weeks");
      MVSuccess("Thêm week thành công");
      reset();
    } catch (error) {
      MVError("Thêm week thất bại");
    }
  };

  const handledelete = async (id) => {
    try {
      await removeWeeks(id);
      mutate(urlSwr + "/weeks");
      toast.success("Xóa week thành công");
    } catch (error) {
      toast.error("Xóa week thất bại");
    }
  };

  const handleEdit = (weekId: string, weekName: string) => {
    setSelectedWeek({ id: weekId, name: weekName });
    setEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setEditModalVisible(false);
    setSelectedWeek(null);
  };

  const handleEditSuccess = () => {
    mutate(urlSwr + "/weeks");
  };

  const data =
    weeks &&
    weeks.map((v, i) => {
      return {
        key: v._id,
        name: v.name,
        slug: v.slug,
        action: (
          <>
            <MyButton 
              type="primary" 
              onClick={() => handleEdit(v._id, v.name)}
            >
              Edit
            </MyButton>
            <MyButton onClick={() => handledelete(v._id)} className="ml-1" danger>
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
              Create
            </MyButton>
          </MVCol>
        </MVRow>
      </form>
      <MVTable
        columns={columnsWeeks}
        dataSource={data}
      />

      <EditWeekModal
        open={editModalVisible}
        weekName={selectedWeek?.name || null}
        weekId={selectedWeek?.id || null}
        onClose={handleCloseModal}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default Weeks;