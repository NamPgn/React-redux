import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInRoutes, routerNavBar } from "../../../router";
import { ChangeContext, MyContext } from "../../../context";
import { DivContentMkt, DivLink, DivstyledMkt } from "../styles";
import {
  HomeOutlined,
  LikeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import MVMenuItem from "../../MV/Menu";
import { Icon } from "../../SideBar/styles";
import AuthHeader from "./component/auth";
import MVRow from "../../MV/Grid";
import MVCol from "../../MV/Grid/Col";
import MVLink from "../../Location/Link";
import { MVError } from "../../Message";
const icon = [
  <HomeOutlined />,
  <LoginOutlined />,
  <LogoutOutlined />,
  <SettingOutlined />,
];
const Header = () => {
  const { Auth, user, isLoggedInState } = useContext(MyContext) ?? {};
  const [scrollUp, setScrollUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { state: change, handleClick: handleClickChangeSidebar } =
    useContext(ChangeContext) ?? {};
  const [navSize, setnavSize] = useState("20px 10px");
  const [open, setOpen] = useState(false);
  const placement = "left";
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    setScrollUp(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
    window.scrollY > 10 ? setnavSize("10px 5px") : setnavSize("20px 10px");
  });

  const naviagate = useNavigate();
  const handleCheckCart = () => {
    if (!Auth) {
      MVError("Bạn cần đăng nhập!");
    } else {
      naviagate("/cart/user");
    }
  };
  useEffect(() => {
    setScrollUp(!false);
  }, []);
  const routerLoggedIn = isLoggedInState ? loggedInRoutes : routerNavBar;
  return (
    <React.Fragment>
      <MVRow
        align="middle"
        justify="space-between"
        className={`${change ? "w-11/12" : "w-10/12"} inner fixed right-0`}
        style={{
          top: scrollUp ? "0" : "-25%",
          padding: navSize,
          backgroundColor: "#00000038",
        }}
      >
        <MVCol>
          <Icon
            className="text-[21px] md:text-[23px] lg:text-[25px]"
            onClick={handleClickChangeSidebar}
          >
            {change ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </Icon>
        </MVCol>
        <MVCol span={20}>
          <MVRow justify={"center"} align={"middle"}>
            <MVRow>
              {routerLoggedIn.map((item: any, index: any) => (
                <MVCol
                  key={index}
                  className="text-[15px] lg:text-[17px] md:text[16px]"
                >
                  <MVLink
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      margin: "0 20px",
                    }}
                    to={item.path}
                  >
                    {item.name}
                  </MVLink>
                </MVCol>
              ))}
            </MVRow>
            <MVCol>
              <DivContentMkt className="text-[15px] lg:text-[17px] md:text[16px]">
                <DivstyledMkt>Liên hệ qc tele: </DivstyledMkt>
                <a href={"https://web.telegram.org/k/#@nampg"}>
                  <DivLink />
                  @nampg
                </a>
              </DivContentMkt>
            </MVCol>
            <MVCol
              className="ml-5 text-[15px] lg:text-[17px] md:text[16px]"
              style={{ marginLeft: "50px" }}
              onClick={handleCheckCart}
            >
              <LikeOutlined className="__ text-yellow-500" />
            </MVCol>
          </MVRow>
        </MVCol>
        <MVCol span={2}>
          <AuthHeader
            user={user}
            isLoggedInState={isLoggedInState}
            Auth={Auth}
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          />
        </MVCol>
      </MVRow>
      {/* mobile */}
      <div className="navbar_mb w-10/12 absolute right-0 z-10">
        <MVRow
          align={"middle"}
          justify={"space-between"}
          className="navbar bgNav mb"
        >
          <MVCol>
            <MenuOutlined className="text-white" onClick={showDrawer} />
          </MVCol>
          <MVCol>
            <div className="ml-5 relative" onClick={handleCheckCart}>
              <LikeOutlined className="__ text-yellow-500" />
            </div>
          </MVCol>
          <MVCol>
            <AuthHeader
              user={user}
              isLoggedInState={isLoggedInState}
              Auth={Auth}
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
                lineHeight: "30px",
              }}
            />
          </MVCol>
        </MVRow>
        <Drawer
          width={200}
          title="Drawer"
          key={placement}
          placement={"left"}
          closable={false}
          onClose={onClose}
          open={open}
          closeIcon={true}
          className="relative z-10"
        >
          <MVMenuItem
            icons={icon}
            id={false}
            background={"#fff"}
            data={routerLoggedIn}
          />
        </Drawer>
      </div>
    </React.Fragment>
  );
};
export default Header;
