import React from 'react';
import AuthComponent from '../components/AuthComponent';
import HomePage from '../page/HomePage';
import Logout from '../page/logout';
import {
  DashboardOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  ControlOutlined,
  StarOutlined
} from "@ant-design/icons";


const AdminPage = React.lazy(() => import('../page/Admin/AdminPage'));
const ProductPage = React.lazy(() => import('../page/PostList'));
const ProfilePage = React.lazy(() => import('../page/Profile'));
const Signin = React.lazy(() => import('../page/Sign-in'));
const Signup = React.lazy(() => import('../page/Sign-up'));
const DetailProductPage = React.lazy(() => import('../page/DetailProduct'));
const CategoryProduct = React.lazy(() => import('../page/CategoryProduct'));
const DataProduct = React.lazy(() => import('../page/Admin/product/DataProduct'));
const GetUser = React.lazy(() => import('../page/Admin/user/getUser'));
const Adduser = React.lazy(() => import('../page/Admin/user/Adduser'));
const EditUser = React.lazy(() => import('../page/Admin/user/EditUser'));
const GetAdmin = React.lazy(() => import('../page/Admin/user/GetAdmin'));
const ProductAdd = React.lazy(() => import('../page/Admin/product/ProductAdd'));
const EditProduct = React.lazy(() => import('../page/Admin/product/EditProduct'));
const CreatingUser = React.lazy(() => import('../page/Admin/user/CreatingUser'));
const CreatingProducts = React.lazy(() => import('../page/Admin/product/CreatingProducts'));
const CategoryAdmin = React.lazy(() => import('../page/Admin/category/CategoryAdmin'));
export const routerNavBar = [
  {
    Path: '/',
    name: "Home"
  },
  {
    Path: '/postList',
    name: "Post"
  },
  {
    Path: '/auth/signin',
    name: "Signin"
  },
  {
    Path: '/auth/signup',
    name: "Signup"
  },
  {
    Path: '/auth/profile',
    name: "Profile"
  },
]


export const RoutersAdminUser = [
  {
    Path: "",
    component: <AdminPage />,
    indexPath: true
  },
  {
    Path: "products",
    component: <DataProduct />,
  },
  {
    Path: "users",
    component: <GetUser />,
  },
  {
    Path: "adminUer",
    component: <GetAdmin />,
  },
  {
    Path: "users/:id/edit",
    component: <EditUser />,
  },
  {
    Path: "user/add",
    component: <Adduser />,
  },
  {
    Path: "user/creatingUser",
    component: <CreatingUser />,
  },
  {
    Path: "product/add",
    component: <ProductAdd />,
  },
  {
    Path: "product/edit/:id",
    component: <EditProduct />,
  },
  {
    Path: "product/creacting",
    component: <CreatingProducts />,
  },
  {
    Path: "category",
    component: <CategoryAdmin />,
  }
];


export const RouterLayoutWebsite = [
  {
    Path: "",
    component: <HomePage />,
    indexPath: true
  },
  {
    Path: "postList",
    component: <ProductPage />,
  },
  {
    Path: "detail/:id",
    component: <DetailProductPage />,
  },
  {
    Path: "logout",
    component: <Logout />,
  },
  {
    Path: "product/category/:id",
    component: <CategoryProduct />,
  },
];


export const AuthComponents = [
  {
    Path: "auth",
    component: <AuthComponent />,
    chidrent: [
      {
        Path: "signin",
        component: <Signin />
      },
      {
        Path: "signup",
        component: <Signup />
      },
      {
        Path: "profile",
        component: <ProfilePage />
      },
    ]
  }
];

export const TableRouterAdminPage = [
  {
    Path: "/admin",
    name: "Thống kê",
    iconComponent: <DashboardOutlined />
  },

  {
    Path: "/admin/products",
    name: " Products",
    iconComponent: <NotificationOutlined />
  },
  {
    Path: "/admin/users",
    name: "Users",
    iconComponent: <UserOutlined />
  },
  {
    Path: "/admin/adminUer",
    name: "Admin",
    iconComponent: <LaptopOutlined />
  },
  {
    Path: "/admin/category",
    name: "Category",
    iconComponent: <ControlOutlined />
  },
  {
    Path: "/admin/category",
    name: "Posts",
    iconComponent: <StarOutlined />
  },
]