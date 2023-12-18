import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DELETE_CART_ITEM } from "../features/cartSlice"

const Cart = () => {
 
  const {cartItems,cartTotalAmount}=useSelector((state)=>state.cart)
  const [count,setCount]=useState(1)
  
  const dispatch=useDispatch()
   
  const handleDeleteItem=(id)=>{
  dispatch(DELETE_CART_ITEM(id))
  }

  return (
    <div className="grid grid-cols-1 md:w-2/4 w-full max-md:p-2 mx-auto my-4 gap-3">
      <h1 className=" font-bold text-3xl  my-4">Shopping Cart</h1>
      {cartItems && cartItems.map((item)=>{
    return  <section className="py-2 flex justify-between items-center border-2 px-3 " key={item?._id}>
    <div className="flex max-md:flex-col gap-2">
     <img className="w-[6rem] object-contain rounded-sm border shadow-sm" src={item?.imageUrls[0]} alt="" />
     <p>{item?.title}</p>
    </div>            
    <div className="my-3">
         <button disabled={count>=item?.stock?true:false}  onClick={()=>setCount(count+1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold mr-2 shadow-sm">+</button>
         <samp>{count}</samp>             
         <button disabled={count<=1?true:false}  onClick={()=>setCount(count-1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold m-2 shadow-sm">-</button>
   </div>
    <div className="flex flex-col items-center">
     <p className="font-semibold my-2">Tk {item?.regularPrice.toLocaleString()}</p>
    <button className="font-semibold text-blue-500" onClick={()=>handleDeleteItem(item._id)}>Remove</button>
    </div>
    </section> 
  })}   

   

     <section className="flex flex-col mt-3 gap-3 bg-gray-50 h-[300px] py-3 px-5 rounded-md shadow-sm ">
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="text-sm">Subtotal</p>
        <p className="font-bold">Tk {cartTotalAmount}</p>
     </span>
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="text-sm ">Shipping</p>
        <p className="font-bold">Tk 100</p>
     </span>
     <span className="flex justify-between items-center border-b-2 py-2">
        <p className="font-bold">Order total</p>
        <p className="font-bold">Tk {cartItems.length > 0 ? cartTotalAmount.toLocaleString() : 0 }</p>
     </span>
     <button className="font-semibold bg-[--primary] py-3 text-white rounded-md shadow-sm hover:opacity-80">Checkout</button>
     <Link className="text-center text-sm font-semibold text-blue-500">Continue Shopping →</Link>
     </section>
    </div>
  )
}

export default Cart
