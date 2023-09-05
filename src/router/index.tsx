import React, { lazy } from 'react';
import HomePage from '../page/Home/Container';
import Logout from '../page/Auth-Page/Logout';
import {
  DashboardOutlined,
  NotificationOutlined,
  UserOutlined,
  LaptopOutlined,
  ControlOutlined,
  CompassOutlined,
  CarryOutOutlined,
  PicRightOutlined,
  ClockCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import DetailProductPage from '../page/Home/Detail';
import CategoryProduct from '../page/Home/Category'; //danh mục
import AuthComponent from '../Layout/AuthLayout';
import LayoutAdmin from '../Layout/LayoutAdmin';
import PrivateRouter from '../components/Router-Security/PrivateRouter';
import LayoutWebsite from '../Layout/LayoutWebsite';
import Page404 from '../components/404/Page404';
import LazyComponent from '../components/Lazy/LazyComponent';
import CatemainProduct from '../page/Admin/typesCategory/component/CatemainProduct';
import Weeks from '../page/Admin/week';
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
const DataProduct = lazy(() => import('../page/Admin/product/component/list'));
const GetUser = lazy(() => import('../page/Admin/user'));
const Adduser = lazy(() => import('../page/Admin/user/component/Adduser'));
const EditUser = lazy(() => import('../page/Admin/user/component/EditUser'));
const GetAdmin = lazy(() => import('../page/Admin/user/component/GetAdmin'));
const ProductAdd = lazy(() => import('../page/Admin/product/component/add'));
const EditProduct = lazy(() => import('../page/Admin/product/component/edit'));
const CreatingUser = lazy(() => import('../page/Admin/user/component/CreatingUser'));
const CreatingProducts = lazy(() => import('../page/Admin/product/component/CreatingProducts'));
const CategoryAdmin = lazy(() => import('../page/Admin/category'));
const EditCategoryAdmin = lazy(() => import('../page/Admin/category/component/edit'));
const Trailer = lazy(() => import('../page/Admin/trailer'));
const EditTrailerUrl = lazy(() => import('../page/Admin/trailer/component/edit'));
const CommentAdmin = lazy(() => import('../page/Admin/comment'));
const CartUser = lazy(() => import('../components/Cart'));
const CartAdmin = lazy(() => import('../page/Admin/cart'));
const TypesCateAdmin = lazy(() => import('../page/Admin/typesCategory/'));
const Loadmore = lazy(() => import('../page/Home/Category/Loadmore'));

//background
const Background = lazy(() => import('../page/Admin/background'));
const EditBackground = lazy(() => import('../page/Admin/background/component/edit'));

export const routerNavBar = [
  {
    path: '/',
    name: "Trang chủ",
    title: "Trang chủ",
  },
  {
    path: '/auth/signin',
    name: "Đăng nhập",
    title: "Đăng nhập",
  },
  {
    path: '/auth/signup',
    name: "Đăng kí",
    title: "Đăng kí",
  },

]

export const loggedInRoutes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/auth/profile',
    name: "Hồ sơ",
    title: "Hồ sơ",
  },
];

