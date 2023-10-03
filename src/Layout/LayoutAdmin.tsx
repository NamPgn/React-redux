import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "../index.css";
import { TableRouterAdminPage } from "../router";
import MVMenuItem from "../components/MV/Menu";
import { MyButton } from "../components/MV/Button";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AuthHeader from "../components/Teamplates/Header/component/auth";
import { MyContext } from "../context";
import { handelChangeAuthOptions } from "../components/Dom";
import MVRow from "../components/MV/Grid";
import MVCol from "../components/MV/Grid/Col";
import MVLink from "../components/Location/Link";
const { Content, Sider, Header, Footer } = Layout;

const LayoutAdmin = () => {
  const { Auth, user, isLoggedInState } = useContext(MyContext) ?? {};
  const [collapsed, setCollapsed] = useState(false);
  const { state } = handelChangeAuthOptions();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed} width={180}>
        <MVMenuItem
          icons={""}
          background={"#fff"}
          id={false}
          data={TableRouterAdminPage}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            padding: 0,
          }}
        >
          <MVRow align={"middle"} justify={"space-between"}>
            <MVCol>
              <MyButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
                children={undefined}
              />
            </MVCol>
            <MVCol>
              <MVLink to={"/"}>Trang chủ</MVLink>
            </MVCol>
            <MVCol span={2}>
              <AuthHeader
                Auth={Auth}
                user={user}
                isLoggedInState={isLoggedInState}
                state={state}
                style={undefined}
              />
            </MVCol>
          </MVRow>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
        <Footer>© 2023 copyright | nampg</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
