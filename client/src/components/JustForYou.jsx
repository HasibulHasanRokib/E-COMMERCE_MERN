import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { baseURL } from "../App"

const JustForYou = () => {

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await fetch(`${baseURL}/api/products?limit=14`)
      const data = await res.json()
      setProducts(data.products)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])



  return (
    <div>
      <h2 className="text-xl font-semibold md:px-5 mt-4 capitalize p-2">Just for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7  lg:gap-4 lg:p-4 px-2 gap-3">
        {products && products.map((item) => {
          return <ProductCard key={item._id} product={item} />
        })}
      </div>
    </div>
  )
}

export default JustForYou
