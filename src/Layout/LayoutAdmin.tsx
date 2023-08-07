import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { Layout } from "antd";
import '../index.css'
import { TableRouterAdminPage } from '../router';
import MenuItem from '../components/Menu';
const { Header, Content, Sider } = Layout;

// function getItem(label?, key?, icon?, children?, path?, type?) {
//     return {
//         key,
//         icon,
//         children,
//         label: <Link to={path}>{label}</Link>,
//         path,
//         type
//     };
// }

// const items = [
//     getItem('Auth', '1', <MailOutlined />, [
//         getItem('Users', '2', <UserOutlined />, null, '/admin/users'),
//         getItem('Admin', '3', <UserOutlined />, null, '/admin/adminUer'),
//     ])
// ]
const LayoutAdmin = () => {
    return (
        <>
            <Layout style={{ height: "vh", textAlign: 'start' }}>
                <Header className="header">
                </Header>
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
