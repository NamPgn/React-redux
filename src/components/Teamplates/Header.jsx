import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { routerNavBar } from '../../router';
import jwtDecode from 'jwt-decode';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';
import styled from 'styled-components';

const Divstyled = styled.div``;
const Imagetyled = styled.img``;
const Buttontyled = styled.button``;
const Header = () => {
    const [state, setState] = useState(false);
    const [stateNav, setStateNav] = useState(false);
    const handleClick = () => {
        setState(value => !value);
    }
    const handleClickNav = () => {
        setStateNav(value => !value);
    }
    const data = isAuthentication();
    return (
        <>
            <header className="masthead mb-auto">
                <Divstyled className="inner fixed-top dk" >
                    <Divstyled className="masthead-brand-img">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Imagetyled src="/img/logo.png" alt="logo" />
                        </Link>
                    </Divstyled>
                    <Divstyled className="nav nav-masthead justify-content-center">
                        {routerNavBar.map((item, index) => (
                            <li key={index} className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                        ))}

                    </Divstyled>
                    <Divstyled className='acountUser'>
                        {
                            (() => {
                                try {
                                    const token = jwtDecode(data?.token);
                                    return <Divstyled className="position-relative" onClick={handleClick}>
                                        <Divstyled className='acountImage'>
                                            <Imagetyled src={'https://pgddttramtau.edu.vn/wp-content/uploads/2022/12/1671376682_170_45-Avatar-Trang-Xoa-Cute-Dep-Cho-FB-Nam-Nu.jpg'} alt="" />
                                        </Divstyled>
                                        {
                                            state ? (
                                                <>
                                                    <AuthLogged token={token} />
                                                </>
                                            ) : (<>
                                            </>)}
                                    </Divstyled>
                                } catch (error) {
                                    return <Divstyled className=" position-relative" onClick={handleClick}>
                                        <Divstyled className="acountImage" >
                                            <Imagetyled src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg&usqp=CAU'} alt="" />
                                        </Divstyled>
                                        {state ? (
                                            <><AuthUnLogger /></>
                                        ) : (<></>)}
                                    </Divstyled>
                                }
                            })()
                        }
                    </Divstyled>
                </Divstyled>

                <Divstyled className='navbar_mb '>
                    <Divstyled className='justify-content-center lgmb_content'>
                        <Divstyled className="masthead-brand-img mb_img_lg py-2">
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <Imagetyled src="/img/logo.png" alt="logo" />
                            </Link>
                        </Divstyled>
                    </Divstyled>
                    <Divstyled className="navbar bgNav mb">
                        <Divstyled className="container-fluid">
                            <Buttontyled onClick={() => handleClickNav()}
                                className="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarToggleExternalContent2"
                                aria-controls="navbarToggleExternalContent1"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                            <i className="fas fa-bars text-light fsicon"></i>
                            </Buttontyled>
                            {/* user */}
                            <Divstyled className='acountUser'>
                                {
                                    (() => {
                                        try {
                                            const token = jwtDecode(data?.token);
                                            return <Divstyled className=" position-relative " onClick={handleClick}>
                                                <Divstyled className='acountImage'>
                                                    <img src={'https://pgddttramtau.edu.vn/wp-content/uploads/2022/12/1671376682_170_45-Avatar-Trang-Xoa-Cute-Dep-Cho-FB-Nam-Nu.jpg'} alt="" />
                                                </Divstyled>
                                                {state ? (<>
                                                    <AuthLogged token={token} />
                                                </>) : (<></>)}
                                            </Divstyled>
                                        } catch (error) {
                                            return <Divstyled className=" position-relative ">
                                                <Divstyled className="acountImage">
                                                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwEgAHtFlzbKxbhus9ocoNE_ox89K_eTPkLBPdOPPyw&s'} alt="" />
                                                </Divstyled>
                                                {state ? (<>
                                                    <AuthUnLogger />
                                                </>) : (<></>)}
                                            </Divstyled>
                                        }
                                    })()
                                }
                            </Divstyled>
                        </Divstyled>
                    </Divstyled>
                </Divstyled>
                {
                    stateNav ? (<Divstyled className="bgNav">
                        <Divstyled className="shadow-3 py-2 " >
                            {routerNavBar.map((item, index) => (
                                <li key={index} className="nav-item mt-4 mb-4 text-dark"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                            ))}
                        </Divstyled>
                    </Divstyled>) : (<></>)
                }
            </header>
        </>
    );
}
export default Header