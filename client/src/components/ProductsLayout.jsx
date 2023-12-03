import { Outlet } from "react-router-dom"
import Menu from "./Menu"



const ProductsLayout = () => {
  return (
    <main className="flex gap-4">
      <Menu />
      <Outlet />
    </main>
  )
}

export default ProductsLayout