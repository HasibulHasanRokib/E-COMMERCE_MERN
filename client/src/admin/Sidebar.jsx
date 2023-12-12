import { Link } from "react-router-dom"
import {BsFillImageFill , BsBagPlusFill, BsBagFill,BsCartPlusFill,BsPersonLinesFill } from "react-icons/bs";
import { useState } from "react";
const Sidebar = () => {

const[selected,setSelected]=useState('products')

const handleClick=(item)=>{
setSelected(item)
}

  return (
    <>
    <section className="min-h-screen border-r-2">
        <ul className="flex flex-col gap-2  mt-4">
           <li className={`${selected==='products' ? 'bg-[--primary] text-white rounded-lg':null}text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4 `} onClick={()=>handleClick('products')}><Link className="flex items-center gap-2" to={'/admin/products'}><BsBagFill className=" text-2xl"/>Products</Link></li>          
           <li className={`${selected==='category' ? 'bg-[--primary] text-white rounded-lg':null}text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4`} onClick={()=>handleClick('category')}><Link className="flex  items-center gap-2" to={'/admin/create-category'}><BsCartPlusFill className=" text-2xl"/>Create Category</Link></li>          
           <li className={`${selected==='add-product' ? 'bg-[--primary] text-white rounded-lg':null}text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4`} onClick={()=>handleClick('add-product')}><Link className="flex  items-center gap-2" to={'/admin/create-product'}><BsBagPlusFill className=" text-2xl"/>Add Product</Link></li>                            
           <li className={`${selected==='customer' ? 'bg-[--primary] text-white rounded-lg':null}text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4`} onClick={()=>handleClick('customer')}><Link className="flex max-md:flex-col items-center gap-2" to={'/admin/users'}><BsPersonLinesFill className=" text-2xl" />Customer</Link></li>          
           <li className={`${selected==='banner' ? 'bg-[--primary] text-white rounded-lg':null}text-sm hover:bg-[--primary] hover:text-white py-1.5 px-4`} onClick={()=>handleClick('banner')}><Link className="flex max-md:flex-col items-center gap-2" to={'/admin/add-banner'}><BsFillImageFill  className=" text-2xl" />Banners</Link></li>          
        </ul>
    </section>
    </>
  )
}

export default Sidebar
