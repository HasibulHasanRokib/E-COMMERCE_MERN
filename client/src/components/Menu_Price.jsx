import { priceOptions } from "./Objects"

const MenuPrice = () => {
  return (
    <>
    <h2 className="font-bold my-2">Price</h2>
     <div className="">
     {priceOptions && priceOptions.map((item)=>{
      return <span className="flex gap-1 items-center" key={item._id}>
             <input className="w-6 cursor-pointer" type="checkbox" name='priceOptions' id="" />
             <p className="capitalize text-sm">{item.label}</p>
             </span>
     })}
     </div> 
    </>
  )
}

export default MenuPrice
