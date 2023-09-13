import { AreaChartOutlined, BarChartOutlined, BlockOutlined, FundOutlined, HomeOutlined, RiseOutlined } from '@ant-design/icons';
import React from 'react';
import type { ColumnsType } from 'antd/es/table';

const backgrounds = [
  {
    background: "#101010",
  },
  {
    background: "#dbc100"
  },
  {
    background: "#3040b3"
  },
  {
    background: "#1dc3ed"
  },
  {
    background: "#101010"
  },
  {
    background: "#368c27"
  },
  {
    background: "#d11b1b"
  },
  {
    background: "#101010"
  },
  {
    background: "#101010"
  }
]

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
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'ProductName',
    dataIndex: 'ProductName',
    key: 'ProductName',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'Image',
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }
];

const columnsBackground = [
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const columnsType = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Categorymain',
    dataIndex: 'categorymain',
    key: 'categorymain',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: 'Checked',
    dataIndex: 'checked',
    key: 'checked',
  },
];

const columnsCategory = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'Image',
  },
  {
    title: 'CreateAt',
    dataIndex: 'createAt',
    key: 'createAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',

  }
];

const columnsComment = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'Image',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  }
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: 'Sidebar',
    key: 'sidebar',
    dataIndex: 'sidebar',
    width: 100,
  },
  {
    title: 'Seri',
    key: 'Seri',
    dataIndex: 'Seri',
    width: 100,
  },
  {
    title: 'Copyright',
    key: 'copyright',
    dataIndex: 'copyright',
    width: 100,
  },
  {
    title: 'Trailer',
    dataIndex: 'trailer',
    key: 'trailer',
    width: 100,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    width: 100,
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: 100,
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
  },
];


const columnsTrailer = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Url',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const columnsCatemainProduct = [
  {
    title: 'Stt',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const columnsGetAdmin = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  }
];

const columnsUser = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    with: 150
  }
];


const columnsWeeks = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];
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
  columnsWeeks
}