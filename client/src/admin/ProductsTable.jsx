import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineStop,AiFillDollarCircle, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'


const Table = ({currentItems,confirmDelete}) => {
  return (
    <div>
    <section className=' border-b-2'>
        <table className='my-3 border w-full pb-4'>
          <thead>
            <tr className='text-center'>
              <th className='p-3 border'>Product</th>
              <th className='p-3 border'>Title</th>
              <th className='p-3 border max-md:hidden'>Price (Tk)</th>
              <th className='p-3 border max-md:hidden'>Brand</th>
              <th className='p-3 border max-md:hidden'>Rating</th>
              <th className='p-3 border max-md:hidden'>In Stock</th>
              <th className='p-3 border max-md:hidden'>Sold</th>
              <th className='p-3 border max-md:hidden'>Category</th>
              <th className='p-3 border max-md:hidden'>Discount(%)</th>
              <th className='p-3 border'>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 && currentItems.map((item) => {
              return <tr className='text-center' key={item._id}>
                <td className='flex justify-center py-1 border h-14'>
                  <img className='w-10' src={item.imageUrls[0]} alt="" />
                </td>
                <td className='border capitalize hover:underline text-sm text-start px-2'><Link to={`/product/${item.slug}`}>{item.title.slice(0, 30)} </Link></td>
                <td className='border text-sm max-md:hidden'>{item.regularPrice}</td>
                <td className='border text-sm max-md:hidden capitalize'>{item.brand}</td>
                <td className='border text-sm max-md:hidden'>{item.rating}</td>
                <td className='border text-sm max-md:hidden'>{item.stock===0?<p className='text-xs text-red-600 font-semibold capitalize'>out of stock</p>:item.stock}</td>
                <td className='border text-sm max-md:hidden'>{item.sold}</td>
                <td className='border text-sm max-md:hidden capitalize'>{item.category}</td>
                <td className='border text-sm max-md:hidden'>{item.discountPercentage}%</td>
                <td className='border'>
                  <Link to={`/admin/update-product/${item._id}`} className='font-semibold text-sky-700 mx-4 text-sm' type="button"><AiOutlineEdit size={20} /></Link>
                  <button onClick={() => confirmDelete(item._id)} className='font-semibold text-red-600 text-sm' type="button"><AiOutlineDelete size={20} /></button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Table
