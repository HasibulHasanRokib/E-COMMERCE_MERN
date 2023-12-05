import { useEffect, useState } from "react";
import { AiFillStar,} from "react-icons/ai";
import {useNavigate, useParams} from 'react-router-dom'
import {baseURL} from '../App'

import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../features/cartSlice";

const Product = () => {
const [product,setProduct]=useState()
const [isLoading,setIsLoading]=useState(false)
const [isError,setIsError]=useState(false)
const [imageIndex,setImageIndex]=useState(0)
const [count,setCount]=useState(1)
const {currentUser}=useSelector((state)=>state.user)
const {slug} = useParams()

const getProduct=async()=>{
  try {
    setIsLoading(true)
    const res = await fetch(`${baseURL}/api/product/${slug}`,{
    method:"GET",
    })
    const data = await res.json()
    console.log(data)
    if(data.success===false){
      setIsLoading(false)
      setIsError(data.message)
    }else{
      setIsLoading(false)
      setProduct(data.product)
    }
  } catch (error) {
    setIsLoading(false)
    setIsError(error.message)
  }
}

 useEffect(()=>{
  getProduct()
 },[])

 const navigate=useNavigate()

 const cart=useSelector((state)=>state.cart)
 console.log(cart)
 const dispatch=useDispatch()

 const handleCart=()=>{
  if(currentUser===null){
    navigate('/login')
  }else{
    dispatch(ADD_TO_CART(product,count,{price:product.regularPrice}))
  }
 }

  return (
    <>
    <main className="p-4 flex max-md:flex-col-reverse">
      <section className="md:w-2/4 max-md:my-3 flex justify-center items-center flex-col">  
      <div className="">
      <img className="w-[25rem] h-[20rem] object-contain" src={product?.imageUrls[imageIndex]} alt="" />
      </div>

      <div className="mt-5">
      {product && product.imageUrls.map((item,index)=>{
        return <button onClick={()=>setImageIndex(index)} key={index} className="w-20 mx-3 shadow-sm"><img src={item} alt="" /></button>
      })}
      </div>     
      
      </section>
      <section className="md:w-2/4 px-4">
       {isLoading ? <h4 className='font-semibold text-sky-600'>Loading...</h4>:null}
       {isError ? <h5 className='my-10 font-semibold text-red-600 text-sm'>{isError}</h5>:null}

       <h1 className="font-bold text-3xl capitalize">{product?.title}</h1>
       <h5 className=" font-bold text-gray-400 capitalize">{product?.brand}</h5>

       <p className="flex items-center gap-1 font-semibold text-sm my-2"><AiFillStar className=" text-yellow-500"/>{product?.rating}</p>
        
        <div className="flex max-md:flex-col gap-2 my-4">
          <p className="bg-white py-1 px-2 shadow-sm">Price :<span className="font-bold mx-2 text-sm ">Tk.{product?.regularPrice}</span></p>
          <p className="bg-white py-1 px-2 shadow-sm">Status :<span className="font-bold mx-2 text-sm">{product?.stock > 0 ? "In Stock" :"Out of stock"}</span></p>
          <p className="bg-white py-1 px-2 shadow-sm">Sold :<span className="font-bold mx-2 text-sm">{product?.sold}</span></p>
        </div>

        <div className="my-3">
         <button disabled={count>=product?.stock?true:false}  onClick={()=>setCount(count+1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold mr-2 shadow-sm">+</button>
         <samp>{count}</samp>             
         <button disabled={count<=1?true:false}  onClick={()=>setCount(count-1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold m-2 shadow-sm">-</button>
        </div>

       <div className=" flex my-2 gap-3">
        <button type="button" onClick={handleCart} className="font-semibold bg-[--primary] text-white border-2 border-[--primary] shadow-sm rounded-md px-3 py-1.5 hover:text-[--primary] hover:bg-white text-sm ">Add to Cart</button>
        <button type="button"  className="font-semibold  border-2 border-[--primary] shadow-sm rounded-md px-3 py-1.5 text-[--primary] bg-white text-sm ">Add Wishlist</button>
       </div>
       <samp className=" font-sans">
        <h2 className="font-bold text-2xl my-2">Description</h2>
        <p>{product?.description}</p>
       </samp>      
      </section>
    </main>           
    </>
  )
}

export default Product

