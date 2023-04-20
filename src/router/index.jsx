import React from 'react';
import AuthComponent from '../components/OptionsAuth/AuthComponent';
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

} from "@ant-design/icons";
//type component

const ListType=React.lazy(() => import('../page/Type/TypesMovie/ListProduct'));
const OllMovie=React.lazy(() => import('./page/Type/SidebarContent'));
const TypesMovie=React.lazy(() => import('../page/Type/TypesMovie'));

const SearchResults = React.lazy(() => import('../components/Search/SearchResults')); //search
const AdminPage = React.lazy(() => import('../page/Admin/AdminPage')); //admin
const ProfilePage = React.lazy(() => import('../page/Auth-Page/Profile')); //profile
const Signin = React.lazy(() => import('../page/Auth-Page/Sign-in')); //signin
const Signup = React.lazy(() => import('../page/Auth-Page/Sign-up')); //signup
const DetailProductPage = React.lazy(() => import('../page/Home/Libs/DetailProduct')); //chi tiết
const CategoryProduct = React.lazy(() => import('../page/Home/Libs/CategoryPage')); //danh mục
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
const EditCategoryAdmin = React.lazy(() => import('../page/Admin/category/EditCategory'));
const PostAdmin = React.lazy(() => import('../page/Admin/posts/PostAdmin'));
const Index = React.lazy(() => import('../page/Admin/trailer/Index'));
const EditTrailerUrl = React.lazy(() => import('../page/Admin/trailer/EditTrailerUrl'));
const CommentAdmin = React.lazy(() => import('../page/Admin/comment/CommentAdmin'));
const CartUser = React.lazy(() => import('../components/Cart/CartUser'));
const CartAdmin = React.lazy(() => import('../page/Admin/Cart/CartAdmin'));
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
    Path: "",
    component: <HomePage />,
    indexPath: true
  },

  {
    Path: "d/:id",
    component: <DetailProductPage />,
  },

  {
    Path: "logout",
    component: <Logout />,
  },

  {
    Path: "q/:id",
    component: <CategoryProduct />,
  },

  {
    Path: '/search/category',
    name: <SearchResults />
  },

  {
    Path: "/cart/user",
    component: <CartUser />,
  },

  {
    Path: "/types/:id",
    component: <TypesMovie />,
  },
  {
    Path: "/odd/:id",
    component: <OllMovie />,
  },
  {
    Path: "/types/h/:id",
    component: <ListType />,
  }
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
  },
  {
    Path: "category/edit/:id",
    component: <EditCategoryAdmin />
  },
  {
    Path: "posts",
    component: <PostAdmin />
  },
  {
    Path: "trailing",
    component: <Index />,
  },
  {
    Path: "/admin/trailerUrl/:id",
    component: <EditTrailerUrl />,
  },
  {
    Path: "/admin/comments",
    component: <CommentAdmin />,
  },
  {
    Path: "cart",
    component: <CartAdmin />,
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
    Path: "/admin/posts",
    name: "Posts",
    iconComponent: <StarOutlined />
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
  }
];


