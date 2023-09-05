import React, { useEffect, useState } from 'react'
import { getTrailerUrl } from '../../../api/trailer';
import { Link } from 'react-router-dom';
import { MyButton } from '../../../components/Button';
import { columnsTrailer } from '../../../constant';
import MVTable from '../../../components/Table';
declare var Promise;
const indexTrailer = () => {
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
        <Link to={`/dashboard/trailerUrl/${trailer._id}`}>
          <MyButton type="primary" style={{ background: "#1677ff" }}>
            Edit
          </MyButton>
        </Link>
      </span>
    )
  }
  return (
    <>
      <MVTable
        columns={columnsTrailer}
        dataSource={[data]}
      />
    </>
  )
}

export default indexTrailer

