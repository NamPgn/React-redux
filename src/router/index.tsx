import React, { lazy } from 'react';
import HomePage from '../page/Home/Container/HomePage';
import Logout from '../page/Auth-Page/Logout';
import {
  DashboardOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  ControlOutlined,
  StarOutlined,
  CompassOutlined,
  CarryOutOutlined,
  PicRightOutlined,
} from "@ant-design/icons";
const AuthComponent = lazy(() => import('../page/Layout/AuthLayout'));

import CatemainProduct from '../page/Admin/TypesCategory/CatemainProduct';
import DetailProductPage from '../page/Home/Libs/DetailProduct';
import CategoryProduct from '../page/Home/Libs/CategoryPage'; //danh mục
//type component
const ListType = lazy(() => import('../page/Type/Theloai'));
const OllMovie = lazy(() => import('../page/Type/SidebarData'));
const SearchResults = lazy(() => import('../components/Search/SearchResults')); //search

//AUTH
const ProfilePage = lazy(() => import('../page/Auth-Page/Profile')); //profile
const Signin = lazy(() => import('../page/Auth-Page/Sign-in')); //signin
const Signup = lazy(() => import('../page/Auth-Page/Sign-up')); //signup


//router admin
const AdminPage = lazy(() => import('../page/Admin')); //admin
const DataProduct = lazy(() => import('../page/Admin/product/DataProduct'));
const GetUser = lazy(() => import('../page/Admin/user/getUser'));
const Adduser = lazy(() => import('../page/Admin/user/Adduser'));
const EditUser = lazy(() => import('../page/Admin/user/EditUser'));
const GetAdmin = lazy(() => import('../page/Admin/user/GetAdmin'));
const ProductAdd = lazy(() => import('../page/Admin/product/ProductAdd'));
const EditProduct = lazy(() => import('../page/Admin/product/EditProduct'));
const CreatingUser = lazy(() => import('../page/Admin/user/CreatingUser'));
const CreatingProducts = lazy(() => import('../page/Admin/product/CreatingProducts'));
const CategoryAdmin = lazy(() => import('../page/Admin/category/CategoryAdmin'));
const EditCategoryAdmin = lazy(() => import('../page/Admin/category/EditCategory'));
const Trailer = lazy(() => import('../page/Admin/trailer'));
const EditTrailerUrl = lazy(() => import('../page/Admin/trailer/EditTrailerUrl'));
const CommentAdmin = lazy(() => import('../page/Admin/comment/CommentAdmin'));
const CartUser = lazy(() => import('../components/Cart/CartUser'));
const CartAdmin = lazy(() => import('../page/Admin/Cart/CartAdmin'));
const TypesCateAdmin = lazy(() => import('../page/Admin/TypesCategory'));

const Loadmore = lazy(() => import('../page/Home/Loadmore'));

export const routerNavBar = [
  {
    Path: '/',
    name: "Trang chủ"
  },
  // {
  //   Path: '/postList',
  //   name: "Post"
  // },
  {
    Path: '/auth/signin',
    name: "Đăng nhập"
  },
  {
    Path: '/auth/signup',
    name: "Đăng kí"
  },
  {
    Path: '/auth/profile',
    name: "Hồ sơ"
  },
]

export const RouterLayoutWebsite = [
  {
    path: '/',
    element: <HomePage />,
    index: true
  },

  {
    path: "d/:id",
    element: <DetailProductPage />,
  },

  {
    path: "logout",
    element: <Logout />,
  },

  {
    path: "q/:id",
    element: <CategoryProduct />
  },

  {
    path: 'search/category',
    element: <SearchResults />
  },

  {
    path: "cart/user",
    element: <CartUser />,
  },

  {
    path: "movie-content/:id",
    element: <OllMovie />,
  },

  {
    path: "types/h/:id",
    element: <ListType />
  },
  {
    path: "loadmore",
    element: <Loadmore />
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

export const RoutersAdminUser = [
  {
    path: "",
    element: <AdminPage />,
    index: true
  },
  {
    path: "products",
    element: <DataProduct />,
  },
  {
    path: "users",
    element: <GetUser />,
  },
  {
    path: "adminUer",
    element: <GetAdmin />,
  },
  {
    path: "users/:id/edit",
    element: <EditUser />,
  },
  {
    path: "user/add",
    element: <Adduser />,
  },
  {
    path: "user/creatingUser",
    element: <CreatingUser />,
  },
  {
    path: "product/add",
    element: <ProductAdd />,
  },
  {
    path: "product/edit/:id",
    element: <EditProduct />,
  },
  {
    path: "product/creacting",
    element: <CreatingProducts />,
  },
  {
    path: "category",
    element: <CategoryAdmin />,
  },
  {
    path: "category/edit/:id",
    element: <EditCategoryAdmin />
  },
  {
    path: "trailing",
    element: <Trailer />,
  },
  {
    path: "/admin/trailerUrl/:id",
    element: <EditTrailerUrl />,
  },
  {
    path: "/admin/comments",
    element: <CommentAdmin />,
  },
  {
    path: "cart",
    element: <CartAdmin />,
  },
  {
    path: "types",
    element: <TypesCateAdmin />,
  },
  {
    path: "/admin/types/CateMainProduct/:id",
    element: <CatemainProduct />
  },
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
    Path: "/admin/trailing",
    name: "Trailer",
    iconComponent: <LaptopOutlined />
  },
  {
    Path: "/admin/comments",
    name: "Comments",
    iconComponent: <CarryOutOutlined />
  },
  {
    Path: "/admin/cart",
    name: "Cart",
    iconComponent: <CompassOutlined />
  },
  {
    Path: "/admin/types",
    name: "Types",
    iconComponent: <PicRightOutlined />
  },
];


