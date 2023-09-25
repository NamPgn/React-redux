import React from 'react'
import { Button, Image } from 'antd';
import { useParams } from 'react-router-dom';
import { urlSwr } from '../../../../function';
import { useSWRWithAxios } from '../../../../hook/Swr';
import { deleteCatemainByProduct } from '../../../../api/catemain';
import { columnsCatemainProduct } from '../../../../constant';
import MVTable from '../../../../components/MV/Table';
import { Typography } from 'antd';
import MVLink from '../../../../components/Location/Link';

const { Title } = Typography;
const CatemainProduct = () => {

  const { id } = useParams();
  const { data: datas } = useSWRWithAxios(urlSwr + '/categorymain/' + id);

  const handleclick = async (id: any, CatemainId: any) => {
    const body = {
      CatemainId: CatemainId
    }
    await deleteCatemainByProduct(id, body)
  }
  const data = datas.products && (
    datas.products.map((item, index) => ({
      key: index,
      stt: index + 1,
      name: item.name,
      image: <Image style={{ height: "200px", width: "150px" }} src={item.image} />,
      createdAt: item.createdAt,
      action: (
        <span>
          <MVLink to={`/dashboard/trailerUrl/${item._id}`} >
            <Button style={{ background: 'rgb(22, 119, 255)' }}>
              Edit
            </Button>
          </MVLink>
          <Button danger className='ml-2' onClick={() => handleclick(item._id, item.categorymain)}>
            Cút
          </Button>
        </span>
      )
    }))
  )
  return (
    <>
      <Title level={5}>{datas.name}</Title>
      <MVTable
        columns={columnsCatemainProduct}
        dataSource={data}
      />
    </>
  )
}

export default CatemainProduct