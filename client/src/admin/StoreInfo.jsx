import { BsBagPlusFill, BsBagFill } from "react-icons/bs";
import { AiOutlineStop,AiFillDollarCircle} from 'react-icons/ai'

const StoreInfo = ({products,totalStoreValue,category,outOfStock}) => {
  return (
    <>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 my-5">
        <div className="bg-green-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
          <BsBagFill size={18} className='text-white' />
          <p className='font-semibold text-white text-sm'>Total Products ({products?.length})</p>
        </div>
        <div className="bg-pink-500 h-20 p-2 flex flex-col justify-center items-center gap-1 rounded shadow-sm">
       <span className='flex items-center gap-1'>
       <AiFillDollarCircle size={18} className='text-white' />
          <p className='font-semibold text-white text-sm'>Total Store Value</p>
       </span>
          <p className='font-semibold text-sm text-white'>TK.{totalStoreValue?.toLocaleString()}</p>
        </div>
        <div className="bg-sky-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
          <BsBagPlusFill size={20} className='text-white' />
          <p className='font-semibold text-white'>Total Categories ({category?.length})</p>
        </div>
        <div className="bg-red-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
          <AiOutlineStop size={20} className='text-white' />
          <p className='font-semibold text-white'>Out of Stock({outOfStock})</p>
        </div>
      </div>
    </>
  )
}

export default StoreInfo
