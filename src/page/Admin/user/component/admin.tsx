import React, { useEffect } from "react";
import { Table, Image } from "antd";
import { getAdmin } from "../../../../redux/slice/userSlice";
import { admin$ } from "../../../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { columnsGetAdmin } from "../../../../constant";
import MVTags from "../../../../components/MV/Tag";

const GetAdmin = () => {
  const dispath = useAppDispatch();
  const adminUser = useAppSelector(admin$);
  useEffect(() => {
    dispath(getAdmin());
  }, []);
  const data = adminUser.map((item) => {
    return {
      key: item._id,
      name: item.username,
      email: item.email,
      role: item.role == 1 ? "Admin" : "Super Admin",
      status: <MVTags color="success">Active</MVTags>,
      tags: ["nice", "developer"],
      image: (
        <Image
          width={150}
          height={200}
          style={{ objectFit: "cover" }}
          src={item.image}
        />
      ),
    };
  });
  return (
    <Table
      columns={columnsGetAdmin}
      dataSource={data}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["5", "20", "30"],
      }}
    />
  );
};

export default GetAdmin;
