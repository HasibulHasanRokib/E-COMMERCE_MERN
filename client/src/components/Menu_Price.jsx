import { useContext } from "react"
import { price } from "./Objects"
import { productsContext } from "../context/productContext"

const MenuPrice = () => {

 const{setPriceOptions,priceOptions}=useContext(productsContext)
  
  

  return (
    <>
    <h2 className="font-bold my-2">Price</h2>
     <div className="">
     {price && price.map((item)=>{
      return <span className="flex gap-1 items-center" key={item.value}>
             <input className="w-6 cursor-pointer" onChange={(e)=>setPriceOptions(e.target.value)} value={item.value} checked={priceOptions===item.value} type="checkbox" name='priceOptions' id="priceOptions" />
             <p className="capitalize text-sm">{item.label}</p>
             </span>
     })}
     </div> 
    </>
  )
}

export default MenuPrice
