import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isAuthentication } from '../../auth/getToken';
import { routerNavBar } from '../../router';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';
import styled from 'styled-components';
import { toast } from 'react-toastify'
import { ChangeContext } from '../../context';
import { Waypoint } from 'react-waypoint';
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
    const Auth = isAuthentication();
    const [state, setState] = useState(false);
    const [stateNav, setStateNav] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const { state: change } = useContext(ChangeContext);
    const [navSize, setnavSize] = useState("20px 0");
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        setScrollUp(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
        window.scrollY > 10 ? setnavSize("10px 0") : setnavSize("20px 0");
    });
    const handleClick = () => {
        setState(value => !value);
    }
    const handleClickNav = () => {
        setStateNav(value => !value);
    }
    const naviagate = useNavigate();
    const handleCheckCart = () => {
        if (!Auth) {
            toast.error('Bạn cần đăng nhập!')
        } else {
            naviagate('/cart/user');
        }
    }
    useEffect(() => {
        setScrollUp(true);
    }, [])
    // const { user, logOut } = UserAuth();
    return (
        <>
            <header className="masthead mb-auto">
                <Divstyled
                    className={change ? 'inner fixed right-0 w-11/12' : 'inner fixed right-0 w-10/12'}
                    style={{
                        top: scrollUp ? '0' : "-25%",
                        padding: navSize
                    }}>
                    {/* <Divstyled className="masthead-brand-img">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Imagetyled src="/img/logo.png" alt="logo" />
                        </Link>
                    </Divstyled> */}
                    <Divstyled className="nav nav-masthead justify-content-center d-flex">
                        {routerNavBar.map((item: any, index: any) => (
                            <li key={index} className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                        ))}

                        <DivContentMkt>
                            <DivstyledMkt>Liên hệ qc tele: </DivstyledMkt>
                            <a href={'https://web.telegram.org/k/#@nampg'}>
                                <DivLink />@nampg
                            </a>
                        </DivContentMkt>
                        <Divstyled className='ml-5' style={{ marginLeft: "50px" }} onClick={handleCheckCart}>
                            <i className="fa-solid fa-bookmark text-yellow-500 __"></i>
                        </Divstyled>
                    </Divstyled>
                    <Divstyled className='acountUser'>
                        {
                            (() => {
                                if (Auth) {
                                    return <Divstyled className="relative" onClick={handleClick}>
                                        <Divstyled className='acountImage'>
                                            <Imagetyled src={''} alt="" />
                                        </Divstyled>
                                        {
                                            state ? (
                                                <>
                                                    <AuthLogged token={Auth} />
                                                </>
                                            ) : (<></>)
                                        }
                                    </Divstyled>
                                } else return <Divstyled className="relative" onClick={handleClick}>
                                    <Divstyled className="acountImage" >
                                        <img />
                                    </Divstyled>
                                    {state ? (
                                        <><AuthUnLogger /></>
                                    ) : (<></>)}
                                </Divstyled>
                            })()
                        }
                    </Divstyled>
                </Divstyled>

                <Divstyled className='navbar_mb w-10/12 absolute right-0'>
                    <Divstyled className="navbar bgNav mb ">
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
                                <i className="fas fa-bars text-white fsicon"></i>
                            </Buttontyled>
                            {/* user */}
                            <Divstyled className='acountUser'>
                                {
                                    (() => {
                                        if (Auth) {
                                           return <Divstyled className="relative z-10 " onClick={handleClick}>
                                                <Divstyled className='acountImage'>
                                                    <Imagetyled src={''} alt="" />
                                                </Divstyled>
                                                {
                                                    state ? (
                                                        <>
                                                            <AuthLogged token={Auth} />
                                                        </>
                                                    ) : (<></>)
                                                }
                                            </Divstyled>
                                        } else return <Divstyled className="relative" onClick={handleClick}>
                                            <Divstyled className="acountImage" >
                                                <img src=''/>
                                            </Divstyled>
                                            {state ? (
                                                <><AuthUnLogger /></>
                                            ) : (<></>)}
                                        </Divstyled>
                                    })()
                                }
                            </Divstyled>
                        </Divstyled>
                    </Divstyled>
                    {
                        stateNav ? (<Divstyled className="bgNav relative z-10">
                            <Divstyled className="shadow-3 py-2 " >
                                {routerNavBar.map((item, index) => (
                                    <li key={index} className="nav-item mb-4 text-dark"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.Path}>{item.name}</Link></li>
                                ))}
                            </Divstyled>
                        </Divstyled>) : (<></>)
                    }
                </Divstyled>
            </header>
            <Waypoint
                onEnter={() => setScrollUp(false)}
                onLeave={() => setScrollUp(true)}
            />
        </>
    );
}
export default Header