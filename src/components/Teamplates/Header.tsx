import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInRoutes, routerNavBar } from '../../router';
import AuthLogged from '../OptionsAuth/AuthLogged';
import AuthUnLogger from '../OptionsAuth/AuthUnLogger';
import { ChangeContext, MyContext } from '../../context';
import Error from '../Message/Error';
import { DivContentMkt, DivLink, DivstyledMkt, Imagetyled } from './styles';
import { HomeOutlined, LikeOutlined, LoginOutlined, LogoutOutlined, MenuFoldOutlined, MenuOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, Drawer, Row } from 'antd';
import MenuItem from '../Menu';
import { Icon } from '../SideBar/styles';
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
	const { state: change, handleClick: handleClickChangeSidebar } = useContext(ChangeContext) ?? {};
	const [navSize, setnavSize] = useState("20px 10px");
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
		window.scrollY > 10 ? setnavSize("10px 5px") : setnavSize("20px 10px");
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
		<React.Fragment>
			<Row
				align="middle"
				justify="space-between"
				className={`${change ? 'w-11/12' : 'w-10/12'} inner fixed right-0`} style={{
					top: scrollUp ? '0' : "-25%",
					padding: navSize,
					backgroundColor: "#00000038"
				}}>
				<Col span={2}>
					<Icon className="text-[21px] md:text-[23px] lg:text-[25px]" onClick={handleClickChangeSidebar}>
						{change ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
					</Icon>
				</Col>
				<Col span={20}>
					<Row justify={'center'} align={'middle'}>
						<Row>
							{routerLoggedIn.map((item: any, index: any) => (
								<Col key={index} className='text-[15px] lg:text-[17px] md:text[16px]'>
									<Link
										style={{ color: "#fff", textDecoration: "none", margin: "0 20px" }}
										to={item.path}
									>{item.name}</Link>
								</Col>
							))}
						</Row>
						<Col>
							<DivContentMkt className='text-[15px] lg:text-[17px] md:text[16px]'>
								<DivstyledMkt>Liên hệ qc tele: </DivstyledMkt>
								<a href={'https://web.telegram.org/k/#@nampg'}>
									<DivLink />@nampg
								</a>
							</DivContentMkt>
						</Col>
						<Col className='ml-5 text-[15px] lg:text-[17px] md:text[16px]' style={{ marginLeft: "50px" }} onClick={handleCheckCart}>
							<LikeOutlined className='__ text-yellow-500' />
						</Col>
					</Row>
				</Col>
				<Col span={2}>
					<div>
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
				</Col>
			</Row>
			{/* mobile */}
			<div className='navbar_mb w-10/12 absolute right-0 z-10'>
				<Row justify={'space-between'} className="items-center navbar bgNav mb">
					<Col>
						<MenuOutlined className='text-white' onClick={showDrawer} />
					</Col>
					{/* user */}
					<Col>
						<div className='ml-5 relative' onClick={handleCheckCart}>
							<LikeOutlined className='__ text-yellow-500' />
						</div>
					</Col>
					<Col>
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
					</Col>
				</Row>
				{
					(<Drawer
						width={200}
						title="Drawer"
						key={placement}
						placement={'left'}
						closable={false}
						onClose={onClose}
						open={open}
						closeIcon={true}
						className="relative z-10"
					>
						<MenuItem icons={icon} data={routerLoggedIn} />
					</Drawer>)
				}
			</div>
		</React.Fragment>
	);
}
export default Header