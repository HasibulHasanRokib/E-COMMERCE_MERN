import { Outlet } from "react-router-dom"
import Menu from "./Menu"



const ProductsLayout = () => {
  return (
    <main className="flex">
      <Menu />
      <Outlet />
    </main>
  )
}

export default ProductsLayout