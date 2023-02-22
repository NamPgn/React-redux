import React, { useEffect, useState } from 'react'
import { Table, Image, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCateGorySlice, getAllcate, getCateSlice } from '../../../redux/slice/categorySlice';
import { category$, getCategoryOne$ } from '../../../redux/selectors';
import FileBase64 from 'react-file-base64';
import { addProductData } from '../../../api/product';
import { toast } from 'react-toastify';
import { getCategory } from '../../../api/category';
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
      // render: (record) => (
      //   <span>
      //     <Button type="primary" onClick={() => handleEdit(record)}>
      //       Edit
      //     </Button>
      //     <Button type="danger" style={{ background: "#dc3545" }} onClick={() => handleDelete()}>
      //       Delete
      //     </Button>
      //   </span>
      // ),
    }
  ];
  const dispath = useDispatch();
  const category = useSelector(category$);
  const categoryOne = useSelector(getCategoryOne$);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stateAdd, setStateAdd] = useState({
    name: '',
    image: '',
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

  const handleEdit = async (id) => {
    setIsModalOpen(true);
    // console.log(id);
    try {
      dispath(getCateSlice(id));
      console.log(categoryOne);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  const handleDelete = (id) => {

    // setStateAdd({ ...stateAdd, name: category[id].name, image: category[id].image, des: category[id].des, sumSeri: category[id].sumSeri });
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
          <Button type="primary" onClick={() => handleEdit(item._id)}>
            Edit
          </Button>
          <Button type="danger" style={{ background: "#dc3545" }} onClick={() => handleDelete()}>
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
          <input placeholder="Descriptions" name='title'
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
            setStateAdd({ ...stateAdd, image: base64 })
          }}
        />
      </Modal>
    </div>
  )
}

export default CategoryAdmin
