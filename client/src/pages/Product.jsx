import { useContext, useEffect, useState } from "react";
import { AiFillStar,} from "react-icons/ai";
import {useParams} from 'react-router-dom'
import {baseURL} from '../App'
import { productsContext } from "../context/productContext";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../features/cartSlice";


const Product = () => {
const [product,setProduct]=useState()
const [isLoading,setIsLoading]=useState(false)
const [isError,setIsError]=useState(false)
const [imageIndex,setImageIndex]=useState(0)
const [quantity,setQuantity]=useState(1)
const {slug} = useParams()

const dispatch=useDispatch()

const getProduct=async()=>{
  try {
    setIsLoading(true)
    const res = await fetch(`${baseURL}/api/product/${slug}`,{
    method:"GET",
    })
    const data = await res.json()
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

 const handleAddToCart=(product)=>{
 dispatch(ADD_TO_CART(product))
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

        <div className="flex flex-wrap gap-3 my-3">
        <p className="font-bold">Colors:</p>
        {product && product.colors.map((color)=>{
         return <button type="button" className={`bg-white capitalize font-semibold px-3 text-sm py-1 rounded-sm shadow-sm`} key={color.code}>{color}</button>      
        })}
        </div>

        {product && product.category==='smart-phone'?(<>
        <div className="flex flex-wrap gap-3">
        <p className="font-bold">Storage:</p>
        { product.phoneStorage.map((item)=>{
         return <button type="button" className={`bg-white capitalize font-semibold px-3 text-sm py-1 rounded-sm shadow-sm`} key={item}>{item} GB</button>      
        })}
        </div>
        </>):null}

        {product && product.category==='shoes'?(<>
        <div className="flex flex-wrap gap-3">
        <p className="font-bold">Size:</p>
        { product.shoesSize.map((item)=>{
         return <p className="bg-white font-semibold px-3 text-sm py-1 rounded-sm shadow-sm" key={item}>{item}</p>      
        })}
        </div>
        </>):null}

        {product && product.category==='mens-clothing'?(<>
        <div className="flex flex-wrap gap-3">
        <p className="font-bold">Size:</p>
        { product.clothSize.map((item)=>{
         return <p className="bg-white font-semibold px-3 text-sm py-1 rounded-sm shadow-sm capitalize" key={item}>{item}</p>      
        })}
        </div>
        </>):null}


        <div className="my-3">
         <button disabled={quantity>=product?.stock?true:false}  onClick={()=>setQuantity(quantity+1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold mr-2 shadow-sm">+</button>
         <samp>{quantity}</samp>             
         <button disabled={quantity<=1?true:false}  onClick={()=>setQuantity(quantity-1)} className="p-1 border-2  w-10 hover:bg-[--primary] hover:text-white font-bold m-2 shadow-sm">-</button>
        </div>

       <div className=" flex my-2 gap-3">
        <button type="submit" onClick={()=>handleAddToCart(product)} className="font-semibold bg-[--primary] text-white border-2 border-[--primary] shadow-sm rounded-md px-3 py-1.5 hover:text-[--primary] hover:bg-white text-sm ">Add to Cart</button>
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

