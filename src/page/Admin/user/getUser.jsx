import React, { useEffect } from 'react'
import { Space, Table, Tag, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluser, deteleUser } from '../../../redux/slice/userSlice';
import { NavLink } from "react-router-dom ";
import { DownloadOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { user$ } from '../../../redux/selectors';
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
  const states = useSelector(user$);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAlluser());
  }, []);
  const data = states ? states.map(item => {
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
          onClick={() =>
            toast.success(`Xóa user ${item.username} thành công`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }, dispath(deteleUser(item._id)))
          }
        >Delete</Button>
      )
    }
  }) : ""


  return (
    <>
      <NavLink to={'/admin/user/add'}>
        <Button type="primary" shape="round">Add User</Button>
      </NavLink>
      <NavLink to={'/admin/user/creatingUser'} >
        <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Import Excel</Button>
      </NavLink>
      <NavLink to={'/admin/product/add'} >
        <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
      </NavLink>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
    </>
  )
}

export default GetUser
