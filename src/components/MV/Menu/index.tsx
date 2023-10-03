import React, { memo } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import MVLink from "../../Location/Link";
const MVMenuItem = memo(({ data, icons, id, background, ...rest }: any) => {
  return (
    <Menu
      className="h-full"
      style={{
        background: background,
      }}
    >
      {data &&
        data.map((item, index) => (
          <Menu.Item
            {...rest}
            icon={item.icon ? item.icon : icons[index]}
            key={index}
          >
            {id == true ? (
              <NavLink
                to={
                  item.path == "/" ? item.path : item.path + "/" + `${item._id}`
                }
                key={index}
              >
                {item.name}
              </NavLink>
            ) : (
              <MVLink to={item.path}>{item.name}</MVLink>
            )}
          </Menu.Item>
        ))}
    </Menu>
  );
});

export default MVMenuItem;
