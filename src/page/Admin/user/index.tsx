import React, { useEffect } from 'react'
import { Table, Button, Image, Tag } from 'antd';
import { getAlluser, deteleUser } from '../../../redux/slice/userSlice';
import { DownloadOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { user$ } from '../../../redux/selectors';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    with: 150
  }
];
const GetUser = () => {
  const states = useAppSelector(user$);
  const dispath = useAppDispatch();
  useEffect(() => {
    dispath(getAlluser());
  }, []);
  const handleDelete = async (id) => {
    const responese = await dispath(deteleUser(id));
    if (responese.payload && responese.payload.success) {
      toast.success('Successfully deleted')
    } else {
      toast.error('Error deleting');
    }
  }
  const data = states ? states.map((item: any) => {
    return {
      key: item._id,
      name: item.username,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.image} />,
      status: item.isActive == 0 ? <Tag color="success">Active</Tag> : <Tag color="error">No Active</Tag>,
      role: item.role,
      action: (
        <>
          <NavLink to={`${item._id}/edit`}>
            <Button type="primary" danger shape="round" icon={<DownloadOutlined />}>
              Edit
            </Button>
          </NavLink>
          <Button
            style={{ background: "#1677ff" }}
            type="primary"
            onClick={() =>
              handleDelete(item._id)
            }
          >Delete</Button>
        </>
      )
    }
  }) : ""


  return (
    <>
      <NavLink to={'/dashboard/user/add'}>
        <Button style={{ background: "#1677ff" }} type="primary" shape="round">Add User</Button>
      </NavLink>
      <NavLink to={'/dashboard/user/creatingUser'} >
        <Button type="primary" shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Import Excel</Button>
      </NavLink>
      <NavLink to={'/dashboard/product/add'} >
        <Button type="primary" shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</Button>
      </NavLink>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
    </>
  )
}

export default GetUser
