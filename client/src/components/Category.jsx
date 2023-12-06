import { useContext, useState } from "react"
import { baseURL } from "../App"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { productsContext } from "../context/productContext"
const Category = () => {

  const [categories,setCategories]=useState()
  const getCategories=async()=>{
    try {
      const res=await fetch(`${baseURL}/api/categories`,{
      method:"GET",
      credentials:"include"
     }) 
     const data= await res.json()
     setCategories(data.categories)
    } catch (error) {
     console.log(error.message)
    }
  }   

  useEffect(()=>{
  getCategories()
  },[])

  const navigate=useNavigate()
  const {setCategory,category}=useContext(productsContext)
  console.log(category)
  
  const handleClick=(category)=>{
  setCategory(category)
  navigate('/products')
  }

  return (
    <section>
    <h2 className="text-xl font-semibold md:px-5 mt-4 capitalize p-2">Category list</h2>
    <div className=" grid grid-cols-4 my-4 lg:grid-cols-8 md:px-4">
        {categories && categories.map((item)=>{
            return <button type="button" onClick={()=>handleClick(item.slug)} key={item._id} className="bg-gray-50 shadow-sm border rounded-sm p-2 flex flex-col justify-center items-center">
                <img className=" md:w-20 md:h-20 w-16" src={item.categoryImage} alt="categoryImage" />
                <p className=" font-semibold text-xs capitalize mt-2">{item.name}</p>
            </button>
        })}
    </div>
      
    </section>
  )
}

export default Category
