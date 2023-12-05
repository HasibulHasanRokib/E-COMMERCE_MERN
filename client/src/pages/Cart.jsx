import { useState } from "react"
import { Link } from "react-router-dom"

const Cart = () => {
 const [count,setCount]=useState(1)

  return (
    <div className="grid grid-cols-1 md:w-2/4 w-full max-md:p-2 mx-auto my-4 gap-3">
      <h1 className=" font-bold text-3xl  my-4">Shopping Cart</h1>
      <section className="py-2 flex justify-between items-center border-2 px-3 ">
        <div className="flex max-md:flex-col gap-2">
            <img className="w-[6rem] object-contain rounded-sm border shadow-sm" src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg" alt="" />
            <p>Nomad Tumbler</p>
        </div>            
        <div className="my-3">
         <button onClick={()=>setCount(count+1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold mr-2 shadow-sm">+</button>
         <samp>{count}</samp>             
         <button onClick={()=>setCount(count-1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold m-2 shadow-sm">-</button>
        </div>
        <div className="flex flex-col items-center">
            <p className="font-semibold my-2">$100</p>
             <button className="font-semibold text-blue-500">Remove</button>
        </div>
      </section>

     <section className="flex flex-col mt-3 gap-3 bg-gray-50 h-[300px] py-3 px-5 rounded-md shadow-sm ">
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="text-sm">Subtotal</p>
        <p className="font-bold">$100</p>
     </span>
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="text-sm ">Shipping</p>
        <p className="font-bold">$100</p>
     </span>
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="font-bold">Order total</p>
        <p className="font-bold">$100</p>
     </span>
     <button className="font-semibold bg-[--primary] py-3 text-white rounded-md shadow-sm hover:opacity-80">Checkout</button>
     <Link className="text-center text-sm font-semibold text-blue-500">Continue Shopping →</Link>
     </section>
    </div>
  )
}

export default Cart
