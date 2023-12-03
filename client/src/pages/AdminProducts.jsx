import { useEffect, useState } from 'react'
import {baseURL} from '../App'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_PRODUCT_FAILED, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_FAILED, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from '../features/productSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProducts = () => {

const [pageInfo,setPageInfo]=useState()
const [search,setSearch]=useState('')
const [page,setPage]=useState(1)

const dispatch=useDispatch()
const {productData}=useSelector((state)=>state.product)
let productURL=`${baseURL}/api/products?search=${search}&page=${page}`

const getAllProducts=async()=>{
  try {
    dispatch(GET_PRODUCT_REQUEST())
    const res= await fetch(productURL,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    dispatch(GET_PRODUCT_SUCCESS(data.products))
    setPageInfo(data.pagination)
  } catch (error) {
    dispatch(GET_PRODUCT_FAILED(error.message))
  }
}

useEffect(()=>{
getAllProducts()
},[productURL])

const handleSearch=(e)=>{
  e.preventDefault()
}

const handleProductDelete=async(id)=>{
  try {
    dispatch(DELETE_PRODUCT_REQUEST())
    const res= await fetch(`${baseURL}/api/product-delete/${id}`,{
      method:"DELETE",
      credentials:"include"
    })
    const data=await res.json()
    if(data.success===false){
      dispatch(DELETE_PRODUCT_FAILED(data.message))
      toast.error(data.message)
    }else{
      toast.success(data.message)
      dispatch(DELETE_PRODUCT_SUCCESS(data.deleteProduct._id))
    }
  } catch (error) {
    dispatch(DELETE_PRODUCT_FAILED(error.message))
    toast.error(error.message)
  }
}


  return (
    <main className='p-3 border-2 md:min-h-[80vh] my-3 rounded-md lg:w-[85vw] max:w-10/12 max-md:pb-32'>
       <article className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Products Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">All products there.</p>
      </article>

      <div className="">
      <form className="flex items-center rounded my-2" onSubmit={handleSearch}>
        <input onChange={(e)=>setSearch(e.target.value)}  className="py-1.5 px-2 rounded-l outline-none  shadow-sm" type="search" name="search" id="search" placeholder="Search..." />
        <button type="submit"><AiOutlineSearch className="text-xl bg-gray-600 text-white w-9 h-9 p-1.5 rounded-r shadow-sm"/></button>
       </form>
      </div>

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
          {productData && productData.length > 0 && productData.map((item)=>{
            return <tr className='text-center' key={item._id}>
            <td className='flex justify-center py-1 border h-14'>
              <img className='w-10' src={item.imageUrls[0]} alt="" />
            </td>             
             <td className='border capitalize hover:underline text-sm text-start px-2'><Link to={`/product/${item.slug}`}>{item.title.slice(0,30)} </Link></td>            
             <td className='border text-sm max-md:hidden'>{item.regularPrice}</td>
             <td className='border text-sm max-md:hidden'>{item.brand}</td>
             <td className='border text-sm max-md:hidden'>{item.rating}</td>
             <td className='border text-sm max-md:hidden'>{item.stock}</td>
             <td className='border text-sm max-md:hidden'>{item.sold}</td>
             <td className='border text-sm max-md:hidden'>Smart phone</td>
             <td className='border text-sm max-md:hidden'>{item.discountPercentage}%</td>
             <td className='border'>
              <Link to={`/admin/update-product/${item._id}`} className='font-semibold text-sky-700 mx-4 text-sm' type="button">Edit</Link>
              <button onClick={()=>handleProductDelete(item._id)} className='font-semibold text-red-600 text-sm' type="button">Delete</button>
             </td>
            </tr>
          }) }
        </tbody>
      </table>
     </section>
     <div className="flex py-2 justify-center items-center flex-col">
            <h5 className=" text-xs font-semibold">Showing {pageInfo?.currentPage} to {pageInfo?.totalPages} of {pageInfo?.count} Entries</h5>
            <div className="my-2">
            <button disabled={pageInfo?.previousPage===null} onClick={()=>{setPage(page - 1)}} className=" bg-white px-4 py-1.5 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-[--primary] font-bold rounded mx-1 text-sm">Prev</button>
            <button disabled={pageInfo?.nextPage===null} onClick={()=>{setPage(page + 1)}} className=" bg-white px-4 py-1.5 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-[--primary] font-bold rounded mx-1 text-sm">Next</button>
           </div>
      </div>
      <ToastContainer />
    </main>
  )
}

export default AdminProducts
