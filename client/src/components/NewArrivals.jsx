import { useEffect, useState } from "react"
import {baseURL} from '../App'
import ProductCard from "./ProductCard"

const NewArrivals = () => {

const[newProducts,setNewProducts]=useState([])

const getNewArrivals=async()=>{
    try {
        const res=await fetch(`${baseURL}/api/new-products`,{
            method:"GET"
        })
        const data=await res.json()
        setNewProducts(data.newArrivals)
    } catch (error) {
        console.log(error.message)
    }
}

useEffect(()=>{
    getNewArrivals()
},[])


  return (
    <section>
    <h2 className="text-xl font-semibold md:px-5 mt-4 capitalize p-2">New Arrivals</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-1 ">
    {newProducts && newProducts.map((item)=>{
        return <ProductCard key={item._id} product={item}/>
    })}
    </div>     
    </section>
  )
}

export default NewArrivals
