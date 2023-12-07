import MenuCategory from "./Menu_Category"
import MenuPrice from "./Menu_Price"

const Menu = () => {



  return (
    <section className="p-3 min-h-screen mt-1 w-[250px] border-r-2 shadow-sm bg-white max-md:hidden">
     <MenuCategory />
     <MenuPrice/>
    </section>
  )
}

export default Menu
