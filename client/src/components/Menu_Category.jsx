import React from 'react'
import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/productContext"
import { baseURL } from "../App"
import { useSearchParams } from 'react-router-dom'

const MenuCategory = () => {
    
    const{setCategory,category}=useContext(productsContext)
    const[categories,setCategories]=useState([])
    const [query,setQuery]=useSearchParams()
   
    useEffect(()=>{
    const getCategories=async()=>{
     try {
       const res=await fetch(`${baseURL}/api/categories`)
       const data=await res.json()
       setCategories(data.categories)
     } catch (error) {
       console.log(error.message)
     }
    }
    getCategories()
    },[])

    const handleClick=(category)=>{
     setCategory(category)
     setQuery({category:category})
    }

  return (
    <>
    <h2 className="font-bold my-2">Category</h2>
     <div className="">
     <span className="flex gap-1">
      <input className="w-3 cursor-pointer" onClick={()=>handleClick('all')} value='all' checked={category==='all'} type="checkbox" name="category" id="all" />
      <p className="text-sm">All</p>
     </span>
     {categories && categories.map((item)=>{
      return <span className="flex gap-1" key={item._id}>
             <input className="w-3 cursor-pointer" onClick={()=>handleClick(item.slug)} value={item.slug} checked={category===item.slug} type="checkbox" name='category' id={item.slug} />
             <p className="capitalize text-sm">{item.name}</p>
             </span>
     })}
     </div>
    </>
  )
}

export default MenuCategory
