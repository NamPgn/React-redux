import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  DivStyledRouter,
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
import ContactAdmin from "../Contact";
import { ApiContext } from "../../context/api";
import { MyContext } from "../../context";
const SideBar = () => {
  const { seri, loadingSeri }: any = useContext(ApiContext) || {};
  const { state }: any = useContext(MyContext) || {};
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
        <div className="mt-[50px]">
          {!loadingSeri ? (
            <RouterLink className="sideBarActive">
              {seri &&
                seri.map((item: any, index: any) => (
                  <NavLink
                    title={item.name}
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
            <Spiner size="large" children={undefined} />
          )}
        </div>
        <ContactAdmin />
      </DivstyledContent>
    </DivstySideBar>
  );
};

export default SideBar;
