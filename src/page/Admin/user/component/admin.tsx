import React, { useEffect } from "react";
import { Table, Tag, Image } from "antd";
import { getAdmin } from "../../../../redux/slice/userSlice";
import { admin$ } from "../../../../redux/selectors";
import { useAppDispatch, useAppSelector } from "../../../../hook";
import { columnsGetAdmin } from "../../../../constant";

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
      role: item.role == 1 ? "Admin" : "Super Admin",
      status: <Tag color="success">Active</Tag>,
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
