import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/productContext"
import { baseURL } from "../App"
import { colors } from "./Objects"

const MenuColors = () => {

  return (
    <>
    <h2 className="font-bold my-2">Colors</h2>
     <div className="">
     {colors && colors.map((item)=>{
      return <span className="flex gap-1 items-center" key={item._id}>
             <input className="w-4 cursor-pointer" type="checkbox" name='colors' id="" />
             <div className='w-4 h-4 rounded-full border shadow-sm' style={{background:`${item.code}`}}></div>
             <p className="capitalize text-sm">{item.color}</p>
             </span>
     })}
     </div> 
    </>
  )
}

export default MenuColors
