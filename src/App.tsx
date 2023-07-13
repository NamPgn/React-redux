import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import PrivateRouter from './components/Router-Security/PrivateRouter';
import { Loading } from './components/Message/Loading';
import { AuthComponents, RouterLayoutWebsite, RoutersAdminUser } from './router';
import LayoutWebsite from './page/Layout/LayoutWebsite';
import LayoutAdmin from './page/Layout/LayoutAdmin';
import { GlobalStyle } from './components/Styled/Global';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import Page404 from './components/404/Page404';
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer />
      <Routes>
        {
          AuthComponents.map((item: any, index: string | number) => {
            const data = item.chidrent.map((item: any, index: string | number) =>
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
            RouterLayoutWebsite.map((router: any, index: any) =>
              <Route index={router.index ? router.index : ""}
                key={index}
                path={router.path}
                element={
                  <Suspense fallback={<Loading />}>
                    {router.element}
                  </Suspense>
                }
              ></Route>
            )
          }
        </Route>
        <Route path='/admin' element={<PrivateRouter> <LayoutAdmin /> </PrivateRouter>}>
          {
            RoutersAdminUser.map((router: any, index: any) =>
              <Route index={router.index ? router.index : ""} key={index} path={router.path} element={
                <Suspense fallback={<Loading />}>
                  {router.element}
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