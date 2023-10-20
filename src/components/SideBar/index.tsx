import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeContext, MyContext } from "../../context";
import {
  DivStyled,
  DivStyledRouter,
  DivStyledSearchBarStyle,
  DivStyledTitle,
  DivstySideBar,
  DivstyledContent,
  RouterIcon,
  RouterLink,
  RouterText,
  SibarImage,
  SideBarText,
  Text,
  Title,
} from "./styles";
import { Spiner } from "../Message/Notification";
import { Icons } from "../../constant";
import MVLink from "../Location/Link";
const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(MyContext) || {};
  const { state } = useContext(ChangeContext) || {};
  const sidebarWidth = state ? "w-1/12" : "w-2/12";
  return (
    <DivstySideBar className={sidebarWidth}>
      <DivstyledContent className={sidebarWidth}>
        <DivStyledTitle justify={state ? "center" : "start"}>
          <MVLink
            to={"/"}
            style={{
              display: "block",
              width: "50px",
            }}
          >
            <SibarImage src="/img/zyro-image.png" />
          </MVLink>
          <SideBarText className={state ? "hiddenn" : "block text-white"}>
            <MVLink to={"/"}>
              <Title>Hhtrungquoc.tv</Title>
            </MVLink>
            <MVLink to={"/"}>
              <Text>tromphim.netify.app</Text>
            </MVLink>
          </SideBarText>
        </DivStyledTitle>
        <DivStyled>
          {state ? (
            <SearchOutlined
              className="w-full justify-center"
              style={{
                textAlign: "center",
                padding: "10px 15px",
                margin: "25px 0 0 0",
              }}
            />
          ) : (
            <DivStyledSearchBarStyle placeholder="Search..." />
          )}
          {!loadingSeri ? (
            <RouterLink className="sideBarActive">
              {seri &&
                seri.map((item: any, index: any) => (
                  <NavLink
                    to={
                      item.path == "/"
                        ? item.path
                        : item.path + "/" + `${item._id}`
                    }
                    key={index}
                  >
                    <DivStyledRouter state={state}>
                      <RouterIcon>{Icons[index]}</RouterIcon>
                      <RouterText className={state ? "hiddenn" : "block"}>
                        {item.name}
                      </RouterText>
                    </DivStyledRouter>
                  </NavLink>
                ))}
            </RouterLink>
          ) : (
            <Spiner
              size="large"
              children={undefined}
            />
          )}
        </DivStyled>
      </DivstyledContent>
    </DivstySideBar>
  );
};

export default SideBar;
