import { Link, Route, Routes } from 'react-router-dom'
import LayoutWebsite from './page/layout/LayoutWebsite'
import LayoutAdmin from './page/layout/LayoutAdmin'
import Signup from './page/Sign-up'
import ProductAdmin from './page/Admin/ProductAdmin'
import Product from './page/Product'
import "./index.css"
import Signin from './page/Sign-in'
import PrivateRouter from './components/PrivateRouter'
import Profile from './page/Profile'
import Logout from './page/logout'
import GetUser from './page/Admin/getUser'
import Adduser from './page/Admin/Adduser'
import EditUser from './page/Admin/Edituser'
import GetAdmin from './page/Admin/getAdmin';
import PrivateProfile from './components/PrivateProfile'
import HomePage from './page/HomePage'
import DetailProduct from './page/DetailProduct'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<HomePage />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='product' element={<Product />}></Route>
          <Route path='detail/:id' element={<DetailProduct />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='signin' element={<Signin />}></Route>
          <Route path='logout' element={<Logout />}></Route>
        </Route>
        <Route path='/admin' element={<PrivateRouter> <LayoutAdmin /> </PrivateRouter>}>
          <Route path='products' element={<ProductAdmin />}></Route>
          <Route path='users' element={<GetUser />}></Route>
          <Route path='adminUer' element={<GetAdmin />}></Route>
          <Route path='users/:id/edit' element={<EditUser />}></Route>
          <Route path='user/add' element={<Adduser />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
