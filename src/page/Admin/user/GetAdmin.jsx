import React, { useEffect } from 'react'
import { Space, Table, Tag, Button, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin } from '../../../redux/slice/userSlice';
import { admin$ } from '../../../redux/selectors';
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
  }
];
const GetAdmin = () => {
  const dispath = useDispatch();
  const adminUser = useSelector(admin$);
  useEffect(() => {
    dispath(getAdmin());
  }, [])
  const data = adminUser.map(item => {
    return {
      key: item._id,
      name: item.username,
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.image} />,
    }
  })
  return (
    <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }} />
  )
}

export default GetAdmin