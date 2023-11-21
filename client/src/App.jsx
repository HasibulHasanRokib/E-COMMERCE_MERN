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
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='*' element={<Error/>}/>
    </Routes>
    </>
  )
}

export default App
