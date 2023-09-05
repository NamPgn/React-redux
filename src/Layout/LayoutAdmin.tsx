import React from 'react'
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import '../index.css'
import { TableRouterAdminPage } from '../router';
import MenuItem from '../components/Menu';
const { Content, Sider } = Layout;

const LayoutAdmin = () => {
	return (
		<>
			<Layout style={{ height: "vh", textAlign: 'start' }}>
				<Layout>
					<Sider width={200} className="site-layout-background" >
						<MenuItem icons={''} data={TableRouterAdminPage} />
					</Sider>
					<Layout style={{ padding: "0 24px 24px" }}>
						<Content
							className="site-layout-background"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							<Outlet />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	)
}

export default LayoutAdmin
