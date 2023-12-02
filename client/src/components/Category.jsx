import { useSelector } from "react-redux"

const Category = () => {

const {categoryData}= useSelector((state)=>state.category)

  return (
    <section>
    <h2 className="text-xl font-semibold md:px-5 mt-4 capitalize p-2">Category list</h2>
    <div className=" grid grid-cols-4 my-4 lg:grid-cols-8 md:px-4">
        {categoryData && categoryData.map((item)=>{
            return <div className="bg-gray-50 shadow-sm border rounded-sm p-2 flex flex-col justify-center items-center">
                <img className=" md:w-20 md:h-20 w-16" src={item.categoryImage} alt="categoryImage" />
                <p className=" font-semibold text-xs capitalize mt-2">{item.name}</p>
            </div>
        })}
    </div>
      
    </section>
  )
}

export default Category
