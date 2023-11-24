import { Route, Routes} from 'react-router-dom'
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
import AdminLayout from './pages/AdminLayout'
import AddProduct from './pages/AddProduct'
import Products from './pages/Products'
import Users from './pages/Users'



export const baseURL='http://localhost:3000'

const App = () => {


  return (
    <>
    <Navbar/>
    <Routes>
    <Route element={<Private/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/update/:id' element={<UpdateProfile/>}/>
    <Route path='/update-password/:id' element={<UpdatePassword/>}/>
    </Route>

    <Route element={<PrivateAdmin/>}>
     <Route  element={<AdminLayout/>}>
     <Route path='/admin/add-product' element={<AddProduct/>}/>
     <Route path='/admin/products' element={<Products/>}/>
     <Route path='/admin/users' element={<Users/>}/>
     </Route>
    </Route>

    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset-password/:token' element={<RestPassword/>}/>
    <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App
