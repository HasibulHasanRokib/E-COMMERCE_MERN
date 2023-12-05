import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../App'
import { useEffect } from 'react'
import ProductCard from './ProductCard'

const CategoryItems = () => {

const [products,setProducts]=useState()
const [isLoading,setIsLoading]=useState(false)
const [error,setError]=useState(false)

const{category}=useParams()

const getProducts=async()=>{
    try {
    setIsLoading(true)
    const res=await fetch(`${baseURL}/api/products/category/${category}`)
    const data=await res.json() 
    if(data.success===false){
        setIsLoading(false)
        setError(data.message)
    }else{
        setIsLoading(false)
        setProducts(data.products)
    }   
    } catch (error) {
        setIsLoading(false)
        setError(error.message)
    }
}

useEffect(()=>{
getProducts()
},[])





  return (
    <div className='p-4'>
       {isLoading ? <h5 className='my-10 text-center font-bold text-sky-600'>Loading...</h5>:null}
       {error ? <h5 className='my-10 text-center font-semibold text-red-600 text-sm'>{error}</h5>:null}
      <div className=" grid grid-cols-7 gap-3">
        {products && products.map((item)=>{
            return <ProductCard key={item._id} product={item}/>
        })}
      </div>
    </div>
  )
}

export default CategoryItems
