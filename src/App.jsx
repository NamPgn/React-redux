import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LayoutWebsite from './page/layout/LayoutWebsite';
import LayoutAdmin from './page/layout/LayoutAdmin';
import "./index.css";
import PrivateRouter from './components/PrivateRouter';
import { Loading } from './components/Loading';
import { RoutersAdminUser, RouterLayoutWebsite, AuthComponents } from './router';
import Page404 from './components/Page404';
function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {
          AuthComponents.map((item, index) => {
            const data = item.chidrent.map((item, index) =>
              <Route key={index} path={item.Path} element={
                <Suspense fallback={<Loading />}>
                  {item.component}
                </Suspense>
              } >
              </Route>
            );
            return <Route key={index} path={item.Path} element={item.component} children={data} />
          })
        }
        <Route path='/' element={<LayoutWebsite />}>
          {
            RouterLayoutWebsite.map((router, index) =>
              <Route index={router.indexPath ? router.indexPath : ""} key={index} path={router.Path} element={
                <Suspense fallback={<Loading />}>
                  {router.component}
                </Suspense>
              }></Route>
            )
          }
        </Route>
        <Route path='/admin' element={<PrivateRouter> <LayoutAdmin /> </PrivateRouter>}>
          {
            RoutersAdminUser.map((router, index) =>
              <Route index={router.indexPath ? router.indexPath : ""} key={index} path={router.Path} element={
                <Suspense fallback={<Loading />}>
                  {router.component}
                </Suspense>
              }></Route>
            )
          }
        </Route>
        <Route path='*' element={<Page404 />}></Route>
      </Routes>
    </div>
  )
}

export default App
