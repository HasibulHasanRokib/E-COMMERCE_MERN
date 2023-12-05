import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Private from './components/Private'
import UpdateProfile from './pages/UpdateProfile'
import UpdatePassword from './pages/UpdatePassword'
import RestPassword from './pages/RestPassword'
import ForgotPassword from './pages/ForgotPassword'
import PrivateAdmin from './components/PrivateAdmin'
import AdminLayout from './components/AdminLayout'
import Users from './pages/Users'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'
import Product from './pages/Product'
import UpdateProduct from './pages/UpdateProduct'
import AddBanner from './pages/AddBanner'
import Footer from './components/Footer'
import AdminProducts from './pages/AdminProducts'
import Products from './pages/Products'
import ProductsLayout from './components/ProductsLayout'
import Cart from './pages/Cart'
import CategoryItems from './components/CategoryItems'



export const baseURL = 'http://localhost:3000'

const App = () => {

  const location = useLocation();

  const isFooterPage = () => {
    return location.pathname === '/';
  };


  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Private />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/update/:id' element={<UpdateProfile />} />
          <Route path='/update-password/:id' element={<UpdatePassword />} />
        </Route>

        <Route element={<PrivateAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin/products' element={<AdminProducts />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/create-category' element={<CreateCategory />} />
            <Route path='/admin/create-product' element={<CreateProduct />} />
            <Route path='/admin/update-product/:id' element={<UpdateProduct />} />
            <Route path='/admin/add-banner' element={<AddBanner />} />
          </Route>
        </Route>



        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<RestPassword />} />

        <Route element={<ProductsLayout />}>
          <Route path='/products' element={<Products />} />
        </Route>

        <Route path='/product/:slug' element={<Product />} />
        <Route path='/products/category/:category' element={<CategoryItems />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {isFooterPage() && <Footer />}
    </>
  )
}

export default App
