import React, { useEffect } from "react";
import { Image } from "antd";
import { getAlluser, deteleUser } from "../../../redux/slice/userSlice";
import { DownloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { user$ } from "../../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { columnsUser } from "../../../constant";
import MVTable from "../../../components/MV/Table";
import { MyButton } from "../../../components/MV/Button";
import MVLink from "../../../components/Location/Link";
import MVTags from "../../../components/MV/Tag";

const GetUser = () => {
  const states = useAppSelector(user$);
  const dispath = useAppDispatch();
  useEffect(() => {
    dispath(getAlluser());
  }, []);
  const handleDelete = async (id) => {
    const responese = await dispath(deteleUser(id));
    if (responese.payload && responese.payload.success) {
      toast.success("Successfully deleted");
    } else {
      toast.error("Error deleting");
    }
  };
  const data =
    states &&
    states.map((item: any) => {
      return {
        key: item._id,
        name: item.username,
        image: (
          <Image
            width={150}
            height={200}
            style={{ objectFit: "cover" }}
            src={item.image}
          />
        ),
        status:
          item.isActive == 0 ? (
            <MVTags color="success">Active</MVTags>
          ) : (
            <MVTags color="error">No Active</MVTags>
          ),
        role: item.role,
        action: (
          <>
            <MVLink to={`${item._id}/edit`}>
              <MyButton className="mr-2" danger icon={<DownloadOutlined />}>
                Edit
              </MyButton>
            </MVLink>
            <MyButton onClick={() => handleDelete(item._id)}>Delete</MyButton>
          </>
        ),
      };
    });

  return (
    <>
      <MVLink to={"/dashboard/user/add"}>
        <MyButton>Add User</MyButton>
      </MVLink>
      <MVLink to={"/dashboard/user/creatingUser"}>
        <MyButton style={{ margin: "10px 10px" }}>Import Excel</MyButton>
      </MVLink>
      <MVLink to={"/dashboard/product/add"}>
        <MyButton>Export PDF</MyButton>
      </MVLink>
      <MVTable
        columns={columnsUser}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "20", "30"],
        }}
      />
    </>
  );
};

export default GetUser;
