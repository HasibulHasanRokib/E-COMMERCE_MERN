import { useContext } from "react"
import ProductCard from "../components/ProductCard"
import { productsContext } from "../context/productContext"

const Products = () => {

  const {filterProducts}=useContext(productsContext)
  
  return (
    <main>
      {filterProducts.length<=0?(
          <p className="font-semibold py-3 px-2">No products found!</p>
      ) : <section className="grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7  grid-cols-2 gap-2 p-2">
      {filterProducts.map((item)=>{
        return <ProductCard key={item._id} product={item}/>
      })}
      </section>
      }
    </main>
  )
}

export default Products
