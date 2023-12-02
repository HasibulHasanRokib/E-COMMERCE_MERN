import { useEffect, useState } from "react";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import {useParams} from 'react-router-dom'
import {baseURL} from '../App'

const Product = () => {

const[product,setProduct]=useState()
const [imageIndex,setImageIndex]=useState(0)
const [count,setCount]=useState(1)

const {id} = useParams()

const getProduct=async()=>{
  try {
    const res = await fetch(`${baseURL}/api/product/${id}`,{
    method:"GET",
    credentials:"include"
    })
    const data = await res.json()
    setProduct(data.product)
    console.log(data.product)
  } catch (error) {
    console.log(error.message)
  }
}

 useEffect(()=>{
  getProduct()
 },[])


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
        <button type="button" className="bg-[--primary] text-white font-bold px-3 py-2 shadow-sm rounded-md hover:opacity-90 text-sm">Buy Now</button>
        <button type="button" className="font-bold border-2 border-[--primary] rounded-md px-3 py-2 text-[--primary] text-sm">Add to Cart</button>
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

