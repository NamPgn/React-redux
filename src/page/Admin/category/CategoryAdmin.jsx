import React, { useEffect, useState } from 'react'
import { Table, Image, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCateGorySlice, deleteCategorySlice, getAllcate } from '../../../redux/slice/category/ThunkCategory/category';
import { category$ } from '../../../redux/selectors';
import FileBase64 from 'react-file-base64';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const CategoryAdmin = () => {
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
  const dispath = useDispatch();
  const category = useSelector(category$);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stateAdd, setStateAdd] = useState({
    name: '',
    linkImg: '',
    des: '',
    sumSeri: ''
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
    dispath(addCateGorySlice(stateAdd));
    toast.success('Thành công')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (id) {
      toast.success('Delete Success');
      dispath(deleteCategorySlice(id))
    } else {
      toast.error('Delete Fail');
    }
  }
  useEffect(() => {
    dispath(getAllcate());
  }, []);
  const data = category ? category.map((item, index) => {
    return {
      key: item._id,
      stt: index + 1,
      name: item.name,
      image: <Image width={150} height={200} style={{ objectFit: "cover" }} src={item.linkImg} />,
      createAt: item.createdAt,
      action: (
        <span>
          <Link to={`/admin/category/edit/${item._id}`}>
            <Button style={{ background: "#1677ff" }} type="primary">
              Edit
            </Button>
          </Link>
          <Button type="danger" className='text-light ml-2' style={{ background: "#dc3545" }} onClick={() => handleDelete(item._id)}>
            Delete
          </Button>
        </span>
      )
    }
  }) : ""
  return (
    <div>
      <button className='btn btn-info' onClick={() => { showModal() }}>Show Modal</button>
      <Table columns={columns} dataSource={data} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '20', '30'] }}></Table>
      <Modal style={{ color: "#000" }} title="Basic Modal" open={isModalOpen} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Title" name='title'
            onChange={(e) => {
              setStateAdd({ ...stateAdd, name: e.target.value })
            }}
            type="text"
            className="input2"
          />
        </div>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="description" name='description'

            onChange={(e) => {
              setStateAdd({ ...stateAdd, des: e.target.value })
            }}
            type="text"
            className="input2"
          />
        </div>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Summseri" name='title'
            onChange={(e) => {
              setStateAdd({ ...stateAdd, sumSeri: e.target.value })
            }}
            type="text"
            className="input2"
          />
        </div>

        <FileBase64 type='file'
          multiple={false}
          onDone={({ base64 }) => {
            setStateAdd({ ...stateAdd, linkImg: base64 })
          }}
        />
      </Modal>
    </div>
  )
}

export default CategoryAdmin
