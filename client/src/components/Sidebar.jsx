import { Link } from "react-router-dom"
import {BsFillImageFill , BsBagPlusFill, BsBagFill,BsCartPlusFill,BsPersonLinesFill } from "react-icons/bs";
const Sidebar = () => {
  return (
    <>
    <section className="my-3 rounded-lg h-auto border-2 shadow-sm max-md:hidden">
        <ul className="flex flex-col ">
           <li className=" text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg m-2"><Link className="flex items-center gap-2" to={'/admin/products'}><BsBagFill className=" text-2xl"/><samp > Products</samp></Link></li>          
           <li className="m-2 text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg"><Link className="flex  items-center gap-2" to={'/admin/create-category'}><BsCartPlusFill className=" text-2xl"/><samp> Create Category</samp></Link></li>          
           <li className="m-2 text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg"><Link className="flex  items-center gap-2" to={'/admin/create-product'}><BsBagPlusFill className=" text-2xl"/><samp> Add Product</samp></Link></li>                            
           <li className="m-2 text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg"><Link className="flex max-md:flex-col items-center gap-2" to={'/admin/users'}><BsPersonLinesFill className=" text-2xl" /><samp> Users</samp></Link></li>          
           <li className="m-2 text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 shadow-sm font-semibold hover:rounded-lg"><Link className="flex max-md:flex-col items-center gap-2" to={'/admin/add-banner'}><BsFillImageFill  className=" text-2xl" /><samp> Add Banner</samp></Link></li>          
        </ul>
    </section>
    <section className="rounded-lg flex justify-center items-center shadow-md border bg-white h-16 absolute w-full bottom-0 z-50 md:hidden">
        <ul className="flex items-center gap-5">
           <li title="Products"><Link to={'/admin/products'}><BsBagFill className=" text-2xl"/></Link></li>          
           <li title="Create Category"><Link to={'/admin/create-category'}><BsCartPlusFill className="text-2xl"/></Link></li>          
           <li title="Create Product"><Link to={'/admin/create-product'}><BsBagPlusFill className=" text-2xl"/></Link></li>                            
           <li title="Users"><Link to={'/admin/users'}><BsPersonLinesFill className=" text-2xl" /></Link></li>          
           <li title="Banner"><Link to={'/admin/add-banner'}><BsFillImageFill className=" text-2xl" /></Link></li>          
        </ul>
    </section>
    </>
  )
}

export default Sidebar
