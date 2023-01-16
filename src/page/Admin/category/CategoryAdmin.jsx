import React, { useEffect } from 'react'
import { Table, Image, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate } from '../../../slice/categorySlice';
const CategoryAdmin = () => {

  const columns = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CreateAt',
      dataIndex: 'createAt',
      key: 'createAt',
    }
  ];
  const dispath = useDispatch();
  const category = useSelector(state => state.category.value);
  useEffect(() => {
    dispath(getAllcate());
  }, []);
  const data = category ? category.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.name,
      createAt: item.createdAt,
    }
  }) : ""
  return (
    <div>
      <Table columns={columns} dataSource={data} ></Table>
    </div>
  )
}

export default CategoryAdmin
