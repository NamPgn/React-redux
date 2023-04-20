import React, { useEffect, useState } from 'react'
import { getTrailerUrls } from '../../../api/trailer';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

const indexTrailer = () => {

  const columns = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
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

  const [trailer, setTrailer] = useState([]);
  useEffect(() => {
    const getAlldata = async () => {
      const { data } = await getTrailerUrls();
      setTrailer(data);
    }
    getAlldata();
  }, [])
  const data = trailer ? trailer.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      url: item.url,
      action: (
        <span>
          <Link to={`/admin/trailerUrl/${item._id}`}>
            <Button type="button" style={{background:"#1677ff"}}> 
              Edit
            </Button>
          </Link>
        </span>
      )
    }
  }) : ""
  return (
    <>
      <Table columns={columns} dataSource={data} ></Table>
    </>
  )
}

export default indexTrailer

