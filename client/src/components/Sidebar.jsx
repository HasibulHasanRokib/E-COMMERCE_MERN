import { Link } from "react-router-dom"
import { FaHouseUser  } from "react-icons/fa6";
import { AiFillPlusCircle,AiFillShopping  } from "react-icons/ai";

const Sidebar = () => {
  return (
    <>
    <section className=" w-1/5 my-3 rounded-lg md:min-h-[85vh] h-auto border-2 shadow-sm">
    <h3 className="font-bold py-3 text-center text-[--primary] text-xl max-md:text-xs">Admin Dashboard</h3>
        <ul className="flex flex-col mt-5">
           <li className=" text-md border hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg hover:mx-2"><Link className="flex items-center gap-2" to={'/admin/users'}><FaHouseUser className=" text-3xl" /><samp className="max-md:hidden"> Users</samp></Link></li>          
           <li className=" text-md border hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg hover:mx-2"><Link className="flex items-center gap-2" to={'/admin/products'}><AiFillShopping className=" text-3xl"/><samp className="max-md:hidden"> Products</samp></Link></li>          
           <li className=" text-md border hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg hover:mx-2"><Link className="flex items-center gap-2" to={'/admin/add-product'}><AiFillPlusCircle className=" text-3xl"/><samp className="max-md:hidden"> Add Product</samp></Link></li>          
                         
                   
        </ul>
    </section>
    </>
  )
}

export default Sidebar
