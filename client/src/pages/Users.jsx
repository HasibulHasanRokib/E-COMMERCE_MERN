import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {baseURL} from '../App'
const Users = () => {

  const [userInfo,setUserInfo]=useState()
  const [searchValue,setSearchValue]=useState("")
  const [page,setPage]=useState(1)
  const [pageInfo,setPageInfo]=useState()


  const handleSearch=(e)=>{
    e.preventDefault()
  }

  const userURL=`${baseURL}/auth/users?search=${searchValue}&page=${page}`

  const getAllUsers=async()=>{
    try {
    const res=await fetch(userURL,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    setUserInfo(data.users) 
    setPageInfo(data.pagination)
    } catch (error) {
    console.log(error.message)    
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[userURL])


    return (
      <main className='p-3 border-2 md:min-h-[80vh] my-3 rounded-md lg:w-[85vw] max:w-10/12'>
        <article className="border-b border-gray-900/10 pb-5">
          <h2 className="text-2xl font-semibold leading-7 text-[--primary]">Users Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">All users.</p>
        </article>
       
       <form className="flex items-center rounded my-5" onSubmit={handleSearch}>
        <input onChange={(e)=>setSearchValue(e.target.value)} className="py-1.5 px-2 rounded-l outline-[--primary]/50 shadow-sm" type="search" name="search" id="search" placeholder="Search..." />
        <button type="submit"><AiOutlineSearch className="text-xl bg-[--primary] text-white w-9 h-9 p-1.5 rounded-r shadow-sm"/></button>
       </form>

       <table className="">
        <thead>
          <tr className="border">
            <th className="p-2 border uppercase">#</th>
            <th className="p-2 border uppercase">Name</th>
            <th className="max-md:hidden uppercase">Email</th>
            <th className="p-2 border uppercase">Phone</th>
            <th className="p-2 border uppercase max-md:hidden">Gender</th>
            <th className="p-2 border uppercase max-md:hidden">City</th>
            <th className="p-2 border uppercase max-md:hidden">State</th>
            <th className="p-2 border uppercase max-md:hidden">Status</th>
          </tr>
        </thead>
        <tbody>
          {userInfo && userInfo.map((user)=>{
            return <tr key={user._id}>
              <td className="py-2 border px-3" ><img className=" shadow-md border w-10 h-10 object-cover rounded-full" src={user?.avatar} alt="" /></td>
              <td className="font-semibold text-sm capitalize px-3 border">{user?.name}</td>
              <td className="max-md:hidden border px-3 py-2 font-semibold">{user?.email}</td>
              <td className="py-2 px-3 border font-semibold text-sm" >{user?.phone}</td>
              <td className="py-2 px-3 border font-semibold text-sm capitalize max-md:hidden" >{user?.gender}</td>
              <td className="py-2 px-3 border font-semibold text-sm max-md:hidden" >{user?.city}</td>
              <td className="py-2 px-3 border font-semibold text-sm max-md:hidden" >{user?.state}</td>
              <td className="py-2 px-3 border font-semibold text-sm max-md:hidden" >{user.isBanned===true ? <p className="text-sm text-semibold text-red-700">Suspend</p>:<p className="text-sm text-semibold text-green-600">Active</p>}</td>
            </tr>
          })}
        </tbody>
       </table>
        
       <div className="flex  flex-col mt-4 max-md:justify-center max-md:items-center">
            <h5 className=" text-xs font-semibold">Showing {pageInfo?.currentPage} to {pageInfo?.totalPages} of {pageInfo?.count} Entries</h5>
            <div className="flex gap-3 mt-1">
            <button disabled={pageInfo?.previousPage===null} onClick={()=>{setPage(page - 1)}} className="text-[--primary] bg-white py-1.5 px-2 border shadow-sm disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 font-bold rounded text-sm">Previous</button>
            <button disabled={pageInfo?.nextPage===null} onClick={()=>{setPage(page + 1)}} className="bg-white py-1.5 px-2 border shadow-sm disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 text-[--primary] font-bold rounded text-sm">Next</button>
           </div>
      </div>
       

      </main>
    )
  }
  
  export default Users