export const router = [
  {
    path: '/',
    element: <LayoutWebsite />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      {
        path: "d/:id",
        element: <LazyComponent><DetailProductPage /></LazyComponent>,
      },

      {
        path: "logout",
        element: <LazyComponent><Logout /></LazyComponent>,
      },

      {
        path: "q/:id",
        element: <LazyComponent><CategoryProduct /></LazyComponent>
      },

      {
        path: 'search/category',
        element: <LazyComponent><SearchResults /></LazyComponent>
      },

      {
        path: "cart/user",
        element: <LazyComponent><CartUser /></LazyComponent>
      },

      {
        path: "movie-content/:id",
        element: <LazyComponent><OllMovie /></LazyComponent>,
      },

      {
        path: "types/h/:id",
        element: <LazyComponent><ListType /></LazyComponent>
      },
      {
        path: "loadmore",
        element: <LazyComponent><Loadmore /></LazyComponent>
      },
    ]
  },
  {
    path: "auth",
    element: <AuthComponent />,
    children: [
      {
        path: "signup",
        element: <LazyComponent><Signup /></LazyComponent>
      },
      {
        path: "signin",
        element: <LazyComponent><Signin /></LazyComponent>
      },
      {
        path: "profile",
        element: <LazyComponent><ProfilePage /></LazyComponent>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRouter><LayoutAdmin /></PrivateRouter>,
    children: [
      {
        path: "",
        element: <LazyComponent><AdminPage /></LazyComponent>,
        index: true
      },
      {
        path: "products",
        element: <LazyComponent><DataProduct /></LazyComponent>,
      },
      {
        path: "users",
        element: <LazyComponent><GetUser /></LazyComponent>,
      },
      {
        path: "adminUer",
        element: <LazyComponent><GetAdmin /></LazyComponent>,
      },
      {
        path: "users/:id/edit",
        element: <LazyComponent><EditUser /></LazyComponent>,
      },
      {
        path: "user/add",
        element: <LazyComponent><Adduser /></LazyComponent>,
      },
      {
        path: "user/creatingUser",
        element: <LazyComponent><CreatingUser /></LazyComponent>,
      },
      {
        path: "product/add",
        element: <LazyComponent><ProductAdd /></LazyComponent>,
      },
      {
        path: "product/edit/:id",
        element: <LazyComponent><EditProduct /></LazyComponent>,
      },
      {
        path: "product/creacting",
        element: <LazyComponent><CreatingProducts /></LazyComponent>,
      },
      {
        path: "category",
        element: <LazyComponent><CategoryAdmin /></LazyComponent>,
      },
      {
        path: "category/edit/:id",
        element: <LazyComponent><EditCategoryAdmin /></LazyComponent>
      },
      {
        path: "trailing",
        element: <LazyComponent><Trailer /></LazyComponent>
      },
      {
        path: "trailerUrl/:id",
        element: <LazyComponent><EditTrailerUrl /></LazyComponent>,
      },
      {
        path: "comments",
        element: <LazyComponent><CommentAdmin /></LazyComponent>,
      },
      {
        path: "cart",
        element: <LazyComponent><CartAdmin /></LazyComponent>,
      },
      {
        path: "types",
        element: <LazyComponent><TypesCateAdmin /></LazyComponent>,
      },
      {
        path: "types/CateMainProduct/:id",
        element: <LazyComponent><CatemainProduct /></LazyComponent>
      },
      {
        path: "background",
        element: <LazyComponent><Background /></LazyComponent>
      },
      {
        path: "background/edit/:id",
        element: <LazyComponent><EditBackground /></LazyComponent>
      },
      {
        path: "weeks",
        element: <LazyComponent><Weeks /></LazyComponent>
      }
    ]
  },
  {
    path: "/*",
    element: <Page404 />
  }
];


export const TableRouterAdminPage = [
  {
    path: "/dashboard",
    name: "Thống kê",
    icon: <DashboardOutlined />
  },

  {
    path: "/dashboard/products",
    name: " Products",
    icon: <NotificationOutlined />
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: <UserOutlined />
  },
  {
    path: "/dashboard/adminUer",
    name: "Admin",
    icon: <LaptopOutlined />
  },
  {
    path: "/dashboard/category",
    name: "Category",
    icon: <ControlOutlined />
  },
  {
    path: "/dashboard/trailing",
    name: "Trailer",
    icon: <LaptopOutlined />
  },
  {
    path: "/dashboard/comments",
    name: "Comments",
    icon: <CarryOutOutlined />
  },
  {
    path: "/dashboard/cart",
    name: "Cart",
    icon: <CompassOutlined />
  },
  {
    path: "/dashboard/types",
    name: "Types",
    icon: <PicRightOutlined />
  },
  {
    path: "/dashboard/background",
    name: "Background",
    icon: <FormOutlined />
  },
  {
    path: "/dashboard/weeks",
    icon: <ClockCircleOutlined />,
    name: "Week",
  }
];
