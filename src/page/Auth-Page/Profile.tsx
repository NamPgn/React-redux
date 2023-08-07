import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { logout, uploadImage } from '../../redux/slice/userSlice';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { MyContext } from '../../context';
import Success from '../../components/Message/Success';
import Error from '../../components/Message/Error';
import { InputStyled } from '../../components/Form/styles';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { MyButton } from '../../components/Button';

const Container = styled.div`

`;


const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const { Auth, user, isLoggedInState } = useContext(MyContext);
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


  if (Auth && isLoggedInState) {
    return <Container className="h-screen containers p-5 w-10/12">
      <div className='text-lg text-white underline'>
        User Info
      </div>
      <div className='flex justify-between items-center'>
        <div className='mt-6 text-sm text-[#999]'>
          Your Profile  Picture
        </div>
        <MyButton onClick={() => handleLogOut()} danger className="text-white btn-rounded btn-lg">
          Logout
        </MyButton>
      </div>
      <div className="flex items-center justify-start w-full mt-3 ">
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
        <div className='w-20 ml-4'>
          {user.image ? <img src={user.image} className="rounded " /> : <div>Upload ảnh</div>}
        </div>
      </div>
      <div style={{ border: "1px solid #999" }} className='w-full mt-6 mb-6 '></div>
      <div className='flex gap-2'>
        <div className='lg:w-4/12 md:w-6/12 w-full'>
          <div className='text-sm text-[#fff]'>Full name</div>
          <InputStyled type="text" disabled defaultValue={user.username} placeholder='Full name' />
        </div>
      </div>
      <MyButton icon={<EditOutlined />} loading={isLoading} className='text-white mt-7' onClick={handleEditImage}>Update Profile</MyButton>
    </Container>
  } else {
    return <Navigate to={'/auth/signin'} />
  }


}

export default Profile
