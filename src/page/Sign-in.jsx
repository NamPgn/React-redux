import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginForm } from '../redux/slice/userSlice';
import { toast } from 'react-toastify';
const Signin = () => {
  const { register, handleSubmit } = useForm();
  const dispath = useDispatch();
  const navigate = useNavigate();
  
  const onsubmit = (data) => {
    if (dispath(loginForm(data))) {
      navigate('/');
      toast.success("Login Success");
    } else {
      alert("Đăng nhập lại đi");
      toast.error("Login failed");
    }
  }
  return (
    <div>
      <form className='container formContainer' onSubmit={handleSubmit(onsubmit)} >
        <div>
          <div className="inputGroup">
            <input type="text" className="input" {...register('email')} required="" placeholder='Email' autoComplete="off" />
          </div>
          <div className="inputGroup">
            <input type="password" className="input" {...register('password')} placeholder='Pass' required="" autoComplete="off" />
          </div>
          <button className="btn btn-primary">Submit</button>
          <Link to={'/auth/signup'} style={{ margin: "0px 10px" }} > Đăng kí </Link>
        </div>
      </form>
    </div>
  )
}

export default Signin