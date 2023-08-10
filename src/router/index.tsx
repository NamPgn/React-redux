import React, { lazy } from 'react';
import HomePage from '../page/Home/Container/HomePage';
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
} from "@ant-design/icons";
import CatemainProduct from '../page/Admin/TypesCategory/CatemainProduct';
import DetailProductPage from '../page/Home/Libs/DetailProduct';
import CategoryProduct from '../page/Home/Libs/CategoryPage'; //danh mục
import AuthComponent from '../Layout/AuthLayout';
import LayoutAdmin from '../Layout/LayoutAdmin';
import PrivateRouter from '../components/Router-Security/PrivateRouter';
import LayoutWebsite from '../Layout/LayoutWebsite';
import Page404 from '../components/404/Page404';
import LazyComponent from '../components/Lazy/LazyComponent';
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
const GetUser = lazy(() => import('../page/Admin/user'));
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

//background
const Background = lazy(() => import('../page/Admin/background'));
const EditBackground = lazy(() => import('../page/Admin/background/edit'));
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
  {
    path: '/auth/profile',
    name: "Hồ sơ",
    title: "Hồ sơ",
  },
]

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
    path: 'admin',
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
    ]
  },
  {
    path: "/*",
    element: <Page404 />
  }
];


export const TableRouterAdminPage = [
  {
    path: "/admin",
    name: "Thống kê",
    icon: <DashboardOutlined />
  },

  {
    path: "/admin/products",
    name: " Products",
    icon: <NotificationOutlined />
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: <UserOutlined />
  },
  {
    path: "/admin/adminUer",
    name: "Admin",
    icon: <LaptopOutlined />
  },
  {
    path: "/admin/category",
    name: "Category",
    icon: <ControlOutlined />
  },
  {
    path: "/admin/trailing",
    name: "Trailer",
    icon: <LaptopOutlined />
  },
  {
    path: "/admin/comments",
    name: "Comments",
    icon: <CarryOutOutlined />
  },
  {
    path: "/admin/cart",
    name: "Cart",
    icon: <CompassOutlined />
  },
  {
    path: "/admin/types",
    name: "Types",
    icon: <PicRightOutlined />
  },
  {
    path: "/admin/background",
    name: "Background",
    icon: <PicRightOutlined />
  },
];


