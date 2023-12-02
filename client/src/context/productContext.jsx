import { useSelector } from "react-redux"
import React from "react"

export const productsContext=React.createContext()

const ProductsProvider=({children})=>{

const {productData}=useSelector((state)=>state.product) 
let filterProducts=productData;

    return <productsContext.Provider value={{filterProducts}}>
       {children}
    </productsContext.Provider>
}

export default ProductsProvider;