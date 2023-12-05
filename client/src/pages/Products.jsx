import { useContext } from "react"
import ProductCard from "../components/ProductCard"
import { productsContext } from "../context/productContext"

const Products = () => {

  const {filterProducts}=useContext(productsContext)
  
  return (
    <main>
    <section className="grid grid-cols-6 gap-2 p-3">
      {filterProducts && filterProducts.map((item)=>{
        return <ProductCard key={item._id} product={item}/>
      })}
      </section> 
    </main>
  )
}

export default Products
