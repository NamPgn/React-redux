import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInRoutes, routerNavBar } from '../../router';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';
import { ChangeContext, MyContext } from '../../context';
import Error from '../Message/Error';
import { DivContentMkt, DivLink, DivstyledMkt, Imagetyled } from './styles';
import { HomeOutlined, LikeOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import MenuItem from '../Menu';

const icon = [
    <HomeOutlined />,
    <LoginOutlined />,
    <LogoutOutlined />,
    <SettingOutlined />
]
const Header = () => {
    const { Auth, user, isLoggedInState } = useContext(MyContext) ?? {};
    const [state, setState] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const { state: change } = useContext(ChangeContext) ?? {};
    const [navSize, setnavSize] = useState("20px 0");
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('left');
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        setScrollUp(prevScrollPos > currentScrollPos);
        setPrevScrollPos(currentScrollPos);
        window.scrollY > 10 ? setnavSize("10px 0") : setnavSize("20px 0");
    });
    const handleClick = () => {
        setState(value => !value);
    }
    const naviagate = useNavigate();
    const handleCheckCart = () => {
        if (!Auth) {
            Error('Bạn cần đăng nhập!')
        } else {
            naviagate('/cart/user');
        }
    }
    useEffect(() => {
        setScrollUp(!false);
    }, []);

    const routerLoggedIn = isLoggedInState ? loggedInRoutes : routerNavBar;

    return (
        <>
            <header className="masthead mb-auto">
                <div
                    className={change ? 'inner fixed right-0 w-11/12' : 'inner fixed right-0 w-10/12'}
                    style={{
                        top: scrollUp ? '0' : "-25%",
                        padding: navSize
                    }}>

                    <div className="nav nav-masthead justify-center items-center d-flex">
                        {routerLoggedIn.map((item: any, index: any) => (
                            <li key={index} className="nav-item"><Link style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }} to={item.path}>{item.name}</Link></li>
                        ))}
                        <DivContentMkt>
                            <DivstyledMkt>Liên hệ qc tele: </DivstyledMkt>
                            <a href={'https://web.telegram.org/k/#@nampg'}>
                                <DivLink />@nampg
                            </a>
                        </DivContentMkt>
                        <div className='ml-5' style={{ marginLeft: "50px" }} onClick={handleCheckCart}>
                            <LikeOutlined className='__ text-yellow-500' />
                        </div>
                    </div>
                    <div className='acountUser'>
                        {
                            (() => {
                                if (Auth && isLoggedInState) {
                                    return <div className="relative" onClick={handleClick}>
                                        <div className='acountImage'>
                                            <Imagetyled src={user ? user.image : ''} className="h-full" alt="" />
                                        </div>
                                        {
                                            state ? (
                                                <>
                                                    <AuthLogged user={user} />
                                                </>
                                            ) : (<></>)
                                        }
                                    </div>
                                } else {
                                    return <div className="relative" onClick={handleClick}>
                                        <div className="acountImage" >
                                            <img className="h-full" />
                                        </div>
                                        {state ? (
                                            <><AuthUnLogger /></>
                                        ) : (<></>)}
                                    </div>
                                }
                            })()
                        }
                    </div>
                </div>
                {/* mobile */}
                <div className='navbar_mb w-10/12 absolute right-0 z-10'>
                    <div className="navbar bgNav mb">
                        <div className="container-fluid items-center">
                            <button className='text-white' onClick={showDrawer}>
                                <MenuOutlined />
                            </button>
                            {/* user */}
                            <div className='ml-5 relative' onClick={handleCheckCart}>
                                <LikeOutlined className='__ text-yellow-500' />
                            </div>
                            <div className='acountUser'>
                                {
                                    (() => {
                                        if (Auth && isLoggedInState) {
                                            return <div className="relative z-10 " onClick={handleClick}>
                                                <div className='acountImage'>
                                                    <Imagetyled src={user ? user.image : ''} className="h-full" alt="" />
                                                </div>
                                                {
                                                    state ? (
                                                        <>
                                                            <AuthLogged user={user} />
                                                        </>
                                                    ) : (<></>)
                                                }
                                            </div>
                                        } else return <div className="relative" onClick={handleClick}>
                                            <div className="acountImage" >
                                                <img src='' className="h-full" />
                                            </div>
                                            {state ? (
                                                <><AuthUnLogger /></>
                                            ) : (<></>)}
                                        </div>
                                    })()
                                }
                            </div>
                        </div>
                    </div>
                    {
                        (<Drawer
                            width={200}
                            title="Basic Drawer"
                            key={placement}
                            placement={'left'}
                            closable={false}
                            onClose={onClose}
                            open={open}
                            closeIcon={true}
                            className="relative z-10"
                        >
                            <MenuItem icons={icon} data={routerNavBar} />
                        </Drawer>)
                    }
                </div>
            </header>
        </>
    );
}
export default Header