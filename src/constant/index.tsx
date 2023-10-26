import {
  AreaChartOutlined,
  BarChartOutlined,
  BlockOutlined,
  FundOutlined,
  HomeOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import React from "react";
import type { ColumnsType } from "antd/es/table";

const backgrounds = [
  {
    background: "#101010",
  },
  {
    background: "#dbc100",
  },
  {
    background: "#3040b3",
  },
  {
    background: "#1dc3ed",
  },
  {
    background: "#101010",
  },
  {
    background: "#368c27",
  },
  {
    background: "#d11b1b",
  },
  {
    background: "#101010",
  },
  {
    background: "#101010",
  },
];

const Icons = [
  <HomeOutlined />,
  <BlockOutlined />,
  <AreaChartOutlined />,
  <RiseOutlined />,
  <BarChartOutlined />,
  <FundOutlined />,
];

const columsCart = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "ProductName",
    dataIndex: "ProductName",
    key: "ProductName",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "Image",
  },
  {
    title: "Permission",
    dataIndex: "permission",
    key: "permission",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsBackground = [
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsType = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Path",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Categorymain",
    dataIndex: "categorymain",
    key: "categorymain",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Checked",
    dataIndex: "checked",
    key: "checked",
  },
];

const columnsCategory = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "Image",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "isActive",
    dataIndex: "isActive",
    key: "isActive",
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
  },
  {
    title: "Set",
    dataIndex: "set",
    key: "set",
  },
  {
    title: "Week",
    dataIndex: "week",
    key: "week",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsComment = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "Image",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Permission",
    dataIndex: "permission",
    key: "permission",
  },
  {
    title: "Day",
    dataIndex: "day",
    key: "day",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsProduct: ColumnsType<any> = [
  // {
  //   title: "C",
  //   key: "all",
  //   dataIndex: 'all',
  //   width: 50,
  //   fixed: 'left',
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Sidebar",
    key: "sidebar",
    dataIndex: "sidebar",
    width: 100,
  },
  {
    title: "Seri",
    key: "Seri",
    dataIndex: "Seri",
    width: 100,
  },
  {
    title: "Copyright",
    key: "copyright",
    dataIndex: "copyright",
    width: 100,
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    width: 90,
  },
  {
    title: "Trailer",
    dataIndex: "trailer",
    key: "trailer",
    width: 100,
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
    width: 100,
  },
  {
    title: "Year",
    dataIndex: "year",
    key: "year",
    width: 100,
  },
  {
    title: "Options",
    dataIndex: "options",
    key: "options",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    width: 120,
    fixed: "right",
  },
];

const columnsTrailer = [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsCatemainProduct = [
  {
    title: "Stt",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const columnsGetAdmin = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
];

const columnsUser = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    with: 150,
  },
];

const columnsWeeks = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];
export const settingsSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  pauseOnHover: true,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
export {
  backgrounds,
  Icons,
  columsCart,
  columnsBackground,
  columnsType,
  columnsComment,
  columnsCategory,
  columnsProduct,
  columnsTrailer,
  columnsCatemainProduct,
  columnsGetAdmin,
  columnsUser,
  columnsWeeks,
};
