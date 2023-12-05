import React, { useEffect, useState } from "react"
import {baseURL} from '../App'

export const productsContext=React.createContext()

const ProductsProvider=({children})=>{

    const [products,setProducts]=useState([])
    const [searchQuery,setSearchQuery]=useState('')

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

    const [category, setCategory] = useState('all');

    if (category !== 'all') {
    filterProducts = filterProducts.filter((product) => product.category === category);
    }

    filterProducts=filterProducts.filter((product)=>product.title.toLowerCase().includes(searchQuery))



    return <productsContext.Provider value={{filterProducts,setSearchQuery,searchQuery,setCategory,category}}>
       {children}
    </productsContext.Provider>
}

export default ProductsProvider;