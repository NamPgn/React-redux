import React, { useState } from 'react'
import { useContext } from 'react';
import { MyContext } from '../../../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { pushListData } from '../../../api/product';
import { deleteTypeByProducts } from '../../../api/type';
import { columnsType } from '../../../constant';
import MVTable from '../../../components/Table';
import { MyButton } from '../../../components/Button';
const Divstyled = styled.div``;
const DivstyledContent = styled.div`
align-items: center;
`
const TypesCateAdmin = () => {
  const [state, setState] = useState('');
  const handleDeleTypeProduct = async (id: any, typeId: any) => {
    const body = {
      typeId: typeId
    }
    await deleteTypeByProducts(id, body)
  }
  const handleAddid = (id: string | any) => {
    setState(id);
  }
  const handlePushItem = async (id: string | any) => {
    const push = {
      TypeId: state
    }
    await pushListData(id, push)
  }

  const { seri }: any = useContext(MyContext) || {};
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
        <Link to={`/dashboard/product/edit/${product._id}`}>
          <MyButton>
            Edit
          </MyButton>
        </Link>
        <MyButton onClick={() => handleDeleTypeProduct(product._id, item._id)} type="primary" danger className='ml-2'>
          Cút
        </MyButton>
        <MyButton type="primary" onClick={() => handlePushItem(product._id)} className='ml-2'>
          Push
        </MyButton>
      </DivstyledContent>
    )) : "Trống!",
    categorymain: item.categorymain ? item.categorymain.map((item, index) => (
      <Link key={index} to={'/dashboard/types/CatemainProduct/' + item.cates._id}><div>
        {item.cates.name}
      </div></Link>
    )) : "Trống!",
    createdAt: item.createdAt,
    action: (
      <span>
        <Link to={`/dashboard/trailerUrl/${item._id}`}>
          <MyButton>
            Edit
          </MyButton>
          <MyButton danger className='ml-2'>
            Cút
          </MyButton>
        </Link>
      </span>
    ),
    checked: <input className="form-check-input"
      type="radio" name='123' id="defaultCheck1"
      onChange={() => handleAddid(item._id)}
    />
  }
  )) : ""
  return (
    <MVTable
      columns={columnsType}
      dataSource={data}
      pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }}
    />
  )
}

export default TypesCateAdmin