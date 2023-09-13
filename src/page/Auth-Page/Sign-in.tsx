import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loginForm } from '../../redux/slice/userSlice';
import { useAppDispatch } from '../../hook';
import { message } from 'antd';
import AuthForm from '../../components/Form';
import Success from '../../components/Message/Success';

const array = [
  {
    type: 'text',
    field: 'username',
    disable: false
  },
  {
    type: 'password',
    field: 'password',
    disable: false
  }
]
const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onsubmit = async (data: any) => {
    const responese: any = await dispatch(loginForm(data));
    if (responese.payload && responese.payload.success) {
      Success(responese.payload.message);
      navigate('/');
      location.reload();
    } else {
      Error(responese.error.message);
    }
    //if error then return login error
  }

  const handleMessage = () => {
    message.success('Đang cập nhật!');
  }
  return (
    <>
      <AuthForm
        onSubmit={onsubmit}
        formTitle={'Login'}
        formHeader={'Welcome Back .!'}
        formIntro={'Skip the lag ?'}
        submitButtonText={'Login'}
        formDescription={'Glad you’re back.!'}
        checkedAccount={'Don’t have an account ? Signup'}
        handleMessage={handleMessage}
        redirect={'/auth/signup'}
        array={array}
      />
    </>
  )
}

export default Signin