import React from 'react'
import { Menu } from "antd";
import { Link } from 'react-router-dom';
const MenuItem = ({ data, icons, ...rest }) => {
  return (
    <Menu className='h-full'>
      {data.map((item, index) => (
        <Menu.Item
          {...rest}
          icon={item.icon ? item.icon : icons[index]}
          key={index}
        >
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default MenuItem