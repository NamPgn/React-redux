import React from 'react'
import { Table, Button } from 'antd';
import { useContext } from 'react';
import { MyContext } from '../../../components/Context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Divstyled = styled.div``;
const DivstyledContent = styled.div`
align-items: center;
`
const TypesCateAdmin = () => {
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
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Categorymain',
      dataIndex: 'categorymain',
      key: 'categorymain',
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
    {
      title: 'Render',
      dataIndex: 'render',
      key: 'render',
    },
  ];
  const handleClickdeleTypeProduct = (id) => {
    console.log(id);
  }
  const { seri, loadingSeri } = useContext(MyContext);
  const data = seri ? seri.map((item, index) => ({
    key: index,
    stt: index + 1,
    name: item.name,
    path: item.path,
    product: item.products ? item.products.map((product, index) => (
      <DivstyledContent className='d-flex' key={index}>
        <Divstyled className='mr-2'>
          {product.name}
        </Divstyled>
        <Button primary="true" >
          Edit
        </Button>
        <Button onClick={() => handleClickdeleTypeProduct(product._id)} primary="true" danger className='ml-2'>
          Cút
        </Button>
      </DivstyledContent>
    )) : "Trống!",
    categorymain: item.categorymain ? item.categorymain.map((item, index) => (
      <Link key={index} to={'/admin/types/CatemainProduct/' + item.cates._id}><div>
        {item.cates.name}
      </div></Link>
    )) : "Trống!",
    createdAt: item.createdAt,
    action: (
      <span>
        <Link to={`/admin/trailerUrl/${item._id}`}>
          <Button primary="true" >
            Edit
          </Button>
          <Button primary="true" danger className='ml-2'>
            Cút
          </Button>
        </Link>
      </span>
    )
  }
  )) : ""
  return (
    <Table columns={columns} dataSource={data} ></Table>
  )
}

export default TypesCateAdmin