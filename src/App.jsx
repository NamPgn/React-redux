import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LayoutWebsite from './page/layout/LayoutWebsite';
import LayoutAdmin from './page/layout/LayoutAdmin';
import Signup from './page/Sign-up';
import "./index.css";
import Signin from './page/Sign-in';
import PrivateRouter from './components/PrivateRouter';
import Logout from './page/logout';
import HomePage from './page/HomePage';
import DataProduct from './page/Admin/product/DataProduct';
import AuthComponent from './components/AuthComponent';

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
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/auth' element={<AuthComponent/>}>
          <Route path='signup' element={
            <Signup />
          }></Route>
          <Route path='signin' element={
            <Signin />
          }></Route>
          <Route path='profile' element={
            <Suspense fallback={"Loading...."}>
              <ProfilePage />
            </Suspense>
          }></Route>
        </Route>
        <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<HomePage />}></Route>
          <Route path='product' element={
            <Suspense fallback={"Loading...."}>
              <ProductPage />
            </Suspense>
          }></Route>
          <Route path='detail/:id' element={
            <Suspense fallback={"Loading...."}>
              <DetailProductPage />
            </Suspense>
          }></Route>
          <Route path='logout' element={<Logout />}></Route>
          <Route path='product/category/:id' element={
            <Suspense fallback={"Loading...."}>
              <CategoryProduct />
            </Suspense>
          }></Route>
        </Route>
        <Route path='/admin' element={<PrivateRouter> <LayoutAdmin /> </PrivateRouter>}>
          <Route index element={
            <Suspense fallback={"Loading...."}>
              <AdminPage />
            </Suspense>
          }></Route>
          <Route path='products' element={
            <Suspense fallback={"Loading...."}>
              <DataProduct />
            </Suspense>
          }></Route>
          <Route path='users' element={
            <Suspense fallback={"Loading...."}>
              <GetUser />
            </Suspense>
          }></Route>
          <Route path='adminUer' element={
            <Suspense fallback={"Loading...."}>
              <GetAdmin />
            </Suspense>
          }></Route>
          <Route path='users/:id/edit' element={
            <Suspense fallback={"Loading...."}>
              <EditUser />
            </Suspense>
          }></Route>
          <Route path='user/add' element={
            <Suspense fallback={"Loading...."}>
              <Adduser />
            </Suspense>
          }></Route>
          <Route path='user/creatingUser' element={
            <Suspense fallback={"Loading...."}>
              <CreatingUser />
            </Suspense>
          }></Route>
          <Route path='product/add' element={
            <Suspense fallback={"Loading...."}>
              <ProductAdd />
            </Suspense>
          }></Route>
          <Route path='product/edit/:id' element={
            <Suspense fallback={"Loading...."}>
              <EditProduct />
            </Suspense>
          }></Route>
          <Route path='product/creacting' element={
            <Suspense fallback={"Loading...."}>
              <CreatingProducts />
            </Suspense>
          }></Route>
          <Route path='category' element={
            <Suspense fallback={"Loading...."}>
              <CategoryAdmin />
            </Suspense>
          }></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
