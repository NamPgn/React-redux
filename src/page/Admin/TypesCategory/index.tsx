import React, { useState } from 'react'
import { Table, Button } from 'antd';
import { useContext } from 'react';
import { MyContext } from '../../../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pushListData } from '../../../api/product';

const Divstyled = styled.div``;
const DivstyledContent = styled.div`
align-items: center;
`
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
    title: 'Checked',
    dataIndex: 'checked',
    key: 'checked',
  },
];
const TypesCateAdmin = () => {
  const [state, setState] = useState('');
  const handleClickdeleTypeProduct = (id: string) => {
    console.log(id);
  }
  const handleAddid = (id: string | any) => {
    setState(id);
  }
  const handlePushItem = async (id: string | any) => {
    const push = {
      typeId: state
    }
    await pushListData(id, push)
  }
  const { seri, loadingSeri }: any = useContext(MyContext);
  const data = seri ? seri.map((item: any, index: any) => ({
    key: index,
    stt: index + 1,
    name: item.name,
    path: item.path,
    product: item.products ? item.products.map((product: any, index: any) => (
      <DivstyledContent className='d-flex' key={index}>
        <Divstyled className='mr-2'>
          {product.name}
        </Divstyled>
        <Button type="primary" style={{ background: "#1677ff" }}>
          Edit
        </Button>
        <Button onClick={() => handleClickdeleTypeProduct(product._id)} type="primary" danger className='ml-2'>
          Cút
        </Button>
        <Button type="primary" onClick={() => handlePushItem(product._id)} style={{ background: "#1677ff" }} className='ml-2'>
          Push
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
          <Button type="primary" >
            Edit
          </Button>
          <Button type="primary" danger className='ml-2'>
            Cút
          </Button>
        </Link>
      </span>
    ),
    checked: <input className="form-check-input"
      type="checkbox" id="defaultCheck1"
      onChange={() => handleAddid(item._id)}
    />
  }
  )) : ""
  return (
    <Table columns={columns} dataSource={data} ></Table>
  )
}

export default TypesCateAdmin