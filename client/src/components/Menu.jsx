import { useSelector } from "react-redux"


const Menu = () => {

const {categoryData}=useSelector((state)=>state.category)


  return (
    <section className="w-1/6 max-md:hidden border-r p-2">
      <h2 className="font-bold my-2 px-1"># Category</h2>
      <div className="flex flex-col gap-2">
      <div  className="flex">
          <input className="w-5 mx-1" type="checkbox" name='' id=''/>
          <span className=" capitalize text-sm">All</span>
        </div>
      {categoryData && categoryData.map((item)=>{
        return<div key={item._id} className="flex">
          <input className="w-5 mx-1" type="checkbox" name='' id={item.slug} />
          <span className=" capitalize text-sm">{item.name}</span>
        </div>
      })}
    </div>
    </section>
  )
}

export default Menu
