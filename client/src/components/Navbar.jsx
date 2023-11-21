import {FaSistrix,FaCartShopping,FaCircleUser,FaHeart,FaHouseChimney , FaBars } from "react-icons/fa6"
import {  useSelector } from "react-redux"
import { Link, } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
const {currentUser}=useSelector((state)=>state.user)

  return (
    <>
     <header className="flex max-md:flex-col  justify-between items-center py-4 px-8 bg-[--primary] shadow-md">
     <Link to={'/'}> <img className="md:w-24 w-12" src="https://skybuybd.com/_next/static/media/logo.2d8160b9.svg" alt="" /></Link>
      <form className="border max-md:my-2 bg-[--secondary] flex items-center justify-between rounded-md ">
          <input type="search" placeholder="Search products" className="px-3 bg-[--secondary] outline-none py-1.5 md:w-[20rem] rounded-md"/>
          <button><FaSistrix className="inline-block text-gray-700 text-xl w-10"/></button>
      </form>
        <ul className="flex md:gap-4 items-center max-md:hidden">
          <li title="Cart">
          <a href="#"><FaCartShopping className="text-2xl  text-[--secondary] mx-3"/></a>
          </li>

          <li title="WhishList">
          <a href="#"><FaHeart className="text-2xl  text-[--secondary] mx-3"/></a>
          </li>
            
          {currentUser && currentUser ? (
            <div className="flex items-center">
            <Link to={'/profile'}>
            <img className="w-8 h-8 rounded-full shadow-sm object-cover" title="profile" src={currentUser.avatar}  alt="avatar" />
            </Link>
            </div>
            ):(
            <li title="Sign in">
            <Link to={'/login'}>
            <FaCircleUser className="text-2xl text-[--secondary] mx-3"/>
            </Link>
            </li>
          )}           
        </ul>
     
       </header> 


       {/* mobile navbar */}

       <div className="md:hidden py-2 bg-white shadow-md border  w-full bottom-0 fixed  flex justify-center items-center rounded-md">
       <ul className="flex items-center justify-center px-5 gap-2">
        
          <li title="Category">
          <a href="#"><FaBars  className="text-2xl  text-[--primary] mx-3"/></a>
          </li>

          <li title="Cart">
          <a href="#"><FaCartShopping className="text-2xl  text-[--primary] mx-3"/></a>
          </li>

          <li className="border-2  rounded-full border-[--primary] py-3 bg-[--primary] shadow-md" title="home">
          <Link to={'/'}><FaHouseChimney className="text-xl  text-white mx-3 "/></Link>
          </li>

          <li title="WhishList">
          <a href="#"><FaHeart className="text-2xl  text-[--primary] mx-3"/></a>
          </li>
            
          {currentUser && currentUser ? (
            <div className="flex items-center">
            <Link to={'/profile'}>
            <img className="w-8 h-8 rounded-full border shadow-sm border-slate-300 object-cover" title="profile" src={currentUser.avatar}  alt="avatar" />
            </Link>
            </div>
            ):(
            <li title="Sign in">
            <Link to={'/login'}>
            <FaCircleUser className="text-2xl text-[--primary] mx-3"/>
            </Link>
            </li>
          )}           
        </ul>
       </div>
    </>
  )
}

export default Navbar
