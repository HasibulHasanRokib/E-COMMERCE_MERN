import MenuCategory from "./Menu_Category"
import MenuColors from "./Menu_Colors"
import MenuPrice from "./Menu_Price"

const Menu = () => {

  return (
    <section className="p-3 mt-1 w-[200px] border-r-2 shadow-sm bg-white">
     <MenuCategory/>
     <MenuColors/>
     <MenuPrice/>
    </section>
  )
}

export default Menu
