import { useContext } from "react"
import ProductCard from "../components/ProductCard"
import { productsContext } from "../context/productContext"

const Products = () => {

  const {filterProducts}=useContext(productsContext)
  
  return (
    <main>
      {filterProducts.length<=0?(
          <p className="font-semibold py-3 px-2">No products found!</p>
      ) : <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pt-2 md:p-2">
      {filterProducts.map((item)=>{
        return <ProductCard key={item._id} product={item}/>
      })}
      </section>
      }
    </main>
  )
}

export default Products
