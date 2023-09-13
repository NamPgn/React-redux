import React, { useEffect } from 'react'
import { Image, Tag } from 'antd';
import { getAlluser, deteleUser } from '../../../redux/slice/userSlice';
import { DownloadOutlined } from "@ant-design/icons";
import { toast } from 'react-toastify';
import { user$ } from '../../../redux/selectors';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { columnsUser } from '../../../constant';
import MVTable from '../../../components/MV/Table';
import { MyButton } from '../../../components/MV/Button';

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
  const data = states && (states.map((item: any) => {
    return {
      key: item._id,
      name: item.username,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.image} />,
      status: item.isActive == 0 ? <Tag color="success">Active</Tag> : <Tag color="error">No Active</Tag>,
      role: item.role,
      action: (
        <>
          <NavLink to={`${item._id}/edit`}>
            <MyButton danger shape="round" icon={<DownloadOutlined />}>
              Edit
            </MyButton>
          </NavLink>
          <MyButton
            style={{ background: "#1677ff" }}
            onClick={() =>
              handleDelete(item._id)
            }
          >Delete</MyButton>
        </>
      )
    }
  }))

  return (
    <>
      <NavLink to={'/dashboard/user/add'}>
        <MyButton style={{ background: "#1677ff" }} shape="round">Add User</MyButton>
      </NavLink>
      <NavLink to={'/dashboard/user/creatingUser'} >
        <MyButton shape="round" style={{ display: "inline-block", margin: "10px 10px", background: "#28a745" }}>Import Excel</MyButton>
      </NavLink>
      <NavLink to={'/dashboard/product/add'} >
        <MyButton shape="round" style={{ display: "inline-block  ", margin: "10px 10px", background: "#eca52b" }}>Export PDF</MyButton>
      </NavLink>
      <MVTable
        columns={columnsUser}
        dataSource={data}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }}
      />
    </>
  )
}

export default GetUser
