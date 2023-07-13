import React, { useContext, useEffect, useState } from 'react'
import { Table, Image, Button, Radio } from 'antd';
import { addCateGorySlice, deleteCategorySlice, getAllcate } from '../../../redux/slice/category/ThunkCategory/category';
import { category$ } from '../../../redux/selectors';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { MyContext } from '../../../context';
import { pushCateTotype } from '../../../api/type';
import { useForm } from 'react-hook-form';
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
  const { seri } = useContext(MyContext);
  const [typeId, setId] = useState(null);
  const { register, handleSubmit } = useForm();

  const onsubmit = (data: any) => {
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('des', data.des);
    formdata.append('sumSeri', data.sumSeri);
    formdata.append('week', data.week);
    formdata.append('type', data.type);
    formdata.append('file', data.file[0]);
    toast.success('Thành công');
    dispatch(addCateGorySlice(formdata));
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

  const data = category ? category.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.name,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.linkImg} />,
      createAt: item.createdAt,
      action: (
        <div className='flex gap-1'>
          <Link to={`/admin/category/edit/${item._id}`}>
            <Button style={{ background: "#1677ff" }} type="primary">
              Edit
            </Button>
          </Link>
          <Button danger className='text-light ml-2' onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
          <Button className='text-light ml-2' onClick={() => hanedlePushCategoryToType(item._id)}>
            Push
          </Button>
        </div>
      )
    }
  }) : ""
  return (
    <div>
      <div className="p-2" style={{ display: 'flex', gap: '0 10px', justifyContent: 'center' }} >
        {seri ? seri.map((item: any, index: any) => {
          return <div key={index}>
            <Radio.Group value={typeId}>
              <Radio name='aa' onChange={() => handleGetid(item._id)}>{item.name}</Radio>
            </Radio.Group>
          </div>
        }) : ''}
      </div>
      <div className='flex gap-2'>
        <Table className='w-9/12' columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }}></Table>
        <form className='w-3/12' onSubmit={handleSubmit(onsubmit)}>
          <div className='text-black'>Thêm</div>
          <div className="group">
            <input placeholder="Tên danh mục" {...register('name')} type="text" className="input2 "
            />
          </div>
          <div className="group">
            <input placeholder="Mô tả"
              {...register('des')}
              type="text"
              className="input2"
            />
          </div>
          <div className="group">
            <input placeholder="Tổng số tập"
              {...register('sumSeri')}
              type="text"
              className="input2"
            />
          </div>
          <div className="group">
            <input placeholder="Kiểu"
              {...register('type')}
              type="text"
              className="input2"
            />
          </div>
          <div className="group">
            <input placeholder="Theo tuần" {...register('week')} type="text" className="input2" />
          </div>
          <div className="group">
            <input type="file" name='file' {...register('file')} className="form-control" />
          </div>
          <Button htmlType='submit'>Add</Button>
        </form>
      </div>
    </div>
  )
}

export default CategoryAdmin
