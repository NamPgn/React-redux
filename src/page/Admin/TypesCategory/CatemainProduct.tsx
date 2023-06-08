import React from 'react'
import { Table, Button, Image } from 'antd';
import { useContext } from 'react';
import { MyContext } from '../../../context';
import { Link, useParams } from 'react-router-dom';
import { urlSwr } from '../../../function';
import { useSWRWithAxios } from '../../../hook/Swr';
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
    key: 'image',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
const CatemainProduct = () => {

  const { id } = useParams();
  const { data: datas } = useSWRWithAxios(urlSwr + '/categorymain/' + id);

  const handleclick = (id: string | number) => {
    console.log(id);
  }
  const data = datas.products ? datas.products.map((item, index) => ({
    key: index,
    stt: index + 1,
    name: item.name,
    image: <Image style={{ height: "200px", width: "150px" }} src={item.image} />,
    createdAt: item.createdAt,
    action: (
      <span>
        <Link to={`/admin/trailerUrl/${item._id}`} style={{ background: 'rgb(22, 119, 255)' }}>
          <Button type="primary"  >
            Edit
          </Button>
        </Link>
        <Button type="primary" danger className='ml-2' onClick={() => handleclick(item._id)}>
          Cút
        </Button>
      </span>
    )
  })) : ""
  return (
    <>
      <div className='mt-2 mb-2'>{datas.name}</div>
      <Table columns={columns} dataSource={data} ></Table>
    </>
  )
}

export default CatemainProduct