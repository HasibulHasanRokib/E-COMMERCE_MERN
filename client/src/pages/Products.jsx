import { useContext } from "react"
import ProductCard from "../components/ProductCard"
import { productsContext } from "../context/productContext"
import NoProducts from '../assets/not_found.png'
const Products = () => {

  const {filterProducts}=useContext(productsContext)
  
  return (
    <main>
      {filterProducts.length<=0?(
        <div className="w-screen">
        <span className="flex flex-col items-center justify-center p-2">
          <img className="w-[100px]" src={NoProducts} alt="" />
          <p className="font-semibold">No products found.</p>
        </span>
        </div>

      ) : <section className="grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7  grid-cols-2 gap-2 p-2">
      {filterProducts.map((item)=>{
        return <ProductCard key={item._id} product={item}/>
      })}
      </section>
      }
    </main>
  )
}

export default Products
