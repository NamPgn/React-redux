import React, { useEffect } from 'react'
import { Space, Table, Tag, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluser, selectUserValue, deteleUser } from '../../slice/userSlice';
import { NavLink } from "react-router-dom ";
import { DownloadOutlined } from "@ant-design/icons";
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Action',
    key: 'action',
  },
  {
    title: "Edit",
    dataIndex: "edit",
  },
  {
    title: "Remove",
    dataIndex: "remove",
  },
];
const GetUser = () => {

  const states = useSelector(selectUserValue);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAlluser());
  }, []);
  console.log("test", states);
  const data = states ?states && states.map(item => {
    return {
      key: item._id,
      name: item.username,
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.image} />,
      edit: (
        <NavLink to={`${item._id}/edit`}>
          <Button type="primary" danger shape="round" icon={<DownloadOutlined />}>
            {" "}
            Edit{" "}
          </Button>
        </NavLink>
      ),
      remove: (
        <Button
          type="primary"
          onClick={() => dispath(deteleUser(item._id))}
        >Delete</Button>
      )
    }
  }) : ""


  return (
    <>
      <NavLink to={'/admin/user/add'}>
        <Button type="primary" shape="round">Add User</Button>
      </NavLink>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
    </>
  )
}

export default GetUser
