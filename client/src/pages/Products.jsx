import { useContext } from "react"
import ProductCard from "../components/ProductCard"
import { productsContext } from "../context/productContext"


const Products = () => {
const{filterProducts}=useContext(productsContext)

  return (
    <main>
     <div className="grid grid-cols-2 max-md:px-2 md:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6  py-4 gap-1  ">
    {filterProducts && filterProducts.map((item)=>{
      return <ProductCard product={item} key={item._id}/>
    })}
    </div> 
    </main>
  )
}

export default Products
