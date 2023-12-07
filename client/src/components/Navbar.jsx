import {FaSistrix,FaCartShopping,FaCircleUser,FaHeart} from "react-icons/fa6"
import {  useSelector } from "react-redux"
import { Link, useSearchParams} from "react-router-dom"
import { AiOutlineAppstore  } from "react-icons/ai";
import { useContext } from "react";
import { productsContext } from "../context/productContext";

const Navbar = () => {
const {currentUser}=useSelector((state)=>state.user)
const {products}=useSelector((state)=>state.cart)
const {searchQuery,setSearchQuery}=useContext(productsContext)


const handleSubmit=(e)=>{
 e.preventDefault()
}

  return (
    <>   
        {currentUser && currentUser.isAdmin === true ? (
        <div className="flex items-center py-2.5 justify-between border px-6 shadow-md">
        <Link to={'/'}> <img className="md:w-20 w-12" src="https://skybuybd.com/_next/static/media/logo.2d8160b9.svg" alt="" /></Link>    
        <div className="flex items-center gap-3">
            <Link to={'/admin/products'} className="font-bold"><AiOutlineAppstore  className="text-2xl"/></Link>
            <Link to={'/profile'}>
            <img className="w-8 h-8 rounded-full shadow-sm object-cover" title="profile" src={currentUser.avatar}  alt="avatar" />
            </Link>
        </div>
        </div>):(
          <>
          <header className="flex  max-md:flex-col  justify-between md:items-center py-4 px-8  shadow-md border-b-2">
          <div className="flex justify-between items-center">
          <Link to={'/'}> <img className="w-24" src="https://skybuybd.com/_next/static/media/logo.2d8160b9.svg" alt="" /></Link>    
          
          <ul className="flex items-center gap-4 md:hidden">
          <li title="Cart" className=" relative">
          <a href="#"><FaCartShopping className="text-xl"/> <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[8px] font-semibold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">20</div></a>
          </li>

          <li title="WhishList">
          <a href="#"><FaHeart className="text-xl"/></a>
          </li>
            {currentUser && currentUser ? (
            <div className="flex items-center">
            <Link to={'/profile'}>
            <img className="md:w-8 md:h-8 w-6 h-6 rounded-full shadow-sm object-cover" title="profile" src={currentUser.avatar}  alt="avatar" />
            </Link>
            </div>
            ):(
            <li title="Sign in">
            <Link to={'/login'}>
            <FaCircleUser className="text-xl"/>
            </Link>
            </li>
          )}  
          </ul>
          
          </div>

          <form className="border max-md:my-2 shadow-sm flex items-center justify-between rounded-md " onSubmit={handleSubmit}>
          <input onChange={(e)=>{setSearchQuery(e.target.value)}}  type="search" placeholder="Search products" className="px-3  outline-none py-1.5 md:w-[20rem] w-full rounded-md"/>
          <button type="submit"><FaSistrix className="inline-block text-gray-700 text-xl w-10 "/></button>
          </form>

          <ul className="flex md:gap-4 items-center max-md:hidden">
          <li title="Cart" className=" relative">
          <Link to={'/cart'}><FaCartShopping className="text-2xl mx-3"/>{currentUser===null?"" : products.length === 0 ?"":<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{products.length}</div> }</Link>
          </li>

          <li title="WhishList">
          <a href="#"><FaHeart className="text-2xl mx-3"/></a>
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
            <FaCircleUser className="text-2xl mx-3"/>
            </Link>
            </li>
          )}           
        </ul>

       </header> 
      </>
        )
        }    
    </>
  )
}

export default Navbar


  {/* mobile navbar */}

        {/* <div className="md:hidden py-2 bg-white shadow-md border  w-full bottom-0 fixed  flex justify-center items-center rounded-md">
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
       </div> */}