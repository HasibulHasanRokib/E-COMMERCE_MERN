import React, { useEffect, useState } from "react"
import {baseURL} from '../App'
import { useSearchParams } from "react-router-dom"

export const productsContext=React.createContext()

const ProductsProvider=({children})=>{

    const [products,setProducts]=useState([])


    useEffect(()=>{
        const getProducts=async()=>{
            try {
            const res=await fetch(`${baseURL}/api/products`)
            const data=await res.json()
            setProducts(data.products)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    },[])
    
    let filterProducts=products

    //category filter
    const [category, setCategory] = useState('all');
    if (category !== 'all') {
    filterProducts = filterProducts.filter((product) => product.category === category);
    }

    //search filter
    const [searchQuery,setSearchQuery]=useState('')
    filterProducts=filterProducts.filter((product)=>product.title.toLowerCase().includes(searchQuery))


    //price filter
    const [priceOptions,setPriceOptions]=useState('all')
     if(priceOptions!=='all'){
     const[min,max]=priceOptions.split('-')
     filterProducts=filterProducts.filter((product)=>product.regularPrice>=parseInt(min) && product.regularPrice<=parseInt(max))
     }


    return <productsContext.Provider value={{filterProducts,setSearchQuery,searchQuery,setCategory,category,setPriceOptions,priceOptions}}>
       {children}
    </productsContext.Provider>
}

export default ProductsProvider;