import React from 'react';

const ProductPage = React.lazy(() => import('./page/Product'));
const ProfilePage = React.lazy(() => import('./page/Profile'));
const DetailProductPage = React.lazy(() => import('./page/DetailProduct'));
const CategoryProduct = React.lazy(() => import('./page/CategoryProduct'));
const ProductAdmin = React.lazy(() => import('./page/Admin/product/ProductAdmin'));
const GetUser = React.lazy(() => import('./page/Admin/user/getUser'));
const Adduser = React.lazy(() => import('./page/Admin/user/Adduser'));
const EditUser = React.lazy(() => import('./page/Admin/user/EditUser'));
const GetAdmin = React.lazy(() => import('./page/Admin/user/GetAdmin'));
const ProductAdd = React.lazy(() => import('./page/Admin/product/ProductAdd'));
const EditProduct = React.lazy(() => import('./page/Admin/product/EditProduct'));
const CreatingUser = React.lazy(() => import('./page/Admin/user/CreatingUser'));
const CreatingProducts = React.lazy(() => import('./page/Admin/product/CreatingProducts'));
const CategoryAdmin = React.lazy(() => import('./page/Admin/category/CategoryAdmin'));
const AdminPage = React.lazy(() => import('./page/Admin/AdminPage'));

export const router = [
  {
    Path:'/admin',
    Component:AdminPage
  }
]