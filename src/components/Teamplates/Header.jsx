import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { routerNavBar } from '../../router';
import jwtDecode from 'jwt-decode';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';

const Header = () => {

    const data = isAuthentication();
    const handleClickOptionsAccount = () => {
        $(".acountImageContent").toggle();
    }
    const handleClickOptionsSignin = () => {
        $(".acountImageContent").toggle();
    }
    const handleClick = () => {
        $('#navbarToggleExternalContent2').slideToggle();
    }
    return (
        <>
            <header className="masthead mb-auto">
                <div className="inner fixed-top dk" style={{ boxShadow: "0 0 3px #fff" }} >
                    <div className="masthead-brand-img">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <img src="/img/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <nav className="nav nav-masthead justify-content-center">
                        {routerNavBar.map((item, index) => (
                            <li key={index} className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                        ))}

                    </nav>
                    <div className='acountUser'>
                        {
                            (() => {
                                try {
                                    const token = jwtDecode(data?.token);
                                    return <div className=" position-relative " >
                                        <div className='acountImage'>
                                            <img src={'https://pgddttramtau.edu.vn/wp-content/uploads/2022/12/1671376682_170_45-Avatar-Trang-Xoa-Cute-Dep-Cho-FB-Nam-Nu.jpg'} alt="" onClick={() => handleClickOptionsAccount()} />
                                        </div>
                                        <AuthLogged token={token} />
                                    </div>
                                } catch (error) {
                                    return <div className=" position-relative ">
                                        <div className="acountImage">
                                            <img onClick={() => handleClickOptionsSignin()} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&usqp=CAU'} alt="" />
                                        </div>
                                        <AuthUnLogger />
                                    </div>
                                }
                            })()
                        }
                    </div>
                </div>

                <div className='navbar_mb '>
                    <div className='justify-content-center lgmb_content'>
                        <div className="masthead-brand-img mb_img_lg py-2">
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <img src="/img/logo.png" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <nav className="navbar bgNav mb">
                        <div className="container-fluid">
                            <button onClick={() => handleClick()}
                                className="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarToggleExternalContent2"
                                aria-controls="navbarToggleExternalContent1"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="fas fa-bars text-light fsicon"></i>
                            </button>
                            {/* user */}
                            <div className='acountUser'>
                                {
                                    (() => {
                                        try {
                                            const token = jwtDecode(data?.token);
                                            return <div className=" position-relative " >
                                                <div className='acountImage'>
                                                    <img src={'https://pgddttramtau.edu.vn/wp-content/uploads/2022/12/1671376682_170_45-Avatar-Trang-Xoa-Cute-Dep-Cho-FB-Nam-Nu.jpg'} alt="" onClick={() => handleClickOptionsAccount()} />
                                                </div>
                                                <AuthLogged token={token} />
                                            </div>
                                        } catch (error) {
                                            return <div className=" position-relative ">
                                                <div className="acountImage">
                                                    <img onClick={() => handleClickOptionsSignin()} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwEgAHtFlzbKxbhus9ocoNE_ox89K_eTPkLBPdOPPyw&s'} alt="" />
                                                </div>
                                                <AuthUnLogger />
                                            </div>
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="bgNav" id="navbarToggleExternalContent2">
                    <div className="shadow-3 py-2 none" >
                        {routerNavBar.map((item, index) => (
                            <li key={index} className="nav-item mt-4 mb-4 text-dark"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header