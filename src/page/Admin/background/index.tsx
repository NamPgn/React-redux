import { Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { MyButton } from '../../../components/Button';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../context';

const columns = [
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
const Background = () => {
  const { background } = useContext(MyContext);
  const data = {
    key: background.data._id,
    url: background ? background.data.url : '',
    action: (
      <span>
        <Link to={`/dashboard/background/edit/${background ? background.data._id : ''}`}>
          <MyButton type="primary" style={{ background: "#1677ff" }}>
            Edit
          </MyButton>
        </Link>
      </span>
    )
  }
  return (
    <>
      <Table columns={columns} dataSource={[data]} ></Table>
    </>
  )
}

export default Background