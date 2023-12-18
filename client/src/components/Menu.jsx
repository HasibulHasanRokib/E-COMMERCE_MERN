import MenuCategory from "./Menu_Category"
import MenuPrice from "./Menu_Price"

const Menu = () => {

  return (
    <section className="p-3 border-r-2 min-h-screen max-md:hidden">
     <MenuCategory />
     <MenuPrice/>
    </section>
  )
}

export default Menu
