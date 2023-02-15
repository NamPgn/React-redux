import React, { useEffect } from 'react'
import { Table, Image, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllcate } from '../../../redux/slice/categorySlice';
import { category$ } from '../../../redux/selectors';
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
      title: 'Image',
      dataIndex: 'image',
      key: 'Image',
    },
    {
      title: 'CreateAt',
      dataIndex: 'createAt',
      key: 'createAt',
    }
  ];
  const dispath = useDispatch();
  const category = useSelector(category$);
  useEffect(() => {
    dispath(getAllcate());
  }, []);
  const data = category ? category.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.name,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.linkImg} />,
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
