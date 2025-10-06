import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Input,
  Image,
  Button,
  Space,
  Typography,
  Avatar,
  Dropdown,
  theme,
} from "antd";
import "../index.css";
import "./style/index.css";
import { TableRouterAdminPage } from "../router";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  HomeOutlined
} from "@ant-design/icons";
import MVLink from "../components/Location/Link";
import MyBreadcrumb from "../components/MV/Breadcrumb";
import { handleLogout } from "../function";
import { useAppDispatch } from "../hook";

const { Content, Sider, Header, Footer } = Layout;
const { Search } = Input;
const { Text } = Typography;

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const items2 = TableRouterAdminPage.map((items, index) => {
    const key = String(index + 1);
    return {
      key: `${key + 1}`,
      icon: items.icon,
      label: <MVLink to={items.path}>{items.name}</MVLink>,
      children: items?.children?.map((_, j) => {
        const subKey = j + 1;
        return {
          key: `subitem-${key}-${subKey}`,
          icon: _.icon,
          label: <MVLink to={_.path}>{_.name}</MVLink>,
        };
      }),
    };
  });

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => handleLogout(dispatch, navigate),
    },
  ];


  return (
    <Layout className="min-h-screen" style={{ backgroundColor: token.colorBgContainer }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: `linear-gradient(180deg, ${token.colorBgElevated} 0%, ${token.colorBgContainer} 100%)`,
          borderRight: `1px solid ${token.colorBorder}`,
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
        }}
        width={200}
        collapsedWidth={80}
      >
        {/* Logo Section */}
        <div style={{
          padding: collapsed ? token.padding : `${token.paddingLG}px ${token.paddingMD}px`,
          borderBottom: `1px solid ${token.colorBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '64px'
        }}>
          <MVLink to="/dashboard/product">
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src={"/img/b32705f7-9444-41f9-8457-d1cc7773a259-min.png"}
                alt="logo"
                preview={false}
              />
            </div>
          </MVLink>
        </div>

        {/* Navigation Menu */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items2}
            style={{
              border: 'none',
              background: 'transparent',
              padding: `${token.paddingXS}px 0`,
            }}
            className="admin-menu"
          />
        </div>

        {/* User Profile Section */}
        {!collapsed && (
          <div style={{
            padding: token.paddingMD,
            borderTop: `1px solid ${token.colorBorder}`,
            background: token.colorBgElevated
          }}>
            <Space direction="horizontal" align="center" style={{ width: '100%' }}>
              <Avatar
                size={32}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: token.colorPrimary,
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: token.fontWeightStrong,
                    color: token.colorText,
                    lineHeight: 1.2
                  }}
                >
                  Admin User
                </Text>
                <Text
                  style={{
                    display: 'block',
                    fontSize: '12px',
                    color: token.colorTextSecondary,
                    lineHeight: 1.2
                  }}
                >
                  Administrator
                </Text>
              </div>
            </Space>
          </div>
        )}
      </Sider>
      <Layout className={`transition-all duration-300`}>
        <Header style={{
          background: token.colorBgElevated,
          borderBottom: `1px solid ${token.colorBorder}`,
          padding: 0,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `0 ${token.paddingLG}px`,
            height: '64px'
          }}>
            {/* Left Section - Toggle & Breadcrumb */}
            <Space size="large" align="center" >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="admin-toggle-btn"
              />
              <Space align="center" size="small">
                <HomeOutlined style={{ color: token.colorTextSecondary }} />
                <Text style={{ color: token.colorTextSecondary, fontSize: '14px' }}>
                  Dashboard
                </Text>
              </Space>
            </Space>

            {/* Right Section - Notifications & User */}
            <Space size="middle" align="center">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="admin-icon-btn"
              />

              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
                overlayClassName="admin-dropdown"
              >
                <Button
                  type="text"
                  className="admin-user-btn"
                >
                  <Space align="center" size="small">
                    <Avatar
                      size={28}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: token.colorPrimary }}
                    />
                    {!collapsed && (
                      <>
                        <div style={{ textAlign: 'left' }}>
                          <Text style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: token.fontWeightStrong,
                            color: token.colorText,
                            lineHeight: 1.2
                          }}>
                            Admin User
                          </Text>
                          <Text style={{
                            display: 'block',
                            fontSize: '12px',
                            color: token.colorTextSecondary,
                            lineHeight: 1.2
                          }}>
                            Administrator
                          </Text>
                        </div>
                      </>
                    )}
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content style={{
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto',
          background: token.colorBgLayout,
          padding: token.paddingLG
        }}>
          <div className="admin-card" style={{
            background: token.colorBgContainer,
            padding: token.paddingLG,
            minHeight: 'calc(100vh - 64px - 32px)'
          }}>
            <div style={{ marginBottom: token.marginLG }}>
              <MyBreadcrumb />
            </div>
            <div className="admin-content">
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer style={{
          textAlign: 'center',
          color: token.colorTextSecondary,
          background: token.colorBgElevated,
          borderTop: `1px solid ${token.colorBorder}`,
          padding: `${token.padding}px 0`,
          fontSize: '14px'
        }}>
          © 2024 Movie Management System | PH ANG
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
