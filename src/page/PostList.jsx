import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decodeUser } from '../auth/getToken';
import CategoryProductDm from '../components/CategoryProduct';
import { post$ } from '../redux/selectors';
import { addPostListSlice, getAllPostListSlice } from '../redux/slice/postSlice';
import { Modal } from 'antd';
import FileBase64 from 'react-file-base64';
import moment from 'moment';
const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [state, setState] = useState({
    title: '',
    content: '',
    image: ''
  });

  const post = useSelector(post$);
  const dataUser = decodeUser;
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAllPostListSlice());

  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 2000);

    dispath(addPostListSlice(state));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className='d-flex '>
        <div className=' col-md-9'>
          <button onClick={showModal}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Viết bài của bạn
            </span>
          </button>
          {post.map((item, index) => (
            <div className='widthPost' key={item._id} style={{ margin: "0 auto" }}>
              <div className="postConten" >
                <div className="postItem d-flex justify-content-between">
                  <div className='d-flex align-items-center' style={{ gap: "0 10px" }}>
                    <div className="postImg" >
                      <img style={{ height: '100%', objectFit: "cover" }} src={dataUser.image} alt="" />
                    </div>
                    <div className="postTitle">
                      <div className='postName'>
                        {dataUser.username}
                      </div>
                      <div className="postTime">
                        <div>{moment(item.updatedAt).format('LTS DD-MM-YYYY')}</div>
                      </div>
                    </div>
                  </div>
                  <div className="postMenu">
                    ...
                  </div>
                </div>
                <div className="postTieude" style={{ margin: "10px 0" }}>{item.title}</div>
                <div className="postImage" style={{ height: "250px" }}>
                  <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={item.image} alt="" />
                </div>
                <p>{item.content}</p>
                <div className="d-flex gap-2 pt-4 " style={{ margin: "0 auto" }}>
                  <button type="button" className="btn btn-soft-primary btn-sm w-50 text-Dark ">
                    <i className="fa-solid fa-thumbs-up"></i>
                    Like
                  </button>
                  <button type="button" className="btn btn-primary btn-sm w-50">
                    <i className="fa-regular fa-comment-dots"></i> Comment</button>
                </div>
              </div>
            </div>
          ))}

          <Modal style={{ color: "#000" }} title="Basic Modal" open={isModalOpen} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
            <div className="group">
              <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Title" name='title'
               onChange={e => setState({ ...state, title: e.target.value })} 
               type="text" 
               className="input2" />
            </div>
            <div className="group">
              <svg className="icon" aria-hidden="true" name='content' viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
              <input placeholder="Content" 
                type="text" 
                onChange={e => setState({ ...state, content: e.target.value })} 
                className="input2" />
            </div>
            <FileBase64 type='file'
              multiple={false}
              value={state.image}
              onDone={({ base64 }) => setState({ ...state, image: base64 })}
              accept='image/*' />
          </Modal>
        </div>
        <CategoryProductDm />
      </div>

    </>
  );
}

export default Product
