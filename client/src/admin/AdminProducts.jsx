import { useEffect, useState } from 'react'
import {baseURL} from '../App'
import { AiOutlineSearch,AiOutlineStop,AiOutlineDelete ,AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { BsBagPlusFill, BsBagFill} from "react-icons/bs";
import Spinner from '../components/Spinner';



const AdminProducts = () => {

const [products,setProducts]=useState()
const [isLoading,setIsLoading]=useState(false)
const [isError,setIsError]=useState(false)
const [pageInfo,setPageInfo]=useState()
const [search,setSearch]=useState('')
const [page,setPage]=useState(1)

let productURL=`${baseURL}/api/products?search=${search}&page=${page}`

const getAllProducts=async()=>{
  try {
    setIsLoading(true)
    const res= await fetch(productURL,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    if(data.success===false){
      setIsError(data.message)
      setIsLoading(false)
    }else{
      setProducts(data.products)
      setPageInfo(data.pagination)
      setIsLoading(false)
    }
  } catch (error) {
      setIsLoading(false)
      setIsError(error.message)
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
    const res= await fetch(`${baseURL}/api/product-delete/${id}`,{
      method:"DELETE",
      credentials:"include"
    })
    const data=await res.json()
    if(data.success===false){
      setIsError(data.message)
    }
    } catch (error) {
     setIsError(error.message)
    }
}


  return (
    <main className='p-3'>
       <article className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Products Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">All products there.</p>
      </article>

      <div className="grid grid-cols-3 gap-2">
       <div className="bg-green-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
       <BsBagFill size={20} className='text-white'/>
       <p className='font-semibold text-white'>Total Products ({products?.length})</p>
       </div>
       <div className="bg-sky-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
       <BsBagPlusFill size={20} className='text-white'/>
       <p className='font-semibold text-white'>Total Categories (0)</p>
       </div>
       <div className="bg-red-500 h-20 p-2 flex justify-center items-center gap-1 rounded shadow-sm">
       <AiOutlineStop size={20} className='text-white'/>
       <p className='font-semibold text-white'>Out of Stock(0)</p>
       </div>
      </div>

      {/* <div className="">
      <form className="flex items-center rounded my-2" onSubmit={handleSearch}>
        <input onChange={(e)=>setSearch(e.target.value)}  className="py-1.5 px-2 rounded-l outline-none  shadow-sm" type="search" name="search" id="search" placeholder="Search..." />
        <button type="submit"><AiOutlineSearch className="text-xl bg-gray-600 text-white w-9 h-9 p-1.5 rounded-r shadow-sm"/></button>
       </form>
      </div> */}

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
          {products && products.length > 0 && products.map((item)=>{
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
             <td className='border text-sm max-md:hidden'>{item.category}</td>
             <td className='border text-sm max-md:hidden'>{item.discountPercentage}%</td>
             <td className='border'>
              <Link to={`/admin/update-product/${item._id}`} className='font-semibold text-sky-700 mx-4 text-sm' type="button"><AiOutlineEdit size={20}  /></Link>
              <button onClick={()=>handleProductDelete(item._id)} className='font-semibold text-red-600 text-sm' type="button"><AiOutlineDelete size={20} /></button>
             </td>
            </tr>
          }) }
        </tbody>
      </table>
     </section>
     {isLoading ? <h5 className='my-10 text-center font-bold '><Spinner/></h5>:null}
     {isError ? <h5 className='my-10 text-center font-semibold text-red-600 text-sm'>{isError}</h5>:null}
     <div className="flex py-2 justify-center items-center flex-col">
            <h5 className=" text-xs font-semibold">Showing {pageInfo?.currentPage} to {pageInfo?.totalPages} of {pageInfo?.count} Entries</h5>
            <div className="my-2">
            <button disabled={pageInfo?.previousPage===null} onClick={()=>{setPage(page - 1)}} className=" bg-white px-4 py-1.5 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-[--primary] font-bold rounded mx-1 text-sm">Prev</button>
            <button disabled={pageInfo?.nextPage===null} onClick={()=>{setPage(page + 1)}} className=" bg-white px-4 py-1.5 disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-[--primary] font-bold rounded mx-1 text-sm">Next</button>
           </div>
      </div>
    </main>
  )
}

export default AdminProducts
