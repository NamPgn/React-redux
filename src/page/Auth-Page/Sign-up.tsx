import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { resgisterLogin } from "../../redux/slice/userSlice"
import { toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { useAppDispatch } from '../../hook';
const Divstyled = styled.div``;
const BtnStyled = styled.button``;
const InputStyled = styled.input``;
const FormStyled = styled.form``;
const Image = styled.img`
display: block;
@media (max-width: 768px) {
  display:none;
}
`;
const P = styled.p``;
const A = styled.a``;
const Label = styled.label``;
const Signup = () => {
    const schema = yup.object().shape({
        username: yup.string().required().test('is-email', 'Username must not contain @', (value: any) => {
            return !value.includes('@');
        }).max(15, 'Your Name value must be at most 10 characters long').matches(/^[A-Za-z]+$/),
        password: yup.string().required().max(15, 'Password value must be at most 10 characters long')
    })
    const { register, handleSubmit, formState: { errors } }: any = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onsubmit = (data: any) => {
        // const formData = new FormData();
        // formData.append("image", data.image[0]);
        // formData.append('username', data.username);
        // formData.append('email', data.email);
        // formData.append('password', data.password);
        dispatch(resgisterLogin(data));
        toast.success('Register Success');
        navigate("/auth/signin");
    }
    return (
        // <FormStyled onSubmit={handleSubmit(onsubmit)} className='vh-100'>
        //     <Divstyled className='mb-5'>
        //         {/* <form onSubmit={(onsubmit)} className="container formContainer"> */}
        //         <Divstyled className='formContainer containers '>
        //             <Divstyled>
        //                 <Divstyled className="mb-3 des">
        //                     <InputStyled type="text" className="input" {...register('username')} name="username" aria-describedby="emailHelp" placeholder='Username' />
        //                     {errors.username && <p>{errors.username.message}</p>}
        //                 </Divstyled>
        //                 {/* <Divstyled className="mb-3">
        //                 <input type="hidden"  className="input" name='email' onChange={(e) => { setSate({ ...state, email: e.target.value }) }} aria-describedby="emailHelp" placeholder='Email address' />
        //             </Divstyled> */}
        //                 <Divstyled className="mb-3 des">
        //                     <InputStyled type="password" className="input" {...register('password')} name='password' placeholder='Password' id="exampleInputPassword1" />
        //                     {errors.password && <p>{errors.password.message}</p>}
        //                 </Divstyled>
        //                 {/* <Divstyled className="mb-3" style={{ color: "#fff" }}>
        //                 <FileBase64 type='file'
        //                     multiple={false}
        //                     onDone={({ base64 }) => {
        //                         setSate({ ...state, image: base64 });
        //                     }}
        //                 />
        //             </Divstyled> */}
        //                 <BtnStyled className="btn btn-primary">Register</BtnStyled>
        //             </Divstyled>
        //         </Divstyled>
        //         {/* </form> */}
        //     </Divstyled>
        // </FormStyled>
        <Divstyled className="h-screen relative" >
            <Divstyled>
                <Divstyled
                    className="g-6 flex flex-wrap w-full items-center justify-center absolute top-1/2 left-1/2 translate-x-2/4 translate-y-2/4"
                    style={{ transform: 'translate(-50%,-50%)' }}
                >
                    <Divstyled className="md:w-8/12 lg:ml-6 lg:w-4/12" style={{
                        background: 'rgba(248, 248, 248, 0.04)',
                        padding: '20px',
                        borderRadius: ' 5px'
                    }}>
                        <FormStyled onSubmit={handleSubmit(onsubmit)}>
                            <Divstyled className="relative mb-6" data-te-input-wrapper-init>
                                <Divstyled>
                                    <Label className="block mb-2 text-sm font-medium  text-white">Your usename:</Label>
                                    <InputStyled style={{ width: '100%' }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register('username')} required="" placeholder='Username' autoComplete="off" />
                                    {errors.username && <p>{errors.username.message}</p>}
                                </Divstyled>
                            </Divstyled>

                            <Divstyled className="relative mb-6" data-te-input-wrapper-init>
                                <Divstyled>
                                    <Label className="block mb-2 text-sm font-medium  text-white">Your password:</Label>
                                    <InputStyled type="password"  {...register('password')} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" />
                                    {errors.password && <P>{errors.password.message}</P>}
                                </Divstyled>
                            </Divstyled>

                            <Divstyled className="mb-6 flex items-center justify-between">
                                <Divstyled className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <InputStyled
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full  before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        defaultChecked />
                                    <Label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointe text-white"
                                    >
                                        Remember me
                                    </Label>
                                </Divstyled>
                                <A
                                    href="#!"
                                    className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?
                                </A>
                            </Divstyled>
                            <Divstyled className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <P
                                    className="mx-4 mb-0 text-center font-semibold text-neutral-200">
                                    OR
                                </P>
                            </Divstyled>
                            <BtnStyled type="submit" style={{ background: "rgb(37 99 235 )" }} className="w-full text-white  
                            hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                            dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</BtnStyled>
                        </FormStyled>
                    </Divstyled>
                </Divstyled>
            </Divstyled>
        </Divstyled>
    )
}

export default Signup