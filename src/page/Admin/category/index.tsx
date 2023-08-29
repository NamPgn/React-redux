import React, { useContext, useEffect, useState } from 'react'
import { Table, Image, Radio } from 'antd';
import { addCateGorySlice, deleteCategorySlice, getAllcate } from '../../../redux/slice/category/ThunkCategory/category';
import { category$ } from '../../../redux/selectors';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { MyContext } from '../../../context';
import { pushCateTotype } from '../../../api/type';
import { useForm } from 'react-hook-form';
import renderInput, { MySelectWrapper, MyUploadWrapper } from '../../../hook/form';
import { MyButton } from '../../../components/Button';
import { Col, Row } from 'antd';
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
    key: 'Image',
  },
  {
    title: 'CreateAt',
    dataIndex: 'createAt',
    key: 'createAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',

  }
];
const CategoryAdmin = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(category$);
  const { seri, weeks } = useContext(MyContext);
  const [typeId, setId] = useState(null);
  const { register, handleSubmit, control } = useForm();
  const onsubmit = async (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('des', data.des);
    formdata.append('sumSeri', data.sumSeri);
    formdata.append('week', data.week);
    formdata.append('type', data.type);
    formdata.append('file', data.file[0]);
    const res = await dispatch(addCateGorySlice(formdata));
    if (res.payload.success) {
      toast.success('Thành công');
    } else {
      toast.error('Thất bại');
    }
  }

  const handleDelete = (id: string | number) => {
    if (id) {
      toast.success('Delete Success');
      dispatch(deleteCategorySlice(id))
    } else {
      toast.error('Delete Fail');
    }
  }
  useEffect(() => {
    dispatch(getAllcate());
  }, []);
  const handleGetid = (id) => {
    setId(id);
  }
  const hanedlePushCategoryToType = async (categoryId) => {
    const body = {
      categoryId: categoryId
    }
    await pushCateTotype(typeId, body);
  }


  const weeekOptions = weeks && (weeks?.map((item, index) => ({
    label: item.name,
    value: item._id
  })));
  const data = category.data ? category.data.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.name,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.linkImg} />,
      createAt: item.createdAt,
      action: (
        <div className='flex gap-1'>
          <Link to={`/dashboard/category/edit/${item._id}`}>
            <MyButton style={{ background: "#1677ff" }} type="primary">
              Edit
            </MyButton>
          </Link>
          <MyButton danger className='text-light ml-2' onClick={() => handleDelete(item._id)}>
            Delete
          </MyButton>
          <MyButton className='text-light ml-2' onClick={() => hanedlePushCategoryToType(item._id)}>
            Push
          </MyButton>
        </div>
      )
    }
  }) : ""
  return (
    <React.Fragment>
      <div className="p-2" style={{ display: 'flex', gap: '0 10px', justifyContent: 'center' }} >
        {seri && (
          seri.map((item: any, index: any) => (
            <div key={index}>
              {item.path == '/' ? '' : <Radio.Group value={typeId}>
                <Radio name='aa' onChange={() => handleGetid(item._id)}>{item.name}</Radio>
              </Radio.Group>}
            </div>
          ))
        )}
      </div>
      <Row gutter={10}>
        <Col span={18}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }}>
          </Table>
        </Col>
        <Col span={6}>
          <form onSubmit={handleSubmit(onsubmit)}>
            {renderInput('name', "Name", control)}
            {renderInput('des', "Description", control)}
            {renderInput('sumSeri', "Tổng số tập", control)}
            {renderInput('type', "Kiểu", control)}
            {renderInput('week', "Theo tuần", control)}
            <MySelectWrapper
              name={'week'}
              label={'Theo tuần'}
              control={control}
              placeholder={'Week'}
              defaultValue={undefined}
              style={{ width: 200 }}
              options={weeekOptions}
            />
            <MyUploadWrapper
              name={'file'}
              label={'Upload'}
              control={control}
            />
            {/* <input type="file" name='file' {...register('file')} className="mt-2" /> */}
            <MyButton htmlType='submit' className='mt-2'>Create</MyButton>
          </form>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CategoryAdmin
