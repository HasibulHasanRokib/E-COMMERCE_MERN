import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

const CategoryTable = ({categories,updateCategoryData,handleDeleteCategory}) => {
  return (
    <div>
        <table className='border w-full'>
        <thead>
          <tr>
            <th className='p-3 border'>#</th>
            <th className='p-3 border'>Name</th>
            <th className='p-3 border'>Status</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.map((item,index)=>{
            return <tr key={index}>
              <td className='px-3 border'><img className='w-8' src={item?.categoryImage} alt="" /></td>
              <td className='p-3 border capitalize'>{item?.name}</td>
              <td className='p-3  flex justify-around border'>
                <button className='font-semibold text-sky-700' onClick={()=>updateCategoryData(item)} type="button"><AiOutlineEdit size={25}/></button>
                <button onClick={()=>handleDeleteCategory(item._id)} className='font-semibold text-red-700' type="button"><AiOutlineDelete size={25}/></button>
             </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CategoryTable
