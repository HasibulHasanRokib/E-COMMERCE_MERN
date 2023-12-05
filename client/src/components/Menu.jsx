import { useContext, useEffect, useState } from "react"
import { productsContext } from "../context/productContext"
import { baseURL } from "../App"
import { useSearchParams } from "react-router-dom"

const Menu = () => {

 const{setCategory,category}=useContext(productsContext)
 const[categories,setCategories]=useState([])

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

 const [query,setQuery]=useSearchParams()
 const selectedCategory=query.get('category')

 setCategory(selectedCategory || 'all')
 
 const handleClick=(category)=>{
 setQuery({category})
 }

  return (
    <section className="p-3">
     <h2>Category</h2>
     <div className="">
     <span className="flex gap-1">
      <input className="w-4 cursor-pointer" onClick={()=>handleClick('all')} value='all' checked={category==='all'} type="checkbox" name="category" id="all" />
      <p>All</p>
     </span>
     {categories && categories.map((item)=>{
      return <span className="flex gap-1" key={item._id}>
             <input className="w-4 cursor-pointer" onClick={()=>handleClick(item.slug)} value={item.slug} checked={category===item.slug} type="checkbox" name='category' id={item.slug} />
             <p className="capitalize">{item.name}</p>
             </span>
     })}
     </div>
    </section>
  )
}

export default Menu
