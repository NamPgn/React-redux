import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Input, Image } from "antd";
import "../index.css";
import "./style/index.css";
import { TableRouterAdminPage } from "../router";
import { MyButton } from "../components/MV/Button";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import { MyContext } from "../context";
import MVRow from "../components/MV/Grid";
import MVCol from "../components/MV/Grid/Col";
import MVLink from "../components/Location/Link";
import MyBreadcrumb from "../components/MV/Breadcrumb";
import { handleLogout } from "../function";
import { useAppDispatch } from "../hook";
import { LogOutIcon } from "lucide-react";

const { Content, Sider, Header, Footer } = Layout;
const { Search } = Input;

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
  const { isLoggedInState } = useContext(MyContext) ?? {};
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout className="min-h-screen">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="p-4 flex justify-center ">
          <div className="w-[70px]">
          <MVLink to="/dashboard/product">
            <Image src={"/img/b32705f7-9444-41f9-8457-d1cc7773a259-min.png"} alt="logo" preview={false} />
          </MVLink>
          </div>
          
        </div>
        <Menu
          className="h-[calc(100%-56px)]"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items2}
        />
      </Sider>
      <Layout className={`transition-all duration-300`}>
        <Header className="bg-white p-0">
          <MVRow align={"middle"} justify={"space-between"}>
            <MVCol>
              <MyButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-gray-600 hover:text-blue-500 transition-colors"
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
                children={undefined}
              />
            </MVCol>
            <Search
              placeholder="Search email..."
              allowClear
              enterButton={<SearchOutlined />}
              className="max-w-md"
            />
            <MVCol className="text-center" style={{ width: 64 }}>
              <LogOutIcon size={20} onClick={() => handleLogout(dispatch, navigate)} className="cursor-pointer" />
            </MVCol>
          </MVRow>
        </Header>
        <Content className="min-h-[calc(100vh-64px)] overflow-auto bg-gray-200 p-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <MyBreadcrumb />
            </div>
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center text-gray-500 bg-white border-t border-gray-200 py-4">
          © 2023 copyright | PH ANG
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
