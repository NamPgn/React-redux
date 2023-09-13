import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { logout, uploadImage } from '../../redux/slice/userSlice';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { MyContext } from '../../context';
import Success from '../../components/Message/Success';
import Error from '../../components/Message/Error';
import { InputStyled } from '../../components/Form/styles';
import { EditOutlined } from '@ant-design/icons';
import { MyButton } from '../../components/MV/Button';
import MVAvatar from '../../components/MV/Avatar';
import { useForm } from 'react-hook-form';
import MVRow from '../../components/MV/Grid';
import MVCol from '../../components/MV/Grid/Col';
const Container = styled.div`
`;

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const { user } = useContext(MyContext);
  const { handleSubmit, control, register } = useForm();
  const handleLogOut = async () => {
    dispatch(logout());
    navigate('/');
  }
  const isLoading = useAppSelector(state => state.user.isLoading);
  const handleEditImage = async () => {
    const formData = new FormData();
    formData.append('file', state[0]);
    const datas = {
      id: user._id,
      formData: formData
    }
    const responese = await dispatch(uploadImage(datas));
    if (responese.payload.success) {
      Success('Image saved successfully');
    } else {
      Error('Image saved failed');
    }
  }
  return (
    <Container className="containers p-5 "  >
      <MVRow
        style={{
          margin: "20px"
        }}
        justify={'center'}>
        {
          user.image ? <MVAvatar
            title={'Hồ sơ'}
            size={150}
            src={user.image}
          /> : <div>Upload ảnh</div>
        }
      </MVRow>
      <div className='text-[20px] text-white text-center mb-3 capitalize'>{user.username}</div>
      <MVRow
        gutter={16}
        justify={'center'}
        align={'middle'}
      >
        <MVCol>
          <form onSubmit={handleSubmit(handleEditImage)}></form>
          <input type="file" className="text-white underline text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
            onChange={(e) => {
              const file = Array.from(e.target.files);
              setState(file);
            }}
          />
        </MVCol>
      </MVRow>
      <div className='text-center mt-5'>
        <MyButton onClick={() => handleLogOut()} danger className="text-white btn-rounded btn-lg">
          Logout
        </MyButton>
      </div>
      <MVRow
        gutter={16}
        justify={'center'}
        align={'middle'}
        style={{ marginTop: "20px" }}
      >
        <MVCol className='lg:w-4/12 md:w-6/12 w-full'>
          {/* <div className='text-sm text-[#fff]'>Full name</div> */}
          <InputStyled type="text" disabled defaultValue={user.username} placeholder='Full name' />
        </MVCol>
      </MVRow>
      <div className='flex justify-center'>
        <MyButton
          icon={<EditOutlined />}
          loading={isLoading}
          className='text-white mt-7'
          onClick={handleEditImage}>Update Profile
        </MyButton>
      </div>
    </Container>
  )
}

export default Profile
