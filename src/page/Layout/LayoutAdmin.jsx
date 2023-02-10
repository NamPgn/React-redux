import React from 'react'
import { Link, NavLink, Outlet } from "react-router-dom";
import { DashboardOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { LaptopOutlined } from '@ant-design/icons';
import '../../index.css'
import ProductAdmin from '../Admin/product/ProductAdmin';
const { Header, Content, Sider } = Layout;
const LayoutAdmin = () => {

    // const item = [UserOutlined].map((icon, index) => {
    //     const key = String(index + 1);
    //     const Links = [
    //         {
    //             id: 1,
    //             name: "Thống kê",
    //             nameUrl: "/admin"
    //         },
    //         {
    //             id: 2,
    //             name: "Products",
    //             nameUrl: "/admin/products"
    //         }, {
    //             id: 3,
    //             name: "Users",
    //             nameUrl: "/admin/users"
    //         },
    //         {
    //             id: 4,
    //             name: "Admin",
    //             nameUrl: "/admin/adminUer"
    //         }, {
    //             id: 5,
    //             name: "Category",
    //             nameUrl: "/admin/category"
    //         },
    //         {
    //             id: 6,
    //             name: "a",
    //             nameUrl: "/admin/category"
    //         }
    //     ];

    //     // return {
    //     //     key: `sub ${key}`,
    //     //     icon: React.createElement(icon),
    //     //     label: `subnav ${key}`,
    //     //     children: Links.map((value, j) => {
    //     //         const subKey = index * 4 + j + 1;
    //     //         return {
    //     //             key: subKey,
    //     //             label: <Link to={`${value.nameUrl}`} >{value.name}</Link>,
    //     //         };
    //     //     }),
    //     // }
    // })
    return (
        <div>
            <Layout style={{ height: "100%" }}>
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background" >
                        <Menu style={{ height: "100%" }}>
                            <Menu.Item>
                                <NavLink to="/admin">
                                    <DashboardOutlined /> Thống kê
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item >
                                <div onClick={() => <ProductAdmin />}>
                                    <NavLink to="/admin/products">
                                        <NotificationOutlined /> Products
                                    </NavLink>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <NavLink to="/admin/users">
                                    <UserOutlined /> Users
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                                <NavLink to="/admin/adminUer">
                                    <UserOutlined /> Admin
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                                <NavLink to="/admin/category">
                                    <UserOutlined /> Category
                                </NavLink>
                            </Menu.Item>
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
        </div>
    )
}

export default LayoutAdmin
