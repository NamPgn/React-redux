import React, { useEffect, useState } from 'react'
import { getTrailerUrl } from '../../../api/trailer';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { MyButton } from '../../../components/Button';
declare var Promise;
const indexTrailer = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
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

  const [trailer, setTrailer]: any = useState({});
  useEffect(() => {
    const getAlldata = async (): Promise<any> => {
      const { data } = await getTrailerUrl();
      setTrailer(data);
    }
    getAlldata();
  }, [])
  const data = {
    _id: trailer._id,
    url: trailer.url,
    action: (
      <span>
        <Link to={`/admin/trailerUrl/${trailer._id}`}>
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

export default indexTrailer

