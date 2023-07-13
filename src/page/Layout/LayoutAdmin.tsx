import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from "antd";
import '../../index.css'
import { TableRouterAdminPage } from '../../router';
const { Header, Content, Sider } = Layout;
const LayoutAdmin = () => {
    return (
        <>
            <Layout style={{ height: "vh" }}>
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background" >
                        <Menu style={{ height: "100%" }}>
                            {TableRouterAdminPage.map((router, index) => (
                                <Menu.Item key={index}>
                                    <Link to={router.Path}>
                                        {router.iconComponent}  {router.name}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
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
