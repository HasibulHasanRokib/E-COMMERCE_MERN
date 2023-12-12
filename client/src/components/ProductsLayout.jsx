import { Outlet } from "react-router-dom"
import Menu from "./Menu"



const ProductsLayout = () => {
  return (
    <main className="grid grid-cols-6">
      <Menu />
      <div className="col-span-5">
      <Outlet />
      </div>
    </main>
  )
}

export default ProductsLayout