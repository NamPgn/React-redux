import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { routerNavBar } from '../../router';
import jwtDecode from 'jwt-decode';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';
import styled from 'styled-components';

const Divstyled = styled.div``;
const DivstyledMkt = styled.div`
color:#999;
font-weight:500;
`;
const DivLink = styled.div`
color: rgb(255, 214, 99);
font-weight:500;
`;
const Imagetyled = styled.img``;
const Buttontyled = styled.button``;
const DivContentMkt = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap:0 5px;
 
&>a{
    color: rgb(255, 214, 99) !important;
    font-weight:500;
}
`;
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
                        <DivContentMkt>
                            <DivstyledMkt>Liên hệ qc tele: </DivstyledMkt>
                            <a href={'https://web.telegram.org/k/#@nampg'}>
                                <DivLink />@nampg
                            </a>
                        </DivContentMkt>
                    </Divstyled>
                    <Divstyled className='acountUser'>
                        {
                            (() => {
                                try {
                                    const token = jwtDecode(data?.token);
                                    return <Divstyled className="position-relative" onClick={handleClick}>
                                        <Divstyled className='acountImage'>
                                            <Imagetyled src={''} alt="" />
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
                                            <img />
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
                                                    <img src={''} alt="" />
                                                </Divstyled>
                                                {state ? (<>
                                                    <AuthLogged token={token} />
                                                </>) : (<></>)}
                                            </Divstyled>
                                        } catch (error) {
                                            return <Divstyled className=" position-relative ">
                                                <Divstyled className="acountImage">
                                                    <img src={''} alt="" />
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