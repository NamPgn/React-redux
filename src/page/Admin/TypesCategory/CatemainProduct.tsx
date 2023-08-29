import React from 'react'
import { Table, Button, Image } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { urlSwr } from '../../../function';
import { useSWRWithAxios } from '../../../hook/Swr';
import { deleteCatemainByProduct } from '../../../api/catemain';
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

  const handleclick = async (id: any, CatemainId: any) => {
    const body = {
      CatemainId: CatemainId
    }
    await deleteCatemainByProduct(id, body)
  }
  const data = datas.products ? datas.products.map((item, index) => ({
    key: index,
    stt: index + 1,
    name: item.name,
    image: <Image style={{ height: "200px", width: "150px" }} src={item.image} />,
    createdAt: item.createdAt,
    action: (
      <span>
        <Link to={`/dashboard/trailerUrl/${item._id}`} >
          <Button type="primary" style={{ background: 'rgb(22, 119, 255)' }}>
            Edit
          </Button>
        </Link>
        <Button type="primary" danger className='ml-2' onClick={() => handleclick(item._id, item.categorymain)}>
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